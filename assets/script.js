var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#city");
var forecast = $("#forecast");
var cityHeader = $("#city-header");
var forecastHeader = $("#forecast-header");
var dailyForecast = $("#daily-forecast");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var citySearch = searchInputEl.value.trim();

  if (citySearch) {
     getForecastData(citySearch);
     searchInputEl.value = "";
  } else {
     alert("Please enter a valid city name!");
  }
  console.log(event);
};

var getForecastData = function (citySearch) {
    var cityName = '';
    // API key: f48f74826f6fb834b97afa06980a605e
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=f48f74826f6fb834b97afa06980a605e&units=imperial"
    fetch(apiUrl).then(function (response) {
       response.json().then(function (data) {
          console.log(data);
          getDailyWeatherForecast(data);
          getFiveDayWeatherForecast(data);
 
          cityName = $("<h2>")
             .addClass("pr-3 pb-2 card")
             .text("Daily Forecast for: " + data.city.name);

          fiveDay = $("<h2>")
            .addClass("pr-3")
            .text("5-Day Forecast: ");

        
          cityHeader.append(cityName);
          forecastHeader.append(fiveDay)
       });
    });
 
 }
 
 var getDailyWeatherForecast = function (forecastData) {

 
       // only for todays forecast records
       if (forecastData.list[0]) {
 
        
          var humid = $("<p>")
             .addClass("card-text")
             .text("Humidity: " + forecastData.list[0].main.humidity + "%");
 
          var wind = $("<p>")
             .addClass("card-text")
             .text("Wind Speed: " + forecastData.list[0].wind.speed + " MPH");
 
          var temp = $("<p>")
             .addClass("card-text")
             .text("Temp: " + forecastData.list[0].main.temp + " °F");
       
       // Append everything to display
    
      dailyForecast.append(temp, wind, humid);
     }
  }
    

 

// API key: f48f74826f6fb834b97afa06980a605e
var getFiveDayWeatherForecast = function (citySearch) {

      //loop to create a new card for 5 days
      for (var i = 0; i < citySearch.list.length; i++) {

        if (citySearch.list[i].dt_txt.indexOf("15:00:00") !== -1) {

          var title = $("<h3>")
          .addClass("card-title")
          .text(new Date(citySearch.list[i].dt_txt)
          .toLocaleDateString());
          
          var img = $("<img>")
          .attr("src", "https://openweathermap.org/img/w/" + citySearch.list[i].weather[0].icon + ".png");
          
          var col = $("<div>")
          .addClass("col-sm");
          
          var card = $("<div>")
          .addClass("card bg-primary text-white");
          
          var cardBody = $("<div>")
          .addClass("card-body p-2");
          
          var humid = $("<p>")
          .addClass("card-text")
          .text("Humidity: " + citySearch.list[i].main.humidity + "%");
          
          var temp = $("<p>")
          .addClass("card-text")
          .text("Temp: " + citySearch.list[i].main.temp + " °F");

          var wind = $("<p>")
          .addClass("card-text")
          .text("Wind Speed: " + citySearch.list[i].wind.speed + " MPH");

          // Append everything to display
          col.append(card.append(cardBody.append(title, img, temp, wind, humid)))
          forecast.append(col);
        }
      }
}


searchFormEl.addEventListener('submit', formSubmitHandler);


