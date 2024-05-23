import { Schema, model } from 'mongoose';
import { EnumGenre } from '../interfaces/genre-document.interface';
import { ITVShow } from '../interfaces/tv-show-document.interface';

export const TvShowSchema = new Schema<ITVShow>({
  id: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    type: [{ type: String, enum: Object.values(EnumGenre) }],
    required: true,
  },
  episodes: {
    type: [
      {
        episodeNumber: { type: Number, required: true },
        seasonNumber: { type: Number, required: true },
        releaseDate: { type: Date, required: true },
        director: { type: String, required: true },
        actors: { type: [String], required: true },
      },
    ],
    required: true,
  },
});


export const TvShow = model<ITVShow>('TvShow', TvShowSchema);