// Script Name: GameController.js
// Description: This script loads data from IGDB for the specific
// Games that are searched for in games.html, and enables
// Functionality for hints, lives and ending the game
// Author: Tom Curran
// Date: 2024-11-21

const gameSearchBox = document.getElementById("game-search-box");
const searchList = document.getElementById("search-list");
const hintGrid = document.getElementById("hint-grid");
const resultGrid = document.getElementById("result-grid");
const endMessage = document.getElementById("endMessage");
const lifeCount = document.getElementById("lifeCount");
const lifeTip = document.getElementById("lifeTip");

let lifeNum = 5;
let correctName,
  correctCover,
  correctDate,
  correctRating,
  correctGenre,
  correctPlatform,
  correctEngine,
  correctSummary;

/**
 * Retrieves data from IGDB for the correct game, used to create hints
 * and the results section
 * @param {string} gameName - Name of the correct game, used to
 * construct an api link that is fetched to get info from IGDB
 */
async function getAnswerVals(gameName) {
  correctName = gameName;
  // GetIgdbLink and getIgdbKey are found in the env file, hides the api key
  const result = await fetch(getIgdbLink(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-api-key": getIgdbKey(),
    },
    body:
      'fields id, name, summary, cover.*, aggregated_rating, genres.*, release_dates.*, platforms.*, game_engines.*; search "' +
      correctName +
      '";, where version_parent = null;',
  });
  const data = await result.json();

  for (let idx = 0; idx < data.length; idx++) {
    if (data[idx].name === correctName) {
      correctCover = data[idx].cover.image_id;

      if (data[idx].release_dates[0].y !== null) {
        correctDate = data[idx].release_dates[0].y;
      } else {
        correctDate = "N/A";
      }

      if (data[idx].aggregated_rating !== null) {
        correctRating = data[idx].aggregated_rating;
      } else {
        correctRating = "N/A";
      }

      if (data[idx].genres.length > 1) {
        correctGenre =
          data[idx].genres[0].name + ", " + data[idx].genres[1].name;
      } else if (data[idx].genres.length === 1) {
        correctGenre = data[idx].genres[0].name;
      } else if (data[idx].genres.length === null) {
        correctGenre = "N/A";
      }

      if (data[idx].platforms.length > 1) {
        correctPlatform =
          data[idx].platforms[0].name + ", " + data[idx].platforms[1].name;
      } else if (data[idx].platforms.length === 1) {
        correctPlatform = data[idx].platforms[0].name;
      } else if (data[idx].platforms.length === null) {
        correctPlatform = "N/A";
      }

      if (data[idx].game_engines.length > 1) {
        correctEngine =
          data[idx].game_engines[0].name +
          ", " +
          data[idx].game_engines[1].name;
      } else if (data[idx].game_engines.length === 1) {
        correctEngine = data[idx].game_engines[0].name;
      } else if (data[idx].game_engines.length === null) {
        correctEngine = "N/A";
      }

      correctSummary = data[idx].summary;

      break;
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
        <p class = "details" id = "date" style="display: none">Release Year: ${correctDate}</p>
        <button type='button' id= 'dateButton' class = "button-64" role="button"><span class="text">Year</span></button>
        <br>
        <p class = "details" id = "rate" style="display: none">Rated: ${correctRating}</p>
        <button type='button' id= 'rateButton' class = "button-64"><span class="text">Rating</span></button>
        <br>
        <p class = "details" id = "genre" style="display: none">Genre: ${correctGenre}</p>
        <button type='button' id= 'genreButton' class = "button-64"><span class="text">Genre</span></button>
        <br>
        <p class = "details" id = "platform" style="display: none"><b>Platform:</b> ${correctPlatform}</p>
        <button type='button' id= 'platformButton' class = "button-64"><span class="text">Platform</span></button>
        <br>
        <p class = "details" id = "engine" style="display: none"><b>Engine:</b> ${correctEngine}</p>
        <button type='button' id= 'engineButton' class = "button-64"><span class="text">Engine</span></button>
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

  platformButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("platform");
  });

  engineButton.addEventListener("click", function () {
    if (lifeNum === 1) {
      myPopup.classList.add("show");
    } else revealHint("engine");
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
  let searchTerm = gameSearchBox.value.trim();

  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadGameData(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

/**
 * Fetches data from games with names matching any string
 * typed in the search box
 * @param {string} searchTerm - Name of a game typed into the search box
 */
async function loadGameData(searchTerm) {
  const res = await fetch(getIgdbLink(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-api-key": getIgdbKey(),
    },
    body:
      'fields id, name, summary, cover.*, aggregated_rating, themes, release_dates.*;, search "' +
      searchTerm +
      '";, where version_parent = null;',
  });
  const data = await res.json();

  displayGameList(data);
}

/**
 * Creates a list that displays the names, poster, and year of games
 * that matched the search term
 * @param {string} games - JSON array that holds data for 10 games
 */
function displayGameList(games) {
  searchList.innerHTML = "";

  for (let idx = 0; idx < games.length; idx++) {
    let gameListItem = document.createElement("div");
    gameListItem.dataset.name = games[idx].name;
    gameListItem.classList.add("search-list-item");

    if (games[idx].cover !== null)
      gamePoster =
        "https://images.igdb.com/igdb/image/upload/t_thumb/" +
        games[idx].cover.image_id +
        ".jpg";
    else gamePoster = "image_not_found.png";

    if (games[idx].release_dates !== null) year = games[idx].release_dates[0].y;
    else year = "N/A";

    gameListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${gamePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${games[idx].name}</h3>
            <p>${year}</p>
        </div>
        `;

    searchList.appendChild(gameListItem);
  }

  createGameButtons();
}

/**
 * Creates a button for each game in the displayed list
 */
function createGameButtons() {
  const searchListGames = searchList.querySelectorAll(".search-list-item");

  searchListGames.forEach((game) => {
    game.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      gameSearchBox.value = "";
      checkAnswer(game.dataset.name);
    });
  });
}

/**
 * Checks the guessed name against the correct name, ends the game if
 * the name was guessed or if lives equal 0
 * @param {string} guessedName - Name of selected game from the displayed
 * game list
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
  gameSearchBox.type = "hidden";
  lifeCount.style.display = "none";
  lifeTip.style.display = "none";

  displayGameDetails();
}

/**
 * Creates results section that displays info for the correct game
 */
function displayGameDetails() {
  resultGrid.innerHTML = `
    <div class = "content-poster">
        <img src = "${correctCover !== null ? "https://images.igdb.com/igdb/image/upload/t_thumb/" + correctCover + ".jpg" : "image_not_found.png"}" alt = "game poster">
    </div>
    <div class = "content-info">
        <h3 class = "content-title">${correctName}</h3>
        <p class = "details">Release Year: ${correctDate}</p>
        <p class = "details">Averaged rating: ${correctRating}</p>
        <p class = "details">Genre: ${correctGenre}</p>
        <p class = "details"><b>Platform:</b> ${correctPlatform}</p>
        <p class = "details"><b>Engine:</b> ${correctEngine}</p>
        <p class = "details"><b>Plot:</b> ${correctSummary}</p>
    </div>
    `;
}

window.addEventListener("click", (event) => {
  if (event.target.className !== "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
