// Script Name: MovieController.js
// Description: This script loads data from OMDB for the specific
// Movies that are searched for in movies.html, and enables
// Functionality for hints, lives and ending the game
// Author: Tom Curran
// Date: 2024-11-21

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const hintGrid = document.getElementById("hint-grid");
const resultGrid = document.getElementById("result-grid");
const endMessage = document.getElementById("endMessage");
const lifeCount = document.getElementById("lifeCount");
const lifeTip = document.getElementById("lifeTip");

let lifeNum = 5;
let correctName,
  correctCover,
  correctYear,
  correctDate,
  correctRating,
  correctGenre,
  correctWriters,
  correctActors,
  correctLanguage,
  correctAwards,
  correctSummary;

/**
 * Retrieves data from OMDB for the correct movie, used to create hints
 * and the results section
 * @param {string} movieName - Name of the correct movie, used to
 * construct an api link that is fetched to get info from OMDB
 */
async function getAnswerVals(movieName) {
  correctName = movieName;
  // Found in the env file, hides api key
  const omdbLink = getOmdbLink(correctName);
  const res = await fetch(`${omdbLink}`);
  const data = await res.json();
  // Found in the env file, hides api key
  const omdbDataLink = getOmdbDataLink(data.Search[0].imdbID);
  const result = await fetch(omdbDataLink);
  const movieDetails = await result.json();

  if (movieDetails.Title === correctName) {
    correctCover = movieDetails.Poster;

    if (movieDetails.Poster !== null) {
      correctCover = movieDetails.Poster;
    } else {
      correctCover = "../images/image_not_found.png";
    }

    if (movieDetails.Year !== null) {
      correctYear = movieDetails.Year;
    } else {
      correctYear = "N/A";
    }

    if (movieDetails.Released !== null) {
      correctDate = movieDetails.Released;
    } else {
      correctDate = "N/A";
    }

    if (movieDetails.Rated !== null) {
      correctRating = movieDetails.Rated;
    } else {
      correctRating = "N/A";
    }

    if (movieDetails.Genre !== null) {
      correctGenre = movieDetails.Genre;
    } else {
      correctGenre = "N/A";
    }

    if (movieDetails.Writer !== null) {
      correctWriters = movieDetails.Writer;
    } else {
      correctWriters = "N/A";
    }

    if (movieDetails.Actors !== null) {
      correctActors = movieDetails.Actors;
    } else {
      correctActors = "N/A";
    }

    if (movieDetails.Language !== null) {
      correctLanguage = movieDetails.Language;
    } else {
      correctLanguage = "N/A";
    }

    if (movieDetails.Awards !== null) {
      correctAwards = movieDetails.Awards;
    } else {
      correctAwards = "N/A";
    }

    if (movieDetails.Plot !== null) {
      correctSummary = movieDetails.Plot;
    } else {
      correctSummary = "N/A";
    }
  }

  createHints();
}

/**
 * Creates the hint section for the HTML page,
 * adds functionality for the hint buttons
 */
function createHints() {
  hintGrid.innerHTML = `
    <div class = "content-info">
        <div class = "hintTitle">
            <span id = "hintTitle">Hints</span>
            <div class="tooltip">[?]
                <span class="tool-tip-text">Click the buttons to reveal hints. Costs 1 life!</span>
            </div>
        </div>
        <p class = "details" id = "date" style="display: none">Release Year: ${correctYear}</p>
        <button type='button' id= 'dateButton' class = "button-64" role="button"><span class="text">Year</span></button>
        <br>
        <p class = "details" id = "rate" style="display: none">Rated: ${correctRating}</p>
        <button type='button' id= 'rateButton' class = "button-64"><span class="text">Rating</span></button>
        <br>
        <p class = "details" id = "genre" style="display: none">Genre: ${correctGenre}</p>
        <button type='button' id= 'genreButton' class = "button-64"><span class="text">Genre</span></button>
        <br>
        <p class = "details" id = "actors" style="display: none"><b>Actors:</b> ${correctActors}</p>
        <button type='button' id= 'actorsButton' class = "button-64"><span class="text">Actors</span></button>
        <br>
        <p class = "details" id = "awards" style="display: none"><b>Awards:</b> ${correctAwards}</p>
        <button type='button' id= 'awardsButton' class = "button-64"><span class="text">Awards</span></button>
    </div>
    `;

  dateButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("date");
  });

  rateButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("rate");
  });

  genreButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("genre");
  });

  actorsButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("actors");
  });

  awardsButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("awards");
  });

  acceptPopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
    revealHint("date");
  });

  closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
  });

  window.addEventListener("click", function (event) {
    if (event.target === myPopup) {
      myPopup.classList.remove("show");
    }
  });
}

