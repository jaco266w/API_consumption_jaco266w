"use strict";

const nowPlaying_url = 'https://api.themoviedb.org/3/movie/now_playing';
const popular_url = 'https://api.themoviedb.org/3/movie/popular';
const topRated_url = 'https://api.themoviedb.org/3/movie/top_rated';
const upcoming_url = 'https://api.themoviedb.org/3/movie/upcoming';

window.addEventListener("load", generateList(nowPlaying_url))
document.getElementById("nowPlaying").addEventListener("click", (event) => handleButtonClick(event, nowPlaying_url))
document.getElementById("popular").addEventListener("click", (event) => handleButtonClick(event, popular_url))
document.getElementById("topRated").addEventListener("click", (event) => handleButtonClick(event, topRated_url))
document.getElementById("upcoming").addEventListener("click", (event) => handleButtonClick(event, upcoming_url))

function handleButtonClick(event, url){
    document.querySelectorAll('nav button').forEach(button => button.classList.remove('active'));
    
    event.target.classList.add("active");

    generateList(url)
}

function generateList(url){

    const listSection = document.getElementById('list');
    listSection.innerHTML = '';


    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzY5MjNlODRmYjFhODdjMDVhZWRlZjZhNzY1YTlkZCIsIm5iZiI6MTcyNzA4NTMwMS42MzQzOTMsInN1YiI6IjY2ZjEzOTUyN2ZmMmJmNTdjZDI2YTBjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqGNCqh2FK4HE8t4ANngbZ0IO84jDTmVuYvjYGDeQHc'
        }
      };
      
      fetch(url, options)
        .then(response => response.json())
        .then(response => {
            const movies = response.results;
            const movieItems = movies.map(movie => createMovieTemplate(movie)).join('');
            listSection.innerHTML = movieItems;
        })
        .catch(err => console.error(err));
}

function createMovieTemplate(movie) {
    return `
        <article>
            <header>
                <h2>${movie.title}</h2>
            </header>
            <div>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}.jpg" alt="${movie.title}">
                <div>
                    <p>${movie.overview}</p>
                    <p><span>Original Title:</span> ${movie.original_title}</p>
                    <p><span>Release date:</span> ${movie.release_date}</p>
                </div>
            </div>
        </article>
    `;
}
