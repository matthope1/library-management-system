// Fetch books and display on the main page
const fetchBooks = async () => {
    console.log('fetch books')

    const backendAPI = 'http://localhost:3000/api/books'
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    const response = await fetch(backendAPI, requestOptions)
    books = await response.json()
    console.log('books: ', books)

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
        editButton.addEventListener('click', () => openEditModal(book.title, book.author, book.ISBN));
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
function openEditModal(title, author, ISBN) {
    // Populate form fields
    document.getElementById('editTitle').value = title;
    document.getElementById('editAuthor').value = author;
    document.getElementById('editISBN').value = ISBN;

    // Show the modal
    $('#editBookModal').modal('show');
}

// const saveEditedBook = () => {
//     console.log("save edited books called")

// }


let form = document.getElementById("editBookForm");

form.addEventListener("submit", (e) => {
    console.log("submit event listener hit")
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData); console.log("form props", formProps)
});