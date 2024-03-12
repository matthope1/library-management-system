// Fetch books and display on the main page
const BACKEND_URL = 'http://localhost:3000/api/'
const fetchBooks = async () => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    const response = await fetch(BACKEND_URL + 'books', requestOptions)
    books = await response.json()

    const bookListDiv = document.querySelector('.bookList');

    const ulElement = document.createElement('ul');

    books.forEach(book => {
        const liElement = document.createElement('li');

        liElement.textContent = `${book.title} by ${book.author}, ISBN: ${book.ISBN}`;

        // Create the "Edit" button
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.classList.add('btn', 'btn-primary', 'btn-sm');
        editButton.setAttribute('data-toggle', 'modal');
        editButton.setAttribute('data-target', '#editBookModal');
        editButton.addEventListener('click', () => openEditModal(book.title, book.author, book.ISBN, book._id));
        editButton.textContent = 'Edit Book';

        // Append the "Edit" button to the list item
        liElement.appendChild(editButton);
      
        ulElement.appendChild(liElement);
    })

    // Append the unordered list to the "bookList" div
    bookListDiv.appendChild(ulElement);


    // Use fetch() to get books from your backend API
    // Update the bookList div with the fetched data
}


const updateBook = async (title, author, isbn, _id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // console.log({title, author, isbn, _id})

    const raw = JSON.stringify({
        "title": title,
        "author": author,
        "ISBN": isbn
    })

    console.log("calling update book raw: ", raw)

    const requestOptions = {
        method: "PUT",
        redirect: "follow",
        headers: myHeaders,
        body: raw,
    };
      
    const response = await fetch(BACKEND_URL + `books/${_id}`, requestOptions)
    const updateBookRes  = await response.json()
    console.log("updatebook res", updateBookRes)


}

// Open the book form modal for adding or editing
function openBookForm() {
    // Clear form fields and open the modal
}

// Save book data (Add or Update)
function saveBook() {
    // Use fetch() to send data to your backend API for adding/updating books
    // Refresh the book list after saving
}

// Borrow or return a book
function borrowReturnBook(bookId, action) {
    // Use fetch() to interact with your backend API for borrow/return operations
    // Refresh the book list after the operation
}

// Initial fetch when the page loads
window.onload = function () {
    fetchBooks();
};

// interface

// Function to open the edit modal and populate with book details
function openEditModal(title, author, ISBN, _id) {
    // Populate form fields
    document.getElementById('editTitle').value = title
    document.getElementById('editAuthor').value = author
    document.getElementById('editISBN').value = ISBN
    document.getElementById('_id').value = _id

    // Show the modal
    $('#editBookModal').modal('show');
}


let form = document.getElementById("editBookForm");

form.addEventListener("submit", (e) => {
    console.log("submit event listener hit")
    e.preventDefault();
    const title = document.getElementById('editTitle').value
    const author = document.getElementById('editAuthor').value
    const isbn = document.getElementById('editISBN').value
    const _id = document.getElementById('_id').value
    updateBook(title,author,isbn,_id)
    // call update book function

});