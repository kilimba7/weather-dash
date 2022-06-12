var searchFormEl = document.querySelector("#search-form");
var cityNameInputEl = document.querySelector("#city");
var forecastEl = document.querySelector("#forecast");
var cityContainerEl = document.querySelector("#temp");



var formSubmitHandler = function(event) {
    event.preventDefault();
    var citySearch = cityNameInputEl.value.trim();

    if(citySearch){
        getWeatherData(citySearch);
        cityNameInputEl.value = "";
    } else {
        alert("Please enter a valid city name!");
    }
    console.log(event);
  };

// allows me to get the weather of one city right now (used the geo one)
// API key: 23e37cb222f3e68135a0aa3f62649568
var getWeatherData = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&limit=5' + '&appid=23e37cb222f3e68135a0aa3f62649568' + '&units=imperial' +'&cnt=5';
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            // displayCity(data, city);
            console.log(data);
        });
    });
}

var displayCity  = function (cities) {
    cityContainerEl.textContent = '';
// loop over repos
for (var i = 0; i < cities.length; i++) {
    // format (I still NEED uv index)
    var cityForecast = cities[i].city.name + cities[i].list.main.temp;
    
    //  + cities[i].list.main.temp.imperial + cities[i].list.wind.speed + cities[i].list.main.humidity + cities[i].list.weather.icon;
  
  

    // create a <p> for each data point 
    var cityEl = $('<div>')
        .addClass('#temp')
        .text(cityForecast)
        // .attr({
        //     id: "temp"
        // })
  
    // append to container
    forecastEl.appendChild(cityEl);
  }
}


searchFormEl.addEventListener('submit', formSubmitHandler);


