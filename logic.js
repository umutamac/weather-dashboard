const form = document.querySelector('form');//search section
const cityList = document.querySelector('.city-list'); //the div where city names will show at
const submitBtn = document.querySelector('#submit'); //submit button
const cityInput = document.getElementById('cityInput'); // the search bar
const clearbtn = document.getElementById('clear'); // clear button

// let cityArray 
// if (localStorage.getItem('cityKey')) {
//     cityArray = JSON.parse(localStorage.getItem('fnameKey'));
// } else {
//     cityArray = [];
// }
// console.log("city array: " + cityArray);

// localStorage.setItem('cityKey', JSON.stringify(cityArray))

// const cityData = JSON.parse(localStorage.getItem('cityKey'))

// const aMaker = (text1) => {
//     const a = document.createElement('a')
//     a.textContent = text1;
//     a.className("list-group-item list-group-item-action");
//     cityList.appendChild(a);
// }

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     cityArray.push(cityInput.value);
//     localStorage.setItem('cityKey', JSON.stringify(cityArray));
//     aMaker(cityInput.value);
//     cityInput.value = "";

   

// })

// cityData.forEach((cityArray) => {
//     aMaker(cityInput.value);
// })


// clearbtn.addEventListener('click', function () { // clear btn clears the storage and deletes li's
//     localStorage.clear();
//     while (cityList.firstChild) {
//         cityList.removeChild(cityList.firstChild);
//     }
// })


//---------------------------------------------------------------
//Ajax part - API key 78244aeb7fca6683e6a91e3953c941ac
const APIkey = "78244aeb7fca6683e6a91e3953c941ac";
submitBtn.click(function(event){
    event.preventDefault();
    var cityCall = cityInput.val();
    var queryURL = "api.openweathermap.org/data/2.5/weather?q="+cityCall+
    "&units=metric&appid="+APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(cityCall + " and "+response);
        
        $("#cityName").text("City: "+cityCall);
        localStorage.setItem("City: "+response.name)

        $("#temp").text("Temperature: "+response.main.temp)
        $("#hum").text("Humidity: "+response.main.humidity)
        $("#windSpeed").text("Wind Speed: "+response.main.speed)
        $("#UVindex").text("UV Index: "+response.weathe[0].description)
    })
    displayForecast();
});

function displayForecast() {
    var forecastURL = "api.openweathermap.org/data/2.5/forecast?q="+cityCall+
    "&units=metric&appid="+APIkey;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        //for (i=0;i<5;i++){}
        
        
        })



}