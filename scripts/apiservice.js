const baseURL = "https://best-songs2.herokuapp.com/";


// const sng = document.getElementById('btn-song'); ho usaré des

async function getSongs() {
    // Get Songs [{}]
    const response = await fetch(baseURL + "songs");
    const songs = await response.json();
    return songs;
}
getSongs();

async function getMovies() {
    // Get Movies
    const response = await fetch(baseURL + "movies");
    const movies = await response.json();
    return movies;
}
getMovies();

async function getFictionBooks() {
    // Get Fiction Books
    const response = await fetch(baseURL + "fiction-books");
    const fictionbooks = await response.json();
    return fictionbooks;

}
getFictionBooks();

async function getnoFictionBooks() {
    // Get No Fiction Books
    const response = await fetch(baseURL + "non-fiction-books");
    const nofictionbooks = await response.json();
    return nofictionbooks;

}
getnoFictionBooks();

async function getGeniusElements(title, artist){
    const geniusAPI = "https://api.genius.com";
    // Primer, coloquem el "search" que té un mètode get
    const idSearch = {
        access_token: 'aGbbOkBzMJvX6NUxCQ7DsauaD49ZAhJQvkI9X9kp7eVFiS3fXBkRKyLK_qUk5FTw',
        q: title + ' ' + artist
    }
    const result = await fetch(geniusAPI + '/search?' + new URLSearchParams(idSearch));
    const data = await result.json();
    const id = data.response.hits[0].result.id

    const songSearch ={
        access_token: 'aGbbOkBzMJvX6NUxCQ7DsauaD49ZAhJQvkI9X9kp7eVFiS3fXBkRKyLK_qUk5FTw',
    }
    const response = await fetch(geniusAPI + '/songs/' + id + '?' + new URLSearchParams(idSearch))
    const responsejson = await response.json();
    return responsejson
}

async function getIMDBElements(title){
    const idSearch = {
        s: title
    };
    const pelis = await fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&"+ new URLSearchParams(idSearch), {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": "090d0c4b70msh0adca47ea867b16p1ea1efjsnf14c5d664816"
        }
    })
    const data =  await pelis.json();
    const id = data.Search[0].imdbID;
    const moviesSearch = {
        i: id
    }
    const response = await fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&" + new URLSearchParams(moviesSearch), {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
		"x-rapidapi-key": "090d0c4b70msh0adca47ea867b16p1ea1efjsnf14c5d664816"
	}
})

    const responsejson = await response.json();
    return responsejson
}

async function getGoogleBooks(title){
    const googleAPI = "https://www.googleapis.com/books/v1/volumes";

    const idSearch ={
        key: 'AIzaSyBSnVlMs85v4gfFb1a7qqIy38-ghssT2WI',
        q: title
        //no se buscar-ho, retraso
    }

    const result = await fetch(googleAPI + '?' + new URLSearchParams(idSearch));
    const data = await result.json();
    const link =data.items[0].selfLink;

    const idSearch2 ={
        key: 'AIzaSyBSnVlMs85v4gfFb1a7qqIy38-ghssT2WI',
        //no se buscar-ho, retraso
    
    }
    const result2 = await fetch(link + '?' + new URLSearchParams(idSearch2));
    const d = await result2.json();
    return d;
}








function generateHTMLsongs(data, date) {
    console.log(date)

    const birth = date // Serà la data que haurem introduit a la página index.html
    let songDate = data.filter((song) => {
        if (birth >= song.startDate && birth <= song.endDate) {
            return true;
        }
        return false;
    })
    // document.getElementById('song-name').innerHTML = songDate[0].songTitle;
    // document.getElementById('album-name').innerHTML = 'Cantante: ' + songDate[0].artist;
    const video = `<iframe width="600" height="400" src="https://www.youtube.com/embed/${songDate[0].youtubeId}"></iframe>`;
    document.getElementById('song-video').innerHTML = video;
    document.getElementById('days-number-one').innerHTML = 'from ' + songDate[0].startDate + ' to ' + songDate[0].endDate
    

    return songDate[0]; // Li apliquem return perquè és una funció síncrona de la qual en necessitem el resultat per cridar-lo a la funció asíncrona getGeniusElements.
}

function generateHTMLmovies(data, date) {
    
    const birth = date // Serà la data que haurem introduit a la página index.html
    let movieDate = data.filter((movie) => {
        if (birth >= movie.startDate && birth <= movie.endDate) {
            return true;
        }
        return false;
    })
    // document.getElementById('movie-name').innerHTML = movieDate[0].movieTitle;

    return movieDate[0];
}

function generateHTMLfictionbooks(data, date) {
    
    const birth = date // Serà la data que haurem introduit a la página index.html
    console.log(birth)
    let fictionBookDate = data.filter((fictionbook) => {
        if (birth >= fictionbook.startDate && birth <= fictionbook.endDate) {
            return true;
        }
        return false;
    })
    document.getElementById('fiction-book-name').innerHTML = fictionBookDate[0].title.toUpperCase();
    document.getElementById('writter-name').innerHTML = fictionBookDate[0].author

    return fictionBookDate[0]
}

