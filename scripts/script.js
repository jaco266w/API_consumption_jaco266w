"use strict";

import { api_key } from './info.js';

const base_url = (section) => `https://api.themoviedb.org/3/movie/${section}`;

window.addEventListener("load",() => generateList(base_url("now_playing")))

document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', event => handleButtonClick(event, base_url(event.target.id)));
});

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
          Authorization: api_key
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
