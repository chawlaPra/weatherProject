const apiKey = "887964760f4ae225b70d68af9cd4d124";  // Your actual API key

// Function to fetch weather data for a given city
function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        // Handle error if city is not found
        throw new Error("City not found or invalid API request");
      }
      return response.json();
    })
    .then(data => {
      // Update the weather info on the page
      document.getElementById("city-name").textContent = data.name;
      document.getElementById("temperature").textContent = `🌡 Temp: ${data.main.temp}°C`;
      document.getElementById("weather").textContent = `⛅ Weather: ${data.weather[0].description}`;
      
      // Update weather details for major cities
      updateCityWeather("shanghai", "Shanghai");
      updateCityWeather("lucknow", "Lucknow");
      updateCityWeather("boston", "Boston");
      updateCityWeather("la", "Los Angeles");
      updateCityWeather("amritsar", "Amritsar");
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      // Show error message in UI
      document.getElementById("city-name").textContent = "City Not Found";
      document.getElementById("temperature").textContent = "⚠️ Error fetching data";
      document.getElementById("weather").textContent = "";
    });
}

// Function to update weather details for major cities in the table
function updateCityWeather(cityId, cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data for ${cityName}`);
      }
      return response.json();
    })
    .then(data => {
      // Update the table with data for each city
      document.getElementById(`${cityId}-temp`).textContent = `${data.main.temp}°C`;
      document.getElementById(`${cityId}-humidity`).textContent = `${data.main.humidity}%`;
      document.getElementById(`${cityId}-wind`).textContent = `${data.wind.speed} m/s`;
    })
    .catch(error => {
      console.error(error);
      // Handle error by displaying placeholder data
      document.getElementById(`${cityId}-temp`).textContent = "--";
      document.getElementById(`${cityId}-humidity`).textContent = "--";
      document.getElementById(`${cityId}-wind`).textContent = "--";
    });
}

// Handle city search
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = document.querySelector("input[type='search']").value.trim();
  if (city) {
    getWeather(city);
  }
});

// Fetch default city weather on load
getWeather("Mumbai");
