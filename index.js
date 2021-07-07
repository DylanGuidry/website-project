const movieContainer = document.getElementById('movie-id');
const searchBar = document.querySelector('input')

function renderMovies(movieArray) {
    const movieHTMLArray = movieArray.map(function (currentMovie) {
        return `<div class='movie' id='selected-movie'>
        <div class="card" style="width: 18rem;">
            <img src="${currentMovie.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${currentMovie.Title}</h5>
            <h6 class='release-date'>${currentMovie.Year}</h6>
            <a href="#" class="add-button add-glow-on-hover btn btn-primary" data-imdbid="${currentMovie.imdbID}">Add!</a>
        </div>
        </div>
    </div>`
    })
    return movieHTMLArray.join('')
}

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchString = searchBar.value
    const urlEncodedSearchString = encodeURIComponent(searchString)
    fetch(`http://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
    .then (res => res.json())
    .then (data => {
        movieContainer.innerHTML = renderMovies(data.Search)
        movieData = data.Search
    })
})

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-button')) {
        const movieID = event.target.dataset.imdbid
        console.log(movieID)
        saveToWatchList(movieID)
    }
})

function saveToWatchList(movieID) {
    const movie = movieData.find(function (currentMovie) {
        return currentMovie.imdbID == movieID;
    })
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);

    if (watchlist == null) {
        watchlist = []
    }
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);
    console.log(watchlist)
}
