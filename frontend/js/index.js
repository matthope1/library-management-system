// Fetch books and display on the main page
const fetchBooks = async () => {
    console.log('fetch books')

    const backendAPI = 'http://localhost:3000/api/books'
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    const response = await fetch(backendAPI, requestOptions)
    console.log('fetch books response.json', await response.json())

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

// Other event listeners and functions go here