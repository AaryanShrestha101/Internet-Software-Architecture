// Select HTML elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityInput = document.querySelector('.search-box input');

// Default city
const defaultCity = "anniston";

// Function to fetch weather data
function getWeatherData(city) {
  // API key
  const APIKey = '0168c6ccf28216393e499c474a3a0ff5';

  // Check if city input is empty
  if (city === '') {
    return;
  }

  // Fetch weather data from API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

      // If city not found, display error message
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      // Hide error message
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      // Extract weather data from JSON
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');
      const pressure = document.querySelector('.weather-details .pressure span')

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear-day.svg';
          break;

        case 'Rain':
          image.src = 'images/rain.svg';
          break;

        case 'Snow':
          image.src = 'images/snow.svg';
          break;

        case 'Clouds':
          image.src = 'images/cloudy.svg';
          break;

        case 'Haze':
          image.src = 'images/mist.svg';
          break;

        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      pressure.innerHTML = `${parseInt(json.main.pressure)}`

      // Show weather box and details
      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
}

// Event listener for search button click
search.addEventListener('click', () => {
  const city = cityInput.value;
  getWeatherData(city);
});

// Event listener for window load
window.addEventListener('load', () => {
  // Set default city value
  cityInput.placeholder = defaultCity;

  // Get weather data for default city
  getWeatherData(defaultCity);
});
