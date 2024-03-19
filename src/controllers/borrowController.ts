import { NextFunction, Request, Response } from 'express'
import Transaction from '../transaction'
import { log } from 'console'


export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookID, userID, borrowDate } = req.body
    if (!bookID || !userID || !borrowDate) {
      const errMessage = 'missing bookID/userID/borrowDate'
      next(errMessage)
      return
    }

    // if user already borrowed this book, check if they have returned it
    // if not then don't allow borrow call
    // if they have returned it then remove return date and update borrow date

    const filter = { 'bookID': bookID, 'userID': userID }
    const found = await Transaction.findOne(filter).exec()


    if (!found) {
      // if no tx for this book/user exists 
      const transaction = new Transaction({
        bookID,
        userID,
        borrowDate,
      })
      transaction.save()
    }

    if (found && !found.returnDate) {
      const err = new Error('user already borrowed book')
      next(err)
      return
    }

    if (found && found.returnDate) {
      const update = {
        returnDate: "",
        borrowDate
      }
      const updated = await Transaction.findOneAndUpdate(filter, update, { new: true })
      if (!updated) {
        next('Failed to update transaction')
      }
    }

    res.json({ message: 'borrowed book successfully' })

  } catch (err) {
    log('err', err)
    next(err)
  }
}

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookID, userID, returnDate } = req.body
    const filter = { 'bookID': bookID, 'userID': userID }
    const found = await Transaction.findOne(filter).exec()

    if (!found) {
      const err = new Error('Book has not been borrowed')
      next(err)
      return
    }

    if (found.returnDate) {
      const err = new Error('Book already returned')
      next(err)
      return
    }

    const update = {
      returnDate
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(filter, update, { new: true })

    if (!updatedTransaction) {
      const err = new Error('Failed to update transaction')
      next(err)
      return
    }

    res.json({ message: 'returned book successfully' })
  } catch (err) {
    log('err', err)
    next(err)
  }
}

