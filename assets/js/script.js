// define variables 
var buttonEl = document.querySelector('button');
var cityInput = document.querySelector('input');
var searchedCities = document.querySelector('aside ul');
var cityArray = [];

// event listener 
buttonEl.addEventListener('click', function(event) {
    event.preventDefault();

    var cities = {
        name: cityInput.value
    };

    cityArray.push(cities);

    localStorage.setItem('local-cityArray', JSON.stringify(cityArray));

    renderCities();
});

// get cities out of localstorage 
function getCities() {
    var storedCities = JSON.parse(localStorage.getItem('local-cityArray'));

    if (storedCities !== null) {
        cityArray = storedCities;
    } else {
        return;
    }
    renderCities();
}

getCities();

//display cities on webpage
function renderCities() {
    searchedCities.innerHTML = '';

    for (var i = 0; i <cityArray.length; i++) {
        var city = cityArray[i];
    
        var liEl = document.createElement('li');
        liEl.textContent = city.name;
        searchedCities.appendChild(liEl);
    }
}

// clear input field when you click in it
cityInput.addEventListener('click', function(event) {
    cityInput.value = '';
})

// fetch geo data 
function geoFetch() {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${}&appid=6d8c8c2517262ec75ca50bfee4f15b76`

    fetch(requestUrl)
    .then (function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //for (var i = 0; i < data.length; i++) {

        //}
    })
}

// fetch weather data
// function getApi() {
//     var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=6d8c8c2517262ec75ca50bfee4f15b76'

//     fetch(requestUrl)
//     .then (function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         //for (var i = 0; i < data.length; i++) {

//         //}
//     })
// }