import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user';
import { AddListDto } from './dto/add-list-dto';
import { RemoveListDto } from './dto/remove-list-dto';
import { IUser } from './interfaces/user-document.interface';
import { MyListService } from './my-list.service';

@Controller('my-list')
export class MyListController {
  constructor(private myListService: MyListService) {}

  @Post('/add/list')
  async addToList(
    @CurrentUser() currentUser: IUser,
    @Body() body: AddListDto,
  ) {
    return this.myListService.addToList(
      currentUser._id,
      body.contentId,
      body.contentType,
    );
  }

  @Post('/remove/list')
  async removeFromList(
    @CurrentUser() currentUser: IUser,
    @Body() body: RemoveListDto,
  ) {
    return this.myListService.removeFromList(currentUser._id, body.contentId);
  }

  @Get('/user/list')
  async listItems(
    @CurrentUser() currentUser: IUser,
    @Query() query: { page: number; limit: number },
  ) {
    return this.myListService.listItems(
      currentUser?._id,
      query.page,
      query.limit,
    );
  }
}
