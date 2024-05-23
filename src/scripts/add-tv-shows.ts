import { connect } from 'mongoose';
import { ITVShow } from '../my-list/interfaces/tv-show-document.interface';
import { TvShow } from '../my-list/schemas/tv-show.schema';

const tvShows: Partial<ITVShow>[] = [
  {
    title: 'TvShow1',
    description: 'Description1',
    genres: ['Action'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: 'Director1',
        actors: ['Actor1', 'Actor2'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: 'Director1',
        actors: ['Actor1', 'Actor2'],
      },
    ],
  },
  {
    title: 'TvShow2',
    description: 'Description2',
    genres: ['Comedy'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: 'Director2',
        actors: ['Actor3', 'Actor4'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: 'Director2',
        actors: ['Actor3', 'Actor4'],
      },
    ],
  },
  {
    title: 'TvShow3',
    description: 'Description3',
    genres: ['Horror'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: 'Director3',
        actors: ['Actor5', 'Actor6'],
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: 'Director3',
        actors: ['Actor5', 'Actor6'],
      },
    ],
  },
];

async function main() {
  // Don't forget to update the database name to /stage for dev, /test for testing
  await connect('mongodb://localhost:27017/test');

  await TvShow.insertMany(tvShows);

  console.log('TvShows added successfully');
}

main().then(() => {
  process.exit(0);
}).catch(console.error);