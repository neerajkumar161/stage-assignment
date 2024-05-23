import { Document, Schema } from 'mongoose';
import { Genre } from './genre-document.interface';

export interface IWatchHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}
export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: Array<IWatchHistory>;
}
