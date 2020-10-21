var inputEl = document.getElementById("city-input");
var cityEl = document.getElementById("city-name");
var searchEl = document.getElementById("search-button");
var windEl = document.getElementById("wind-speed");
var humidityEl = document.getElementById("humidity");
var tempEl = document.getElementById("temperature");
var uvEl = document.getElementById("UV-index");
var pictureEl = document.getElementById("picture");

var apiKey = "92139082328bddaf4605f68691c71b7b";

function getWeather (cityName) {
    $.ajax({ url: 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey, method: 'GET'})
    .then(function(response){
        console.log(response);
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/onecall?lat="+response.coord.lat+"&lon="+response.coord.lon+"&exclude=hourly,minutely}&appid="+apiKey
        }).then(function(response_two){
            console.log(response_two);
            document.querySelector("#city-name").innerHTML = (response.name)
            document.querySelector("#temperature").innerHTML = "Temperature: " + (+response_two.current.temp - 273.15) * 9/5 + 32 + "°F"
            document.querySelector("#humidity").innerHTML = "Humidity: " + (+response_two.current.humidity)
            document.querySelector("#wind-speed").innerHTML = "Wind Speed: " + (+response_two.current.wind_speed)
            document.querySelector("#UV-index").innerHTML = "UV Index: " + (+response_two.current.uvi)
        })
    })
}

document.querySelector("#searchButton").addEventListener("click",function(event){
    event.preventDefault();
    var city = document.querySelector("#inputBar").value.trim();
    console.log(city)
    getWeather(city);
})