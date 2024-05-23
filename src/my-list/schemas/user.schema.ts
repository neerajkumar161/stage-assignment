import { Schema, model } from 'mongoose';
import { EnumGenre } from '../interfaces/genre-document.interface';
import { IUser } from '../interfaces/user-document.interface';

export const WatchHistorySchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  contentId: { type: String, required: true },
  watchedOn: { type: Date, required: true },
  rating: { type: Number },
});

export const PreferencesSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  favoriteGenres: { type: Array, required: true },
  dislikedGenres: { type: Array, required: true },
});

export const UserSchema = new Schema<IUser>({
  id: { type: Schema.Types.ObjectId },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [
      { type: String, enum: Object.values(EnumGenre), required: true },
    ],
    dislikedGenres: [
      { type: String, enum: Object.values(EnumGenre), required: true },
    ],
  },
  watchHistory: [WatchHistorySchema],
});

export const User = model<IUser>('User', UserSchema);