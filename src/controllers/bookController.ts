
import mongoose from 'mongoose'
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

export const getBookById = async (req: Request, res: Response) => {

    try {
        log("get book by id")
        const {id} = req.params
        log("id", id)
        // Use the find() method to get all records from the 'books' collection
        const found = await Book.find({ "_id": `${id}`})
        log("book returned from db: ", found)
        res.json(found)

    } catch(err) {
        console.log("error", err)
        res.status(500).json({error: err})
    }
}


export const addBook = (req: Request, res: Response) => {

    try {
        log("add book endpoint")
        // TODO: get title, author, isbn from req body
        log("req.body", req.body)

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

        res.json({message: 'saved book successfully'})

    } catch(err) {
        console.log("error", err)
        res.status(500).json({error: err})
    }
}