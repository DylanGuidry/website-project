const movieContainer = document.getElementById('movie-id');
document.addEventListener('DOMContentLoaded', function(event) {
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    movieContainer.innerHTML = renderMovies(watchlist)
})

function renderMovies(movieArray) {
    const movieHTMLArray = movieArray.map(function (currentMovie) {
        return `<div class='movie' id='selected-movie'>
        <div class="card" style="width: 18rem;">
            <img src="${currentMovie.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${currentMovie.Title}</h5>
            <h6 class='release-date'>${currentMovie.Year}</h6>
            <a href="#" class="delete-button add-glow-on-hover btn btn-primary" data-imdbid="${currentMovie.imdbID}">Delete!</a>
        </div>
        </div>
    </div>`
    })
    return movieHTMLArray.join('')
}

function removeFromWatchList(movieID) {
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    
    if (watchlist == null) {
        watchlist = []
    }
    watchlist = watchlist.filter(function (currentMovie) {
        return currentMovie.imdbID != movieID;
    })
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);
    console.log(watchlist)
    movieContainer.innerHTML = renderMovies(watchlist)
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const movieID = event.target.dataset.imdbid
        console.log(movieID)
        removeFromWatchList(movieID)
    }
})
