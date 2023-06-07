// 1- If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
// 2- All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take
// user’s input and store the new book objects into an array. Your code should look something like this:
// 3- Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on
// their own “card”. It might help for now to manually add a few books to your array so you can see the display.
// 4- Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages,
// whetherit’s been read and anything else you might want. You will most likely encounter an issue where submitting your form will not do what you
// expect it to do. That’s because the submit input tries to send the data to a server by default. If you’ve done the bonus section for the
// calculator assignment, you might be familiar with event.preventDefault();. Read up on the event.preventDefault documentation again and see
// how you can solve this issue!
// 5- Add a button on each book’s display to remove the book from the library. You will need to associate your DOM elements with the actual book
// objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
// 6- Add a button on each book’s display to change its read status. To facilitate this you will want to create the function that toggles a
// book’s read status on your Book prototype instance.

let myLibrary = [];

class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const addButton = document.getElementById("form-card");
const form = document.getElementById("new-book-form");

addButton.addEventListener("submit", e => {
  e.preventDefault();
  addBookToLibrary();
  // clearForm();
  getBooks();
});

const getInputInfo = () => {
  const name = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readit = document.getElementById("isRead").checked;

  if (name === "" || author === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required"
    });
  } else {
    return new Book(name, author, pages, readit);
  }
};

const addBookToLibrary = () => {
  //Agregar los valores al array de libros
  //console.log(getInputInfo());
  const book = getInputInfo();
  myLibrary.push(book);
  form.reset();
};

const deleteBook = index => {
  myLibrary.splice(index, 1);
  getBooks();
};

const toggleReadStatus = index => {
  myLibrary[index].read = !myLibrary[index].read;
  getBooks();
};

const getBooks = () => {
  const listBooks = document.getElementById("bookList");
  listBooks.innerHTML = "";

  //Recorrer el array
  myLibrary.forEach((book, index) => {
    //Crear y insertar en la lista
    //console.log(book.read);
    listBooks.innerHTML += `            
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td><button class="btn btn-${book.read
                          ? "success"
                          : "warning"}" onclick="toggleReadStatus(${index})">${book.read
      ? "Leído"
      : "No leído"}</button></td>
                        <td><button class="btn btn-danger" onclick="deleteBook(${index})">Delete</button></td>
                    </tr>
                `;
  });
};

const clearForm = () => {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("isRead").checked = false;
};
