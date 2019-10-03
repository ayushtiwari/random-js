class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  constructor() {}

  clearFields() {

    // Clear inputs

    const inputs = document.querySelectorAll('input:not(input[type=submit])');
    inputs.forEach(function(input) {
      input.value = '';
    });
  }

  // Show alert

  showAlert(msg, className) {

    const ui = new UI();

    if(document.querySelector('.alert'))
      ui.removeAlert();


    const div = document.createElement('div');
    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function() {
      ui.removeAlert();
    }, 3000);
  }


  // Remove Alert

  removeAlert() {
    const alert = document.querySelector('.alert');
    if(alert)
      document.querySelector('.alert').remove();
  }


  // Add Book to List

  addBookToList(book) {

    const list = document.getElementById('book-list');

    // Create tr

    const row = document.createElement('tr');

    row.innerHTML = `

      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>

    `

    list.appendChild(row);

  }

  // Delete book
  deleteBook(target) {
    if(target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
      const ui = new UI();
      ui.showAlert('Book Removed!', 'success');
    }
  }

}

// Local Storage class

class Storage {

  static getBooks() {
    let books = [];
    if(localStorage.getItem('books') != null) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Storage.getBooks();
    let ui = new UI();
    books.forEach(function(book) {
      ui.addBookToList(book);
    });
  }

  static addBook(book) {

    const books = Storage.getBooks();
    console.log(books);

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static removeBook(isbn) {
    const books = Storage.getBooks();

    const index = books.findIndex(function(book) {
      return book.isbn === isbn;
    });

    if(index!==-1) {
      books.splice(index, 1);
    }

    localStorage.setItem('books', JSON.stringify(books));

  }
}

document.addEventListener('DOMContentLoaded', function() {
  Storage.displayBooks();
});

document.querySelectorAll('input:not(input[type=submit])').forEach(function(element) {
  const ui = new UI();
  element.addEventListener('focus', function() {

    ui.removeAlert();
  });
});

// Event Listener

document.getElementById('book-form').addEventListener('submit', function(evt) {

  const title = document.getElementById('title'),
        author = document.getElementById('author'),
        isbn = document.getElementById('isbn');

  const ui = new UI();

  if(title.value.trim() && author.value.trim() && isbn.value.trim()) {

    const book = new Book(title.value.trim(), author.value.trim(), isbn.value.trim());

    ui.addBookToList(book);

    // Add to local storage

    Storage.addBook(book);

    ui.showAlert('Book Added.', 'success');
    ui.clearFields();

  } else {
    // Error alert
    ui.showAlert('Please fill out all fields.', 'error');

  }

  evt.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(evt) {

  const ui = new UI();

  if(evt.target.classList.contains('delete')) {
    Storage.removeBook(evt.target.parentElement.previousElementSibling.textContent);
    ui.deleteBook(evt.target);
  }

  evt.preventDefault();
});
