import { Schema, model } from 'mongoose';
import { EnumGenre } from '../interfaces/genre-document.interface';
import { IMovie } from '../interfaces/movie-document.interface';

export const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    type: [{ type: String, enum: Object.values(EnumGenre) }],
    required: true,
  },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

export const Movie = model<IMovie>('Movie', MovieSchema);
