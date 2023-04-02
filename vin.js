// Select the ul#films element
const filmList = document.querySelector('#films');

// Fetch the movie data
fetch("http://localhost:3000/films")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Loop through each movie in the data and add it to the filmList
    data.forEach(function (movie) {
      const listItem = document.createElement('li');
      listItem.classList.add('film', 'item');
      listItem.textContent = movie.title;
      filmList.appendChild(listItem);
    });

    // Select the .body element
    const films = document.querySelector('.body');

    // Loop through each movie in the data and create a new card for it
    data.forEach(function (movie) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="container">
          <img src="${movie.poster}" alt="Product Image" style="width:50%; height:50%">
          <h1><b>${movie.title}</b></h1>
          <p>Runtime: ${movie.runtime}</p>
          <p>Showtime: ${movie.showtime}</p>
          <p>Available Tickets: <span class="available-tickets">${movie.capacity - movie.tickets_sold}</span></p>
          <button class="buy-ticket">Buy Ticket</button>
        </div>
      `;
      films.appendChild(card);

      // Add a click event listener to the "Buy Ticket" button
      const buyButton = card.querySelector('.buy-ticket');
      buyButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the page from reloading
        // Check if there are any available tickets
        const availableTickets = card.querySelector('.available-tickets');
        const numAvailableTickets = parseInt(availableTickets.textContent);
        if (numAvailableTickets > 0) {
          // Update the number of available tickets and display it on the frontend
          availableTickets.textContent = numAvailableTickets - 1;

          // Update the movie data in the backend
          const newTicketsSold = movie.tickets_sold + 1;
          fetch(`http://localhost:3000/films/${movie.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tickets_sold: newTicketsSold })
          })
            .then(function(response) {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            })
            .catch(function(error) {
              console.error('There was a problem updating the movie data:', error);
            });
        } else {
          alert('Sorry, this showing is sold out!');
        }
      });
    });
  })
  .catch(function(error) {
    console.log('There was an error fetching the movie data:', error);
  });