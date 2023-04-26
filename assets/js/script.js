// define variables 
var buttonEl = document.querySelector('button');
var cityInput = document.querySelector('input');
var searchedCities = document.querySelector('aside ul');
var cityArray = [];

// event listener for the search button
buttonEl.addEventListener('click', function (event) {
    event.preventDefault();

    var cities = {
        name: cityInput.value
    };

    cityArray.push(cities);

    localStorage.setItem('local-cityArray', JSON.stringify(cityArray));

    renderCities();
    console.log(cityInput.value);
    weatherFetch(cityInput.value);
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

    for (var i = 0; i < cityArray.length; i++) {
        var city = cityArray[i];

        var liEl = document.createElement('li');
        var aEl = document.createElement('a');
        aEl.textContent = city.name;
        searchedCities.appendChild(liEl);
        liEl.appendChild(aEl);
        aEl.addEventListener('click', function(event){
            weatherFetch(this.innerHTML);
        });
    }

}

// clear input field when you click in it
cityInput.addEventListener('click', function (event) {
    cityInput.value = '';
})


// fetch geo data 
function weatherFetch(cityName) {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=6d8c8c2517262ec75ca50bfee4f15b76`
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (coords) {
            var lat = coords[0].lat;
            var lon = coords[0].lon;
            var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6d8c8c2517262ec75ca50bfee4f15b76`

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    console.log(data.city.name); //current city
                    console.log(data.list[0].dt_txt); //current date and time
                    console.log(data.list[0].weather[0].icon); //current weather icon
                    console.log(data.list[0].main.temp); //curent temp in kelvin
                    console.log(data.list[0].wind.speed); //current wind speed
                    console.log(data.list[0].main.humidity); //current humidity 

                    var currentHeader = document.querySelector('.current h4');
                    currentHeader.textContent = data.city.name + ' ' + dayjs(data.list[0].dt_txt).format('M/DD/YYYY');

                    var currentIcon = document.querySelector('#icon');
                    currentIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png')
                    
                    var currentTemp = document.querySelector('.current .l1');
                    currentTemp.textContent = 'Temp: ' + ((data.list[0].main.temp - 273.15)*9/5+32).toFixed(2) + '°F';

                    var currentWind = document.querySelector('.current .l2');
                    currentWind.textContent = 'Wind: ' + data.list[0].wind.speed + ' ' + 'MPH';

                    var currentHumid = document.querySelector('.current .l3');
                    currentHumid.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
                    
                    var fiveDayForecast = [];

                    for (var i = 6; i < data.list.length; i += 8) {
                        fiveDayForecast.push(data.list[i]);
            
                    }
                    console.log(fiveDayForecast);
                })
        })

}