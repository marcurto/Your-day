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




function generateHTMLsongs(data, date) {

    const birth = date // Serà la data que haurem introduit a la página index.html
    let songDate = data.filter((song) => {
        if (birth >= song.startDate && birth <= song.endDate) {
            return true;
        }
        return false;
    })
    document.getElementById('song-name').innerHTML = songDate[0].songTitle;
    document.getElementById('album-name').innerHTML = 'Cantante: ' + songDate[0].artist;
    
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
    document.getElementById('movie-name').innerHTML = movieDate[0].movieTitle;

    console.log(movieDate)
}

function generateHTMLfictionbooks(data, date) {
    
    const birth = date // Serà la data que haurem introduit a la página index.html
    let fictionBookDate = data.filter((fictionbook) => {
        if (birth >= fictionbook.startDate && birth <= fictionbook.endDate) {
            return true;
        }
        return false;
    })
    document.getElementById('fiction-book-name').innerHTML = fictionBookDate[0].title
    document.getElementById('writter-name').innerHTML = fictionBookDate[0].author

    console.log(fictionBookDate)
}

function generateHTMLgenius(selectedElement){
    document.getElementById('prueva').innerHTML = selectedElement.response.song.title
    const albumImage = `<img src='${selectedElement.response.song.song_art_image_url}'>`
   document.getElementById('album-img').innerHTML = albumImage;
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
    generateHTMLmovies(allmovies, date);
    const allfictionbooks = await getFictionBooks();
    generateHTMLfictionbooks(allfictionbooks, date);
});


