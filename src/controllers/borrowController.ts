import { NextFunction, Request, Response } from 'express'
import Transaction from '../transaction'
import { log } from 'console'


export const borrowBook = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { bookID, userID, borrowDate } = req.body
        if (!bookID || !userID || !borrowDate ) {
            const errMessage = 'missing bookID/userID/borrowDate'
            next(errMessage)
        }

        // if user already borrowed this book, check if they have returned it
        // if not then don't allow borrow call
        // if they have returned it then remove return date and update borrow date

        const filter = {'bookID': bookID, 'userID': userID}
        const found = await Transaction.findOne(filter).exec()

        log('found', found)

        if (!found) {
            // if no tx for this book/user exists 
            log('not found')
            const transaction = new Transaction({
                bookID,
                userID,
                borrowDate,
            })

            transaction.save() 
        }

        if (found && !found.returnDate) {
            log('found and no return date')
            const errMessage = 'User already borrowed book' 
            next(errMessage)
        }

        if (found && found.returnDate) {
            log('found and return date ')
            const update = {
                returnDate: "",
                borrowDate
            }
            const updated = await Transaction.findOneAndUpdate(filter, update, {new: true})
            if (!updated) {
                next('Failed to update transaction')
            }
        } 

        res.json({message: 'borrowed book successfully'})
   
    } catch(err) {
        log('err', err)
        next(err)
    }
}

export const returnBook = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { bookID, userID, returnDate } = req.body
        const filter = {'bookID': bookID, 'userID': userID}
        const found = await Transaction.findOne(filter).exec()

        if (!found) {
            throw new Error('Transaction not found');
        }

        const update = {
            returnDate
        }

        const updatedTransaction = await Transaction.findOneAndUpdate(filter, update, { new: true });

        if (!updatedTransaction) {
            throw new Error('Failed to update transaction');
        }

        res.json({message: 'returned book successfully'})
    } catch(err) {
        log('err', err)
        next(err)
    }
}

