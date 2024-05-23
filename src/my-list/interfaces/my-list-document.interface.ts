import { Document, Schema } from 'mongoose';

type TItem = {
  contentId: Schema.Types.ObjectId;
  contentType: 'Movie' | 'TVShow';
};
export interface MyList extends Document {
  userId: Schema.Types.ObjectId;
  items: Array<TItem>;
}
