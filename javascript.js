
// todaysWeatherEl
// forecastEl
var searchTextEl = document.getElementById("search-text");
var searchButtonEl = document.getElementById("search-button");




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


    })
  });
} 



searchButtonEl.addEventListener("click", function(){
  console.log(searchTextEl);
  var search = searchTextEl.value.trim();
  
  console.log(search);
  getWeather(search);
});