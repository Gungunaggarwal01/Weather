const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weather_image = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
   const api_key = "cfd25ae31813097462eaf6001ddfd06a";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

   const weather_data = await fetch(`${url}`).then(response => response.json());

   if(weather_data.cod ===`404`){
    location_not_found.style.display = "flex";  
    weather_body.style.display = "none";
    console.log("error");
    
    return;

   }
   location_not_found.style.display = "none";  
   weather_body.style.display = "flex";
   temperature.innerHTML = `${ Math.round (weather_data.main.temp - 273.15)}°C`; 
   description.innerHTML = `${weather_data.weather[0].description}`;
   humidity.innerHTML = `${weather_data.main.humidity}% `;
   wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
   console.log(weather_data.weather[0])
   switch(weather_data.weather[0].main){
        case `Clouds`:
        weather_image.src = "./weather img/cloudy.png";
        break;
        case `Clear`:
        weather_image.src = "./weather img/sunny.png";
        break;
        case `Rain`:
        weather_image.src = "./weather img/raining.png";
        break;
        case `Slow rain`:
        weather_image.src = "./weather img/slow rain.png";
        break;
        case `Thunderstorm`:
        weather_image.src = "./weather img/thunderstorm.png";
        break;
        case `Snow`:
        weather_image.src = "./weather img/snow.png";
        break;
   }
}

searchBtn.addEventListener('click',()=>{
      checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (e) => {
      if (e.key === "Enter") checkWeather(inputBox.value);
});