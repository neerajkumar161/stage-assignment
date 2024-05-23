import { connect } from 'mongoose';
import { User } from 'src/my-list/schemas/User.schema';
import { IUser } from '../my-list/interfaces/user-document.interface';

const users: Partial<IUser>[] = [
  {
    username: 'user1',
    preferences: {
      favoriteGenres: ['Action', 'Comedy'],
      dislikedGenres: ['Horror'],
    },
    watchHistory: [
      {
        contentId: 'content1',
        watchedOn: new Date(),
        rating: 4,
      },
    ],
  },
  {
    username: 'user2',
    preferences: {
      favoriteGenres: ['Comedy', 'Romance'],
      dislikedGenres: ['Action'],
    },
    watchHistory: [],
  },
];

async function main() {
  // Don't forget to update the database name to /stage for dev, /test for testing
  await connect('mongodb://localhost:27017/test');

  await User.insertMany(users);

  console.log('Users added successfully');
}

main().then(() => {
  process.exit(0);
}).catch(console.error);
