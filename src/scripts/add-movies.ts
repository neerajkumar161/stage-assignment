import { connect } from 'mongoose';
import { IMovie } from '../my-list/interfaces/movie-document.interface';
import { Movie } from '../my-list/schemas/movie.schema';

const movies: Partial<IMovie>[] = [
  {
    title: 'Movie1',
    description: 'Description1',
    genres: ['Action'],
    releaseDate: new Date(),
    director: 'Director1',
    actors: ['Actor1', 'Actor2'],
  },
  {
    title: 'Movie2',
    description: 'Description2',
    genres: ['Comedy'],
    releaseDate: new Date(),
    director: 'Director2',
    actors: ['Actor3', 'Actor4'],
  },
  {
    title: 'Movie3',
    description: 'Description3',
    genres: ['Horror'],
    releaseDate: new Date(),
    director: 'Director3',
    actors: ['Actor5', 'Actor6'],
  },
];

async function main() {
  // Don't forget to update the database name to /stage for dev, /test for testing
  await connect('mongodb://localhost:27017/test');

  await Movie.insertMany(movies);

  console.log('Movies added successfully');
}

main().then(() => {
  process.exit(0);
}).catch(console.error);

