const APIKEY = '3ea23fb0';
const SEARCH = 'Blade Runner';
const FILMS_EL = document.getElementById('films');


document.addEventListener('click', function(e){
    if(e.target.dataset.search) {
        const peliculaBuscar = document.getElementById('txt-search').value;
        
        renderFilms(peliculaBuscar);
        
    }
});


async function renderFilms(film) {
    let searchContent = '';

    const response = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${film}`);
    const data = await response.json();
    const arrayFilms = [...data.Search];

    for(const film of arrayFilms) {
        const responseFilm = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${film.imdbID}`);
        const dataFilm = await responseFilm.json();

        searchContent += `
            <div class="film">
                <div class="poster">
                    <img src="${(dataFilm.Poster === "N/A") ? 'assets/img/No_image_poster.png' : dataFilm.Poster}" alt="${dataFilm.Title} poster">
                </div>
                <div class="info">
                    <div class="info-1">
                        <h3>${dataFilm.Title}</h3>
                        <h5 class="rate"><i class="bi bi-star-fill"></i>${dataFilm.imdbRating}</h5>
                    </div>
                    <div class="info-2">
                        <h5>${dataFilm.Runtime}</h5>
                        <h5>${dataFilm.Genre}</h5>
                        <button class="btn-watchlist"><i class="bi bi-plus-circle-fill"></i>Watchlist</button>
                    </div>
                    <p class="plot">${dataFilm.Plot}</p>
                </div>
            </div>
        `;
    }
    FILMS_EL.innerHTML = searchContent;
}