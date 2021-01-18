var clear = "☀️";
var clouds = "☁️";
var rain = "☂️";
var thunderstorm = "⚡️";
var snow = "☃️";
var weather = "";
var forecast = "";
var lat = "";
var lon = "";
var temp = "";
var windSpeed = "";
var humidity = "";
var cityLocation = "Houston";
var nowDate = new Date();
var currentDate = nowDate.getMonth()+1+"/"+nowDate.getDate()+"/"+nowDate.getFullYear();

function getForecast() {
fetch(forecast)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // getting latitude and longitude for second API call
        lat = response.city.coord.lat;
        lon = response.city.coord.lon;
        var currentWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=4ebfcb0b916a3013296b904d6e4259ba";

        for (var i=0; i < 33;) {
            // getting temp, humidity, weather conditions for 5 day forecast
            temp = response.list[i].main.temp;
            humidity = response.list[i].main.humidity;
            
            // getting date of forecast
            var split = response.list[i].dt_txt.split(" ");
            var split2 = split[0].split("-");
            var month = split2[1];
            var day = split2[2];
            var year = split2[0];
            var date = month + "/" + day + "/" + year;
            
            // determining weather emoji
            weather = response.list[i].weather[0].main;
            if (weather === "Clouds"){
                weather = clouds;
            } else if(weather === "Clear"){
                weather = clear;
            } else if(weather === "Thunderstorm"){
                weather = thunderstorm;
            } else if(weather === "Drizzle" || weather === "Rain"){
                weather = rain;
            } else if(weather === "Snow"){
                weather = snow;
            } else{
                weather = clear;
            }
 
            // creating the cards for each forecast day
            var forecastContainer = document.querySelector('#forecast');
            var card = document.createElement('div');
            card.className = "card bg-primary text-white";
            var cardBody = document.createElement('div');
            cardBody.className = "card-body";
            var cardTitle = document.createElement('h4');
            cardTitle.className = "card-title";
            cardTitle.textContent = date;
            cardBody.appendChild(cardTitle);
            var weatherType = document.createElement('p');
            weatherType.className = "card-text";
            weatherType.textContent = weather + " " + response.list[i].weather[0].main;
            cardBody.appendChild(weatherType);
            var cardTemp = document.createElement('p');
            cardTemp.className = "card-text";
            cardTemp.textContent = "Temperature: " + temp + " °F";
            cardBody.appendChild(cardTemp);
            var cardHumidity = document.createElement('p');
            cardHumidity.className = "card-text";
            cardHumidity.textContent = "Humidity: " + humidity + "%";
            cardBody.appendChild(cardHumidity);
            card.appendChild(cardBody);
            forecastContainer.appendChild(card);

            i = i + 8;
        }
        // API call for current weather
        fetch(currentWeather)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                // Setting up main weather dashboard box
                weather = response.current.weather[0].main;
                if (weather === "Clouds"){
                    weather = clouds;
                } else if(weather === "Clear"){
                    weather = clear;
                } else if(weather === "Thunderstorm"){
                    weather = thunderstorm;
                } else if(weather === "Drizzle" || weather === "Rain"){
                    weather = rain;
                } else if(weather === "Snow"){
                    weather = snow;
                } else{
                    weather = clear;
                }
                $("#city").text(cityLocation + " (" + currentDate + ") " + weather + " " + response.current.weather[0].main);
                $("#temp").text("Temperature: " + response.current.temp + " °F");
                $("#humid").text("Humidity: " + response.current.humidity + "%");
                $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
                $("#uv").text("UV Index: " + response.current.uvi);
            });
    }); 
};

$("#search").click(function(){
    cityLocation = $("#cityInput").val();
    if (cityLocation.length !== 0) {
    $("#forecast").empty();
    $("#cityInput").val("");
    forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityLocation + "&units=imperial&appid=4ebfcb0b916a3013296b904d6e4259ba";
    getForecast();
    var historyContainer = document.querySelector('#searchHistory');
    var historyBtn = document.createElement('button');
    historyBtn.type = "button";
    historyBtn.className = "history-btn btn btn-lg btn-outline-primary col-12 mb-2";
    historyBtn.textContent = cityLocation;
    historyContainer.appendChild(historyBtn);
    }
    else {
        alert("Enter a city name");
    }
});

$("#searchHistory").on('click', '.history-btn', function(){
    cityLocation = this.textContent;
    $("#forecast").empty();
    $("#cityInput").val("");
    forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityLocation + "&units=imperial&appid=4ebfcb0b916a3013296b904d6e4259ba";
    getForecast();
});