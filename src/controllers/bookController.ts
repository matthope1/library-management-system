
import { log } from 'console'
import { Request, Response } from 'express'
import { Book } from '../book'

export const getAllBooks = async (req: Request, res: Response) => {

    try {
        log("get all boooks endpoint")
        // Use the find() method to get all records from the 'books' collection
        const books = await Book.find();
        log("books returned from db: ", books)
        res.json(books)

    } catch(err) {
        console.log("error", err)
        res.status(500).json({error: err})
    }
}

export const addBook = (req: Request, res: Response) => {

    try {
        log("add book endpoint")
        // TODO: get title, author, isbn from req body
        const {title, author, isbn} = req.body

        if (!title || ! author || ! isbn) {
            const errorMessage = 'missing title/author/isbn'
            res.status(500).json({ error: errorMessage })
        }

        const book = new Book({
            title: title ,
            author: author,
            ISBN: isbn
        })

        book.save()

    } catch(err) {
        console.log("error", err)
        res.status(500).json({error: err})
    }
}