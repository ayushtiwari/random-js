document.querySelector('.get-jokes').addEventListener('click', displayJokes);

function displayJokes(evt) {

  const number = document.getElementById('number');

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number.value}`, true);

  xhr.addEventListener("load", function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';

      if(response.type === 'success') {

        const jokes = response.value;

        jokes.forEach(function(joke) {

          output += `

              <li>${joke.joke}</li>

          `;

        });

      } else {
        output += `

          <li>Something went wrong.</li>

        `;
      }

      document.querySelector('.jokes').innerHTML = output;

    }
  });

  xhr.send();

  evt.preventDefault();
}
