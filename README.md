# library-management-system

Overview

Library Management System using Node.js and Express for the backend, and Bootstrap for the frontend UI. The system will allow users to perform CRUD operations on books and manage borrow and return transactions. 

Objectives

Build RESTful APIs using Node.js and Express to manage books and borrow operations.
Implement a frontend using HTML, CSS, and Bootstrap to interact with the backend.
Apply CRUD operations on books: Create, Read, Update, Delete.
Implement functionality to borrow and return books.
Use MongoDB as the database for storing book and transaction data.


API documentation 

# Assignment1 API Documentation

## Overview

This API provides endpoints to manage books and borrowing activities.

## Endpoints

### 1. Delete Book

- **Request:**
  - Method: DELETE
  - URL: `localhost:3000/api/books/{bookId}`
  - Deletes a book by its ID.

### 2. Get Book by ID

- **Request:**
  - Method: GET
  - URL: `localhost:3000/api/books/{bookId}`
  - Retrieves a book by its ID.

### 3. Add New Book

- **Request:**
  - Method: POST
  - URL: `localhost:3000/api/books`
  - Adds a new book to the collection.
  - **Body:**
    ```json
    {
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "ISBN": "978-0-316-76948-0"
    }
    ```

### 4. Get All Books

- **Request:**
  - Method: GET
  - URL: `localhost:3000/api/books`
  - Retrieves a list of all books.

### 5. Update Book

- **Request:**
  - Method: PUT
  - URL: `localhost:3000/api/books/{bookId}`
  - Updates a book by its ID.
  - **Body:**
    ```json
    {
      "author": "me"
    }
    ```

### 6. New Request

- **Request:**
  - Method: POST
  - URL: `localhost:3000/borrow`
  - Creates a new borrowing request.


