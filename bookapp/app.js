// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

UI.prototype.clearFields = function() {

  // Clear inputs

  const inputs = document.querySelectorAll('input:not(input[type=submit])');
  inputs.forEach(function(input) {
    input.value = '';
  });
}

// Show alert

UI.prototype.showAlert = function(msg, className) {

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

UI.prototype.removeAlert = function() {
  const alert = document.querySelector('.alert');
  if(alert)
    document.querySelector('.alert').remove();
}


// Add Book to List

UI.prototype.addBookToList = function(book) {

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

UI.prototype.deleteBook = function(target) {
  if(target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showAlert('Book Removed!', 'success');
  }
}

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

  ui.deleteBook(evt.target);

  evt.preventDefault();
});
