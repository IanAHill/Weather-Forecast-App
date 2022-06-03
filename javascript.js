
// todaysWeatherEl
// forecastEl
var searchTextEl = document.getElementById("search-text");
var searchButtonEl = document.getElementById("search-button");
var forecastEl = document.getElementById("forecast");


function buildForecast(data){
  for(i=0; i<5; i++){
    var parentCard = document.createElement("div").classList.add("card");
    var cardHeader = document.createElement("div").classList.add("card-header");
    var weatherDataList = document.createElement("ul").classList.add("list-group list-group-flush");
    var icon = document.createElement("img");
    var iconHolder = document.createElement("li").classList.add("list-group-item");
    var currentTemp = document.createElement("li").classList.add("list-group-item");
    var currentConditions = document.createElement("li").classList.add("list-group-item");

    currentTemp.textContent = data.daily[i].temp.day;
    currentConditions.textContent = data.daily[i].weather[0].main;
    icon.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
    cardHeader.textContent = "today's date"
    iconHolder.appendChild(icon);
    weatherDataList.appendChild(currentTemp);
    weatherDataList.appendChild(currentConditions);
    weatherDataList.appendChild(iconHolder);
    parentCard.appendChild(cardHeader);
    parentCard.appendChild(weatherDataList);
    forecastEl.appendChild(parentCard);
  }
}


function getWeather(city) {
  var geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=ae034b29b1e2add7687fc20c94112cb6";
  var fetchWeather = fetch(geocodeAPI)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(data[0].lat);
    
    var weatherAPI = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ae034b29b1e2add7687fc20c94112cb6")
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        buildForecast(data);
    })
  });
} 



searchButtonEl.addEventListener("click", function(){
  console.log(searchTextEl);
  var search = searchTextEl.value.trim();
  
  console.log(search);
  getWeather(search);
});