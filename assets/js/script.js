// define variables 
var buttonEl = document.querySelector('button');
var cityInput = document.querySelector('input');
var searchedCities = document.querySelector('aside ul');
var cityArray = [];
var current = document.querySelector('.current');
var fiveDay = document.querySelector('.five-day');

// event listener for the search button
buttonEl.addEventListener('click', function (event) {
    event.preventDefault();

    var cities = {
        name: cityInput.value
    };

    cityArray.push(cities);

    localStorage.setItem('local-cityArray', JSON.stringify(cityArray));

    renderCities();
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
        aEl.addEventListener('click', function (event) {
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
                    var currentHeader = document.querySelector('.current h4');
                    currentHeader.textContent = data.city.name + ' ' + dayjs(data.list[0].dt_txt).format('M/DD/YYYY');

                    var currentIcon = document.querySelector('#icon');
                    currentIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png')
                    currentIcon.setAttribute('alt', data.list[0].weather[0].description);

                    var currentTemp = document.querySelector('.current .l1');
                    currentTemp.textContent = 'Temp: ' + ((data.list[0].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';

                    var currentWind = document.querySelector('.current .l2');
                    currentWind.textContent = 'Wind: ' + (data.list[0].wind.speed).toFixed(1) + ' ' + 'MPH';

                    var currentHumid = document.querySelector('.current .l3');
                    currentHumid.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';

                    var fiveDayForecast = [];

                    for (var i = 6; i < data.list.length; i += 8) {
                        fiveDayForecast.push(data.list[i]);
                    }

                    // 1st day forecast code
                    document.querySelector('.c1 .ch1').textContent = dayjs(fiveDayForecast[0].dt_txt).format('M/DD/YYYY');
                    document.querySelector('.c1 .icon1').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[0].weather[0].icon + '@2x.png');
                    document.querySelector('.c1 .icon1').setAttribute('alt', fiveDayForecast[0].weather[0].description);
                    document.querySelector('.c1 .l2').textContent = 'Temp: ' + ((fiveDayForecast[0].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c1 .l3').textContent = 'Wind: ' + (fiveDayForecast[0].wind.speed).toFixed(1) + ' ' + 'MPH';
                    document.querySelector('.c1 .l4').textContent = 'Humidity: ' + fiveDayForecast[0].main.humidity + '%';

                    // 2nd day forecast code
                    document.querySelector('.c2 .ch2').textContent = dayjs(fiveDayForecast[1].dt_txt).format('M/DD/YYYY');
                    document.querySelector('.c2 .icon2').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[1].weather[0].icon + '@2x.png');
                    document.querySelector('.c2 .icon2').setAttribute('alt', fiveDayForecast[1].weather[0].description);
                    document.querySelector('.c2 .l2').textContent = 'Temp: ' + ((fiveDayForecast[1].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c2 .l3').textContent = 'Wind: ' + (fiveDayForecast[1].wind.speed).toFixed(1) + ' ' + 'MPH';
                    document.querySelector('.c2 .l4').textContent = 'Humidity: ' + fiveDayForecast[1].main.humidity + '%';

                    // 3rd day forecast code
                    document.querySelector('.c3 .ch3').textContent = dayjs(fiveDayForecast[2].dt_txt).format('M/DD/YYYY');
                    document.querySelector('.c3 .icon3').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[2].weather[0].icon + '@2x.png');
                    document.querySelector('.c3 .icon3').setAttribute('alt', fiveDayForecast[2].weather[0].description);
                    document.querySelector('.c3 .l2').textContent = 'Temp: ' + ((fiveDayForecast[2].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c3 .l3').textContent = 'Wind: ' + (fiveDayForecast[2].wind.speed).toFixed(1) + ' ' + 'MPH';
                    document.querySelector('.c3 .l4').textContent = 'Humidity: ' + fiveDayForecast[2].main.humidity + '%';

                    // 4th day forecast code
                    document.querySelector('.c4 .ch4').textContent = dayjs(fiveDayForecast[3].dt_txt).format('M/DD/YYYY');
                    document.querySelector('.c4 .icon4').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[3].weather[0].icon + '@2x.png');
                    document.querySelector('.c4 .icon4').setAttribute('alt', fiveDayForecast[3].weather[0].description);
                    document.querySelector('.c4 .l2').textContent = 'Temp: ' + ((fiveDayForecast[3].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c4 .l3').textContent = 'Wind: ' + (fiveDayForecast[3].wind.speed).toFixed(1) + ' ' + 'MPH';
                    document.querySelector('.c4 .l4').textContent = 'Humidity: ' + fiveDayForecast[3].main.humidity + '%';

                    // 5th day forecast code
                    document.querySelector('.c5 .ch5').textContent = dayjs(fiveDayForecast[4].dt_txt).format('M/DD/YYYY');
                    document.querySelector('.c5 .icon5').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[4].weather[0].icon + '@2x.png');
                    document.querySelector('.c5 .icon5').setAttribute('alt', fiveDayForecast[4].weather[0].description);
                    document.querySelector('.c5 .l2').textContent = 'Temp: ' + ((fiveDayForecast[4].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c5 .l3').textContent = 'Wind: ' + (fiveDayForecast[4].wind.speed).toFixed(1) + ' ' + 'MPH';
                    document.querySelector('.c5 .l4').textContent = 'Humidity: ' + fiveDayForecast[4].main.humidity + '%';
                })
        })

}