function generateHTMLnofictionbooks(data, date) {
    
    const birth = date // Serà la data que haurem introduit a la página index.html
    let noFictionBookDate = data.filter((nofictionbook) => {
        if (birth >= nofictionbook.startDate && birth <= nofictionbook.endDate) {
            return true;
        }
        return false;
    })
    document.getElementById('no-fiction-book-name').innerHTML = noFictionBookDate[0].title.toUpperCase();
    document.getElementById('writter-name-no-fiction').innerHTML = noFictionBookDate[0].author

    return noFictionBookDate[0]
}

function generateHTMLgenius(selectedElement){
    document.getElementById('song-name-genius').innerHTML = selectedElement.response.song.title.toUpperCase();
    document.getElementById('artist-name-genius').innerHTML = selectedElement.response.song.primary_artist.name;
    document.getElementById('cd-name').innerHTML = selectedElement.response.song.album.name;
    document.getElementById('release-date').innerHTML = selectedElement.response.song.release_date;
    // document.getElementById('song-tag').innerHTML = selectedElement.response.song.description.dom.children[0].children[0] + selectedElement.response.song.description.dom.children[0].children[0].children
    const albumImage = `<img src='${selectedElement.response.song.song_art_image_url}'>`;
    // document.getElementById('album-img').innerHTML = albumImage;
    // const artistImage = `<img src='${selectedElement.response.song.primary_artist.image_url}'>`
    // document.getElementById('artist-image').innerHTML = artistImage;
    const cdImage = `<img src='${selectedElement.response.song.album.cover_art_url}'>`;
    document.getElementById('cd-image').innerHTML = cdImage;
}

function generateHTMLimdb(selectedMovie){
    document.getElementById('movie-name-imdb').innerHTML = selectedMovie.Title.toUpperCase();
    const movieImage = `<img src='${selectedMovie.Poster}'>`
    document.getElementById('movie-img').innerHTML = movieImage;
    document.getElementById('movie-year-imdb').innerHTML = selectedMovie.Year;
    document.getElementById('movie-released-imdb').innerHTML = selectedMovie.Released;
    document.getElementById('movie-runtime-imdb').innerHTML = selectedMovie.Runtime;
    document.getElementById('movie-genre-imdb').innerHTML = selectedMovie.Genre;
    document.getElementById('movie-director-imdb').innerHTML = selectedMovie.Director;
    document.getElementById('movie-actors-imdb').innerHTML = selectedMovie.Actors;
    document.getElementById('movie-plot-imdb').innerHTML = selectedMovie.Plot;
    document.getElementById('movie-country-imdb').innerHTML = selectedMovie.Country;
    document.getElementById('movie-rate-1-imdb').innerHTML = selectedMovie.Ratings[0].Value;
    document.getElementById('movie-rate-2-imdb').innerHTML = selectedMovie.Ratings[1].Value;
    document.getElementById('movie-rate-3-imdb').innerHTML = selectedMovie.Ratings[2].Value;
    document.getElementById('movie-rate-4-imdb').innerHTML = selectedMovie.imdbRating;
}
function generateGoogleBooksInfo(allfictionbooks){
    document.getElementById('publishedDate').innerHTML = allfictionbooks.volumeInfo.publishedDate
    const fictionBook = `<img src='${allfictionbooks.volumeInfo.imageLinks.thumbnail}'>`
    document.getElementById('fiction-img').innerHTML = fictionBook;
    document.getElementById('categoria').innerHTML = allfictionbooks.volumeInfo.categories[0]
    document.getElementById('average-rate').innerHTML = allfictionbooks.volumeInfo.averageRating
  
}

function generateGoogleBooksInfoNF(allfictionbooks){
    document.getElementById('publishedDate2').innerHTML = allfictionbooks.volumeInfo.publishedDate
    const nofictionBook = `<img src='${allfictionbooks.volumeInfo.imageLinks.thumbnail}'>`
    document.getElementById('no-fiction-img').innerHTML = nofictionBook;
    document.getElementById('categoria2').innerHTML = allfictionbooks.volumeInfo.averageRating
    
}


window.addEventListener('load', async (event) => {
    // Guardo en una variable els elements posteriors al "?" de la URL
    const querystring = window.location.search;
    // Amb el constructor URLSearshparams creo un objecte nou per tal de poder consultar en format semblant a JSON els diferents parámetres de la URL
    const params = new URLSearchParams(querystring);
    // Selecciono el paràmetre "date" (en aquest moment afegim els parámetres a la URL a mà per provar si funciona; després ho generaré desde l'index)
    const date = params.get('date');

    const allsongs = await getSongs();
    const currentSong = generateHTMLsongs(allsongs, date); // Guardem el return de la funció generateHTMLsongs

    const responsejson = await getGeniusElements(currentSong.songTitle, currentSong.artist);
    generateHTMLgenius(responsejson);

    const allmovies = await getMovies();
    const selectedMovie = generateHTMLmovies(allmovies, date);
    const responsejsons = await getIMDBElements(selectedMovie.movieTitle);
    generateHTMLimdb(responsejsons)

    const allfictionbooks = await getFictionBooks();
    const book =generateHTMLfictionbooks(allfictionbooks, date);
    const detailBook = await getGoogleBooks(book.title);
    generateGoogleBooksInfo(detailBook)
    

    const allnofictionbooks = await getnoFictionBooks();
    const book2 = generateHTMLnofictionbooks(allnofictionbooks, date);
    const detailBook2 = await getGoogleBooks(book2.title);
    generateGoogleBooksInfoNF(detailBook2)


});


