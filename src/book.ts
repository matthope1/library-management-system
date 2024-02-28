import mongoose, { Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  ISBN: string;
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;