/**
 * Reveals selected hint and updates health
 * @param {string} hint - Name of the hint that was clicked on
 */
function revealHint(hint) {
  lifeNum = lifeNum - 1;
  lifeCount.innerHTML = "Lives: " + lifeNum;
  var text = document.getElementById(hint);
  var button = document.getElementById(hint + "Button");

  if (lifeNum === 0) {
    endMessage.innerHTML = "Sorry, The commercial was for:";
    endGame();
  }

  if (text.style.display === "none") {
    text.style.display = "block";
    button.style.display = "none";
  } else {
    text.style.display = "none";
  }
}

/**
 * Trims and sends strings typed into the search box to be searched for,
 * is called when a char is added or deleted from the search box
 */
function formatName() {
  let searchTerm = movieSearchBox.value.trim();

  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovieData(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

/**
 * Fetches ids from movies with names matching any string
 * typed in the search box
 * @param {string} searchTerm - Name of a movie typed into the search box
 */
async function loadMovieData(searchTerm) {
  const URL = getOmdbLink(searchTerm);
  const res = await fetch(`${URL}`);
  const data = await res.json();

  if (data.Response === "True") displayMovieList(data.Search);
  console.log(data.Search);
}

/**
 * Creates a list that displays the names, poster, and year of movies
 * that matched the search term
 * @param {string} movies - JSON array that holds data for 10 movies
 */
function displayMovieList(movies) {
  searchList.innerHTML = "";

  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    let moviePoster;
    movieListItem.dataset.title = movies[idx].Title;
    movieListItem.classList.add("search-list-item");

    if (movies[idx].Poster !== "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "../images/image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;

    searchList.appendChild(movieListItem);
  }

  createMovieButtons();
}

/**
 * Creates a button for each movie in the displayed list
 */
function createMovieButtons() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");

  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      checkAnswer(movie.dataset.title);
    });
  });
}

/**
 * Checks the guessed name against the correct name, ends the game if
 * the name was guessed or if lives equal 0
 * @param {string} guessedName - Name of selected movie from the displayed
 * movie list
 */
function checkAnswer(guessedName) {
  if (guessedName !== correctName && lifeNum > 0) {
    lifeNum = lifeNum - 1;
    lifeCount.innerHTML = "Lives: " + lifeNum;

    if (lifeNum === 0) {
      endMessage.innerHTML = "Sorry, The commercial was for:";
      endGame();
    }
  } else if (guessedName === correctName) {
    endMessage.innerHTML = "You're right, the commercial was for:";
    endGame();
  }
}

/**
 * Reveals and hides elements when the game ends
 */
function endGame() {
  endMessage.style.display = "block";
  hintGrid.style.display = "none";
  resultGrid.style.display = "block";
  movieSearchBox.type = "hidden";
  lifeCount.style.display = "none";
  lifeTip.style.display = "none";

  displayMovieDetails();
}

/**
 * Creates results section that displays info for the correct movie
 */
function displayMovieDetails() {
  resultGrid.innerHTML = `
    <div class = "content-poster">
        <img src = "${correctCover}" alt = "movie poster">
    </div>
    <div class = "content-info">
        <h3 class = "content-title">${correctName}</h3>
        <p class = "details">Year: ${correctYear}</p>
        <p class = "details">Ratings: ${correctRating}</p>
        <p class = "details">Released: ${correctDate}</p>
        <p class = "details"><b>Genre:</b> ${correctGenre}</p>
        <p class = "details"><b>Writer:</b> ${correctWriters}</p>
        <p class = "details"><b>Actors: </b>${correctActors}</p>
        <p class = "details"><b>Plot:</b> ${correctSummary}</p>
        <p class = "details"><b>Language:</b> ${correctLanguage}</p>
        <p class = "details"><b>Awards:</b> ${correctAwards}</p>
    </div>
    `;
}

window.addEventListener("click", (event) => {
  if (event.target.className !== "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
