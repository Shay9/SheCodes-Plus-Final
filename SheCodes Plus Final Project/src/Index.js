
function date (timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day},  ${hours}:${minutes}`;
}

function showTemperature (response){
    console.log(response);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let datetimeElement = document.querySelector("#datetime");
    let iconElement = document.querySelector("#icon");

    celciusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = response.data.main.humidity
    windElement.innerHTML = Math.round(response.data.wind.speed);
    datetimeElement.innerHTML = date(response.data.dt * 1000);
     iconElement.setAttribute("src", 
     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
     iconElement.setAttribute("alt", response.data.weather[0].description)
}


function search (city){
let apiKey = "a35a6fc9aa256480d5ede5662dad54ec";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
event.preventDefault();
let searchElement = document.querySelector("#search");
search(searchElement.value);
}

function showFarenheitTemp (event){
event.preventDefault();
let TemperatureElement = document.querySelector("#temperature");
let farenheitTemperature = (celciusTemperature * 9) / 5 + 32; 
TemperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelciusTemp (event){
    event.preventDefault();
    let TemperatureElement = document.querySelector("#temperature");
    TemperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;


let form = document.querySelector("#searchbar");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

search("Toronto");