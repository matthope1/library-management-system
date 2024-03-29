
// Fetch books and display on the main page
const BACKEND_URL = 'http://localhost:3000/api/'

const borrowBook = async (bookID, userID, borrowDate) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json")

  const raw = JSON.stringify({

    bookID: bookID,
    userID: userID,
    borrowDate, borrowDate
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(BACKEND_URL + "/borrow", requestOptions)
  const responseJson = await response.json()

  if (responseJson.error) {
    // display error alert
    alert("Error borrowing book: ", responseJson.error)
  } else {
    alert("Successfully borrowed book")
  }
}

const returnBook = async (bookID, userID, returnDate) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    bookID: bookID,
    userID: userID,
    returnDate: returnDate
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(BACKEND_URL + "/return", requestOptions)
  const responseJson = response.json()

  if (responseJson.error) {
    alert("Error returning book: ", responseJson.error)
  } else {
    alert("Successfully returned book")
  }

}


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
    editButton.textContent = 'Edit';

    // const buttonContainer = document.createElement('div')
    // buttonContainer.classList.add('btn-container')
    // buttonContainer.appendChild(editButton)

    // Append the "Edit" button to the list item
    liElement.appendChild(editButton);
    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.classList.add('btn', 'btn-primary', 'btn-sm', 'red')
    deleteButton.addEventListener('click', () => { deleteBook(book._id) })

    deleteButton.textContent = "Delete"
    liElement.appendChild(deleteButton)
    // liElement.appendChild(buttonContainer)

    ulElement.appendChild(liElement);
  })

  // Append the unordered list to the "bookList" div
  bookListDiv.appendChild(ulElement);

  // Use fetch() to get books from your backend API
  // Update the bookList div with the fetched data
}

const deleteBook = async (id) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  }

  const response = await fetch(BACKEND_URL + `books/${id}`, requestOptions)
  const responseJson = await response.json()
  if (responseJson.error) {
    alert("Error while deleting book: ", responseJson.error)
  } else {
    alert("Successfully deleted book")
  }
}


const saveBook = async (title, author, isbn) => {
  const headers = new Headers()
  headers.append("Content-Type", " application/json")
  const raw = JSON.stringify({
    "title": title,
    "author": author,
    "ISBN": isbn
  })

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow"
  }

  const response = await fetch(BACKEND_URL + "books", requestOptions)
  const responseJson = await response.json()

  if (responseJson.error) {
    alert("Error while saving book: ", responseJson.error)
  } else {
    alert("Successfully saved book")
  }

}


const updateBook = async (title, author, isbn, _id) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    "title": title,
    "author": author,
    "ISBN": isbn
  })


  const requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: headers,
    body: raw,
  };

  const response = await fetch(BACKEND_URL + `books/${_id}`, requestOptions)
  const responseJson = await response.json()

  if (responseJson.error) {
    alert("Error while updating book: ", responseJson.error)
  } else {
    alert("Successfully updated book")
  }
}


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


let editBookForm = document.getElementById("editBookForm");

editBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById('editTitle').value
  const author = document.getElementById('editAuthor').value
  const isbn = document.getElementById('editISBN').value
  const _id = document.getElementById('_id').value
  updateBook(title, author, isbn, _id)
});

let addBookForm = document.getElementById("addBookForm")

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('ISBN').value
  saveBook(title, author, isbn)
  $('#saveBookModal').modal('hide')
})

// Initial fetch when the page loads
window.onload = function () {
  fetchBooks();
};