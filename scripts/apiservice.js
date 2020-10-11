const baseURL = "https://best-songs2.herokuapp.com/";

async function getSongs() {
    
    // Get Songs
    const response = await fetch(baseURL + "songs");
    const songs = await response.json();   
    console.log(songs);

}
getSongs();

async function getMovies() {
    
    // Get Songs
    const response = await fetch(baseURL + "movies");
    const songs = await response.json();   
    console.log(songs);

}
getMovies();

async function getFictionBooks() {
    
    // Get Songs
    const response = await fetch(baseURL + "fiction-books");
    const songs = await response.json();   
    console.log(songs);

}
getFictionBooks();