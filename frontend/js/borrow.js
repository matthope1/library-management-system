
const BACKEND_URL = 'http://localhost:3000/api/'


const borrowBook = async (bookID, userID) => {
  console.log("borrow book called")
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "bookID": bookID,
    "userID": userID,
    "borrowDate": Date.now()
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(BACKEND_URL + "borrow", requestOptions)
  const resJson = await response.json()
  console.log("error message", resJson.error)
  if (resJson.error) {
    alert("Error while borrowing book: " + resJson.error)
  } else {
    alert("Successfully borrowed book")
  }
}



const returnBook = async (bookID, userID) => {
  console.log("return book called")

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "bookID": bookID,
    "userID": userID,
    "returnDate": Date.now()
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(BACKEND_URL + "/return", requestOptions)
  const resJson = await response.json()
  console.log("resJson return book", resJson)
  if (resJson.error) {
    alert("Error while returning book: " + resJson.error)
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
    editButton.addEventListener('click', () => borrowBook(book._id, userID = 1));
    editButton.textContent = 'Borrow';

    // const buttonContainer = document.createElement('div')
    // buttonContainer.classList.add('btn-container')
    // buttonContainer.appendChild(editButton)

    // Append the "Edit" button to the list item
    liElement.appendChild(editButton);
    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.classList.add('btn', 'btn-primary', 'btn-sm')
    deleteButton.addEventListener('click', () => { returnBook(book._id, userID = 1) })

    deleteButton.textContent = "Return"
    liElement.appendChild(deleteButton)
    // liElement.appendChild(buttonContainer)

    ulElement.appendChild(liElement);
  })

  // Append the unordered list to the "bookList" div
  bookListDiv.appendChild(ulElement);


  // Use fetch() to get books from your backend API
  // Update the bookList div with the fetched data
}



// Initial fetch when the page loads
window.onload = function () {
  fetchBooks();
};