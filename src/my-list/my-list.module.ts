import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrentUserInterceptor } from '../interceptor/current-user-interceptor';
import { MyListController } from './my-list.controller';
import { MyListService } from './my-list.service';
import { MovieSchema } from './schemas/Movie.schema';
import { UserSchema } from './schemas/User.schema';
import { MyListSchema } from './schemas/my-list.schema';
import { TvShowSchema } from './schemas/tv-show.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MyList', schema: MyListSchema },
      { name: 'Movie', schema: MovieSchema },
      { name: 'TvShow', schema: TvShowSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [MyListController],
  providers: [
    MyListService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class MyListModule {}
