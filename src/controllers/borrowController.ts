import { NextFunction, Request, Response } from 'express'
import Transaction from '../transaction'
import { log } from 'console'


export const borrowBook = (req: Request, res: Response, next: NextFunction): void => { 
    try {
        log('borrow book endpoint')
        const { bookID, userID, borrowDate } = req.body
        log("req.body", req.body)
        if (!bookID || !userID || !borrowDate ) {
            throw new Error('missing bookID/userID/borrowDate')
        }

        let dateTime = new Date()
        log('datetime', dateTime)

        const transaction = new Transaction({
            bookID,
            userID,
            // borrowDate
            dateTime
        })

        transaction.save() 

        res.json({message: 'borrowed book successfully'})
    } catch(err) {
        log('err', err)
        next(err)
    }
}

export const returnBook = (req: Request, res: Response, next: NextFunction): void => { 
    try {
        log('return book endpoint')
        const { bookID, userID, returnDate } = req.body
        // get transaction based on book id & userid? 
        const filter = {'bookID': bookID, 'userID': userID}
        const found = Transaction.find(filter)

        let dateTime = new Date()

        if (!found) {
            throw new Error('transaction not found')
        }
        // update the return date
        const update = {
            returnDate: dateTime,
            // returnDate: returnDate
        }

        // TODO fix me this doesn't update
        let doc = Transaction.findOneAndUpdate(filter,update)
        

        res.json({message: 'returned book successfully'})
    } catch(err) {
        log('err', err)
        next(err)
    }
}

