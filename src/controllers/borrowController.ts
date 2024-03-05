import { Request, Response } from 'express'
import Transaction from '../transaction'
import { log } from 'console'


export const borrowBook = (req: Request, res: Response): void => { 
    try {

    } catch(err) {
        log('err', err)
        res.status(500).json({error: err})
    }
}

export const returnBook = (req: Request, res: Response): void => { 
    try {

    } catch(err) {
        log('err', err)
        res.status(500).json({error: err})
    }
}

