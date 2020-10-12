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

// async function getGeniusElements(){
//     var CLIENTID = "zo3DOUN6FiuLgkV3dNHrgaj113LqaYweTJODBfdobdCEKHLopbYyhvitTefvrjRL";
//     var CLIENTSECRET = "6ArCdcGqhCnH_ZzYCuYEfbA7XWpBtpXFMVverCl-_9Bq3-zhcoTRBpAnkA4fO4DiRGhkymiL7hJpIidUcYYOiA";
//     var accessToken= "C3u6_zMj-ydh47rQTU5KJ4FcBP0G-VyFEtQRZdmNcLPncQieWm9jP6mpYTf6UJuN";
//     var API = "https://api.genius.com/search";
//     var APISong = "https://api.genius.com/songs/";
//     var songID = "2471960";
//     var maxSong= 2471960; 
// }



function generateHTMLsongs(data, date) {

    const birth = date // Serà la data que haurem introduit a la página index.html
    let songDate = data.filter((song) => {
        if (birth >= song.startDate && birth <= song.endDate) {
            return true;
        }
        return false;
    })
    document.getElementById('song-name').innerHTML = songDate[0].songTitle;

    console.log(songDate)
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

    console.log(fictionBookDate)
}



window.addEventListener('load', async (event) => {
    // Guardo en una variable els elements posteriors al "?" de la URL
    const querystring = window.location.search;
    // Amb el constructor URLSearshparams creo un objecte nou per tal de poder consultar en format semblant a JSON els diferents parámetres de la URL
    const params = new URLSearchParams(querystring);
    // Selecciono el paràmetre "date" (en aquest moment afegim els parámetres a la URL a mà per provar si funciona; després ho generaré desde l'index)
    const date = params.get('date');
    const allsongs = await getSongs();
    generateHTMLsongs(allsongs, date);
    const allmovies = await getMovies();
    generateHTMLmovies(allmovies, date);
    const allfictionbooks = await getFictionBooks();
    generateHTMLfictionbooks(allfictionbooks, date);
});


