// user can select 
//price per ticket:
// the name of a movie, 
// the time of day that they would like to see the movie 
// and their age. 
function Movies() {
  this.movies = {};
  this.currentId = 0;
}
Movies.prototype.addMovie = function (movie) {
  movie.id = this.currentId;
  this.movies[movie.id] = movie;
  this.currentId++;
};

Movies.prototype.findMovie = function (id) {
  if (this.movies[id] !== undefined) {
    return this.movies[id];
  }
  return false;
};
//protoype methods to add movies to movie.movies
function Movie(movieName, times, cost) {
  this.movieName = movieName;
  this.times = times;
  this.cost = cost;
}

//ticket constructor called in sumbit event
function Ticket(movieName, movieID, timeOfDay, ageGroup) {
  this.movieName = movieName;
  this.movieID = movieID;
  this.timeOfDay = timeOfDay;
  this.ageGroup = ageGroup;
  this.totalCost = 0;
}

Ticket.prototype.calculateCost = function() {
  let cost = movies.movies[this.movieID].cost;

  if (this.ageGroup === "1" || this.ageGroup === "4") {
    cost += 133;
  } 
  if (this.timeOfDay >= 2000) {
    cost += 922; 
  }
  this.totalCost = cost;
};

// brainstorming ideas
//we should be able to movie objects
// whenever we click on specific movie object, we should have times coming out
// click event on parent

//movies
//movie {1. name}
//currentId
//ui

const movies = new Movies(); // object that holds all movies

// make movies here

const movie1 = new Movie("Breaking Bod", [1300, 1600], 20);
const movie2 = new Movie("Christmas Movie", [1500, 2100],15);
const movie3 = new Movie("Revengers", [0900, 1300, 1900], 30);
const movie4 = new Movie("Transformation", [1100, 1500, 1900, 2000], 10);


movies.addMovie(movie1);
movies.addMovie(movie2);
movies.addMovie(movie3);
movies.addMovie(movie4);

//type radio, id movie, name movie, value=,
function displayMovies() {
  const div = document.getElementById("movies-shown");
  const label = document.createElement("label");
  label.setAttribute("for", "movies");
  label.append("Movies Available: ");

  div.append(label);

  for (let i = 0; i < movies.currentId; i++) {
    const div2 = document.createElement("div");
    const label2 = document.createElement("label");
    label2.setAttribute("for", "movie" + i);
    label2.append(movies.movies[i].movieName)

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", "movie" + i);
    input.setAttribute("value", i);
    input.setAttribute("name", "movies");

    div2.append(input);
    div2.append(label2);
    div.append(div2);
  }
}

function displayTime(event) {
  let movie = movies.movies[event.target.value];
  console.log(event.target);
  if (movie === undefined) {
    return;
  }
  const showTimeDiv = document.querySelector("div#show-time");
  showTimeDiv.innerText = null;

  const label = document.createElement("label");
  label.setAttribute("for", "movie-times")
  const select = document.createElement("select");
  select.setAttribute("name", "movie-times");
  select.setAttribute("id", "movie-times");

  console.log(movie.times.length);
  for (let i = 0; i < movie.times.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.append(movie.times[i]);
    select.append(option);
  }
  showTimeDiv.append(label);
  showTimeDiv.append(select);
}
function displayTicket(ticket) {
  document.querySelector(".ticket-movie-name").innerText = ticket.movieName;
  document.querySelector(".ticket-show-time").innerText = ticket.timeOfDay;
  document.querySelector(".ticket-total-cost").innerText = "$" + ticket.totalCost;
}

function handleSubmit(event) {
  event.preventDefault();
  const chosenMovie = document.querySelector("input[name=movies]:checked").value;
  const chosenTime = document.getElementById("movie-times").value;

  const movieName = movies.movies[chosenMovie].movieName;
  const movieTime = movies.movies[chosenMovie].times[chosenTime];

  const inputAge = document.getElementById("age").value; 

  const ticket = new Ticket(movieName, chosenMovie, movieTime, inputAge);
  ticket.calculateCost();
  displayTicket(ticket) 
  const showTicket = document.getElementById("ticket");
  console.log(ticket);
  // showTicket.append(ticket);
}


displayMovies();
document.getElementById("showMovies").addEventListener("submit", handleSubmit);
document.querySelector("div#movies-shown").addEventListener("click", displayTime);