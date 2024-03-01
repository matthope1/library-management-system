
// src/routes/bookRoutes.ts
import express from 'express'
import * as bookController from '../controllers/bookController'
import * as borrowController from  '../controllers/borrowController'

const router = express.Router()

router.get('/books', bookController.getAllBooks)
// router.get('/books/:id', bookController.getBookById)
// router.post('/books', bookController.addBook)
// router.put('/books/:id', bookController.updateBook)
// router.delete('/books/:id', bookController.deleteBook)

router.post('/borrow', borrowController.borrowBook)
// router.post('/return', borrowController.returnBook)


export default router