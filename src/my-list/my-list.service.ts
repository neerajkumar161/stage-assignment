import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { IMovie } from './interfaces/movie-document.interface';
import { ITVShow } from './interfaces/tv-show-document.interface';
import { IUser } from './interfaces/user-document.interface';
import { IMyList, TContent } from './schemas/my-list.schema';

@Injectable()
export class MyListService {
  constructor(
    @InjectModel('MyList') private myListModel: Model<IMyList>,
    @InjectModel('Movie') private movieModel: Model<IMovie>,
    @InjectModel('TvShow') private tvShowModel: Model<ITVShow>,
    @InjectModel('User') private userModel: Model<IUser>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async addToList(
    userId: Schema.Types.ObjectId,
    contentId: string,
    contentType: TContent,
  ) {
    if(!userId) {
      throw new BadRequestException('User not found!');
    }
    // I'm assuming here the userId, contentId, contentType are valid, therefore not handling the validation
    await this.myListModel.updateOne(
      { userId },
      { $addToSet: { items: { contentId, contentType } } },
      { upsert: true },
    );
  }

  async removeFromList(userId: Schema.Types.ObjectId, contentId: string) {
    // I'm assuming here the userId, contentId are valid, therefore not handling the validation
    if(!userId) {
      throw new BadRequestException('User not found!');
    }

    await this.myListModel.updateOne(
      { userId },
      { $pull: { items: { contentId } } },
    );
  }

  async listItems(
    userId: Schema.Types.ObjectId,
    page: number = 1,
    limit: number = 10,
  ) {
    //Pagination, Caching, etc.
    if(!userId) {
      throw new BadRequestException('User not found!');
    }

    const userList = await this.myListModel.findOne({ userId }).lean();
    if (!userList) {
      throw new BadRequestException('No MyList exists for the user');
    }

    const start = (page - 1) * limit;
    const end = page * limit;
    const items = userList.items.slice(start, end); // Paginated Items

    const myListItems = items.map(async (item) => {
      // Assuming the contentId, contentType are valid, therefore not handling the validation
      const itemDetails = await this.getMyListItems(item.contentId, item.contentType)
      return {
        ...item,
        details: itemDetails
      }
    });

    return Promise.all(myListItems);
  }

  private async getMyListItems(
    contentId: Schema.Types.ObjectId,
    contentType: TContent,
  ) {
    const cacheKey = `${contentId.toString()}`;
    let cacheDetails = await this.cacheManager.get(cacheKey);

    if (!cacheDetails) {
      if (contentType == 'Movie') {
        const movie = await this.movieModel.findById(contentId, { title: 1, description: 1 }).lean();
        await this.cacheManager.set(cacheKey, movie, 300);
        return movie;
      } else if (contentType == 'TVShow') {
        const tvShow = await this.tvShowModel.findById(contentId, { title: 1, description: 1 }).lean();
        await this.cacheManager.set(cacheKey, tvShow, 300);
        return tvShow;
      }
    }

    return cacheDetails;
  }

  getUserDetails(userId: string) {
    const user = this.userModel.findOne({ _id: userId }).lean();
    if(!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
