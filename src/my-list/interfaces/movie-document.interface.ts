import { Schema } from 'mongoose';
import { Genre } from './genre-document.interface';

export interface IMovie extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
  }