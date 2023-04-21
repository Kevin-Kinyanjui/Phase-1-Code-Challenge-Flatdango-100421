
const movieTitles = document.getElementById('filmList');
const image = document.getElementById('poster');
const showing = document.querySelector("#showing");
const ticketsNumber = document.getElementById('ticket-num');
const ticketButton = document.getElementById('buy-ticket');


document.addEventListener("DOMContentLoaded", () => {
    fetchFilms();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyingTickets);
});

function fetchFilms() {
    fetch('http://localhost:3000/films')
      .then(res => res.json())
      .then(data => {
        renderFilms(data)
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
      }
)}

function renderFilms(film) {
    film.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'film'
        li.id = "id" + movie.id;
        li.innerHTML = movie.title;
        movieTitles.appendChild(li);
        li.addEventListener("click", () => {handleMovieClick(movie)});
    })
}

function handleMovieClick(movie) {
    image.src = movie.poster;
    image.alt = movie.title;
    
    showing.querySelector("#title").textContent = movie.title;
    showing.querySelector("#runtime").textContent = movie.runtime+" minutes";
    showing.querySelector("#film-info").textContent = movie.description;
    showing.querySelector("#showtime").textContent = movie.showtime;
    showing.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold;

    ticketButton.style.backgroundColor = "orange"
    ticketButton.textContent = "Buy Ticket"
}

document.querySelector("#buy-ticket").addEventListener("click", handleBuyingTickets);

function handleBuyingTickets() {
    let remainingTickets = (ticketsNumber.textContent.split(" ")[0]);
    //ticketsNumber.textContent = ` ${remainingTickets} `

    if (remainingTickets > 0) {
        ticketsNumber.textContent = `${remainingTickets - 1} `
        ticketButton.style.backgroundColor = "orange"
        ticketButton.textContent = "Buy Ticket"
    } else if (remainingTickets <= 0) {
        alert ("No more tickets")
        ticketButton.style.backgroundColor = "grey"
        ticketButton.textContent = "sold out"
    }
}

    