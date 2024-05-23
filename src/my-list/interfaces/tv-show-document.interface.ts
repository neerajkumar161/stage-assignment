import { Schema, Document } from 'mongoose';
import { Genre } from './genre-document.interface';

export interface ITVShow extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  genres: Genre[];
  episodes: Array<{
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }>;
}
