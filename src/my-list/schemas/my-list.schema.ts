import { Document, Schema, model } from 'mongoose';

export type TContent = 'Movie' | 'TVShow';

export interface IMyList extends Document {
  userId: Schema.Types.ObjectId;
  items: Array<{
    contentId: Schema.Types.ObjectId;
    contentType: TContent;
  }>;
}

export const MyListSchema = new Schema<IMyList>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  items: [
    {
      contentId: { type: Schema.Types.ObjectId, required: true }, // Movie or TVShow id
      contentType: { type: String, required: true, enum: ['Movie', 'TVShow'] }, // 'Movie' | 'TVShow'
    },
  ],
});

export const MyList = model<IMyList>('MyList', MyListSchema);
