
import { log } from 'console'
import { NextFunction, Request, Response } from 'express'
import { Book } from '../book'

export const getAllBooks = async (req: Request, res: Response) => {

    try {
        log("get all books endpoint")
        const books = await Book.find();
        log("books returned from db: ", books)
        res.json(books)

    } catch(err) {
        log("error", err)
        res.status(500).json({error: err})
    }
}

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {id} = req.params
        const found = await Book.find({ "_id": `${id}`})
        res.json(found)

    } catch(err) {
        log("error", err)
        // TODO: test this
        next(err);
        // res.status(500).json({error: err})
    }
}

export const addBook = (req: Request, res: Response) => {

    try {

        const {title, author, ISBN} = req.body

        if (!title || !author || !ISBN ) {
            const errorMessage = 'missing title/author/isbn'
            res.status(500).json({ error: errorMessage })
        }

        const book = new Book({
            title: title,
            author: author,
            ISBN: ISBN 
        })

        book.save()

        res.json({message: 'saved book successfully'})

    } catch(err) {
        log("error", err)
        res.status(500).json({error: err})
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, author, isbn } = req.body

        if (!title && !author && !isbn) {
            const errorMessage = 'provided no fields to update'
            res.status(500).json({error: errorMessage})
        }
        if (!id) {
            const errorMessage = 'missing book id'
            res.status(500).json({error: errorMessage})
        }
        const filter = { '_id': id }
        const update = { 
            title: title, 
            author: author,
            isbn: isbn
        };

        // `doc` is the document _before_ `update` was applied
        // TODO: get err/success response from update call and send response back to client
        let doc = await Book.findOneAndUpdate(filter, update)

        res.json({message: 'updated book successfully'})

    } catch(err) {
        log('error', err)
        res.status(500).json({error: err})
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const {id} =  req.params

        if (!id) {
            const errorMessage = 'missing book id'
            res.status(500).json({error: errorMessage})
        }
        const filter = {'_id': id}
        const deleteResult = await Book.deleteOne(filter)

        if (deleteResult.deletedCount == 1) {
            res.json({message: 'book deleted successfully'})
        }

        if (deleteResult.acknowledged == true && deleteResult.deletedCount == 0) {
            res.json({message: 'book id does not exist'})
        }

    } catch(err) {
        log('error', err)
        res.status(500).json({error: err})
    }
}