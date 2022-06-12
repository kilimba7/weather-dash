var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#city");
var forecast = $("#forecast");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var citySearch = searchInputEl.value.trim();

    if(citySearch){
        getWeatherForecast(citySearch);
        searchInputEl.value = "";
    } else {
        alert("Please enter a valid city name!");
    }
    console.log(event);
  };

// API key: f48f74826f6fb834b97afa06980a605e
var getWeatherForecast = function (citySearch) {
    console.log(citySearch);
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=f48f74826f6fb834b97afa06980a605e&units=imperial"
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

      //loop to create a new card for 5 days
      for (var i = 0; i < data.list.length; i++) {

        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

          var title = $("<h3>")
          .addClass("card-title")
          .text(new Date(data.list[i].dt_txt)
          .toLocaleDateString());
          
          var img = $("<img>")
          .attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          
          var col = $("<div>")
          .addClass("col-sm");
          
          var card = $("<div>")
          .addClass("card bg-primary text-white");
          
          var cardBody = $("<div>")
          .addClass("card-body p-2");
          
          var humid = $("<p>")
          .addClass("card-text")
          .text("Humidity: " + data.list[i].main.humidity + "%");
          
          var temp = $("<p>")
          .addClass("card-text")
          .text("Temperature: " + data.list[i].main.temp + " °F");

          // Append everything to display
          col.append(card.append(cardBody.append(title, img, temp, humid)))
          forecast.append(col);
        }
      }
        });
    });
}


searchFormEl.addEventListener('submit', formSubmitHandler);


