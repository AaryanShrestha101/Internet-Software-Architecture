const apiKey = 'b4cdfba7';

async function getMovieData(title) {
  const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
  const data = await response.json();
  return data;
}

const searchButton = document.getElementById('search-button');
const movieTitle = document.getElementById('movie-title');
const movieInfo = document.getElementById('movie-info');

searchButton.addEventListener('click', async () => {
  const title = movieTitle.value;
  const movieData = await getMovieData(title);
  
  if (movieData.Response === 'False') {
    movieInfo.innerHTML = `<p>${movieData.Error}</p>`;
  } else {
    const {Title, Year, Rated, Runtime, Genre, Director, Writer, Actors, Plot, Poster} = movieData;
    movieInfo.innerHTML = `
      <h2>${Title} (${Year})</h2>
      <img src="${Poster}" alt="${Title} poster">
      <p><strong>Imdb Rating:</strong> ${Rated}</p>
      <p><strong>Director:</strong> ${Director}</p>
      <p><strong>Actors:</strong> ${Actors}</p>

    `;
  }
});