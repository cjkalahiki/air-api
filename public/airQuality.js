const baseURL = 'https://api.airvisual.com/v2/'; //baseURL + endpoint?key=${key}
const key = '2277dd3e-931a-4647-9939-2f1975107712';
let url; //declare url

//elements
const submitButton = document.querySelector('.submitButton');
const card = document.querySelector('.weatherCard');
const weatherList = document.querySelector('.weatherList');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const airQuality = document.querySelector('.airQuality');
const windSpeed = document.querySelector('.windSpeed');
const weatherIcon = document.querySelector('.weatherIcon');
const weatherHeader = document.querySelector('.weatherHeader');

let initialStyle = card.style.display;
card.style.display = 'none';

//eventListener
submitButton.addEventListener('click', fetchCountry);

function fetchCountry(e) {
    e.preventDefault();

    url = baseURL + 'nearest_city?key=' + key;

    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log(result);
            displayResults(result);
        })
        .catch(error => console.log('error', error));
}

function displayResults(json) {
    while (weatherList.firstChild){
        weatherList.removeChild(weatherList.firstChild);
    }

    card.style.display = initialStyle;

    let temper = document.createElement('li');
    temper.className = 'temp list-group-item';
    let humid = document.createElement('li');
    humid.className = 'humidity list-group-item';
    let airqual = document.createElement('li');
    airqual.className = 'airQuality list-group-item';
    let wind = document.createElement('li');
    wind.className = 'windSpeed list-group-item';
    let smallHeading = document.createElement('small');
    smallHeading.className = 'text-muted';
    let breakEl = document.createElement('br');
    

    let data = json.data;
    let city = data.city;
    let country = data.country;
    let weather = data.current.weather;

    let temp = weather.tp;
    let hu = weather.hu;
    let windy = weather.ws;
    let quality = data.current.pollution.aqius;
    let fullDate = weather.ts;
    let year = fullDate.split('-')[0];
    let month = fullDate.split('-')[1];
    let day = fullDate.split('-')[2][0] + fullDate.split('-')[2][0];



    let image = weather.ic;
    weatherIcon.src = `./assets/${image}.png`;

    temper.textContent = `Temperature (C°): ${temp}`;
    humid.textContent = `Humidity: ${hu}`;
    airqual.textContent = `Air Quality: ${quality}`;
    wind.textContent = `Wind Speed (mph): ${windy}`;
    smallHeading.textContent = `${city}, ${country}`;
    weatherHeader.textContent = `${month}/${day}/${year}`;

    //let year = 
    // weatherHeader.textContent = `${date}` + year 

    weatherList.appendChild(temper);
    weatherList.appendChild(humid);
    weatherList.appendChild(airqual);
    weatherList.appendChild(wind);
    weatherHeader.appendChild(breakEl);
    weatherHeader.appendChild(smallHeading);
}