var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if(city){
        getWeatherData(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city name!");
    }
    console.log(event);
  };

// allows me to get the weather of one city right now (used the geo one)
// API key: 23e37cb222f3e68135a0aa3f62649568
const getWeatherData = function (city) {
    let apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=23e37cb222f3e68135a0aa3f62649568';

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            // displayCity(data, city);
            console.log(data);
        });
    });
};

getWeatherData('london');

// var displayCity = function (city, searchTerm) {
//     cityContainerEl.textContent = "";
//     citySearchTerm.textContent = searchTerm;
//     // loop over repos
// for (var i = 0; i < city.length; i++) {
//     // format repo name (I still NEED uv index)
//     var cityName = city[i].name + city[i].main.temp + city[i].wind.speed + city[i].main.humidity;
  
//     // create a container for each city
//     var cityEl = document.createElement("div");

  
//     // create a span element to hold repository name
//     var titleEl = document.createElement("span");
//     titleEl.textContent = cityName;
  
//     // append to container
//     cityEl.appendChild(titleEl);
  
//     // append container to the dom
//     cityContainerEl.appendChild(cityEl);
//   }
// }


// var displayWeatherForecast = function (city, searchTerm) {
//     cityContainerEl.textContent = "";
//     citySearchTerm.textContent = searchTerm;
//     // loop over repos
// for (var i = 0; i < city.length; i++) {
//     // format repo name (I still NEED uv index)
//     var cityForecast = city[i].name +
  
  
//     // append container to the dom
//     cityContainerEl.appendChild(cityEl);
//   }
// }

searchFormEl.addEventListener('submit', formSubmitHandler);


