import mongoose, { Document } from 'mongoose'

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
  },
});

export const Book = mongoose.model<IBook>('Book', bookSchema)


// how to create a new book

const book = new Book({
  title: 'testBook',
  author: 'testAuthor',
  ISBN: 'testISBN'
})

// this needs to happen after mongo db connect
// await book.save()

export default Book