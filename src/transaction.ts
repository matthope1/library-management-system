import mongoose, { Document } from 'mongoose'

interface ITransaction extends Document {
  bookID: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  borrowDate: Date;
  returnDate?: Date;
}

const transactionSchema = new mongoose.Schema({
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  returnDate: {
    type: Date,
  },
})

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)

export default Transaction
