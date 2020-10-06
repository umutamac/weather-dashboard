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


// cityData.forEach((cityArray) => {
//     aMaker(cityInput.value);
// })


$("#clear").click( function () { // clear btn clears the storage and deletes li's
    localStorage.clear();
    $(".city-list").empty();
})
let cityArray = [];


function savecitytolist(cityInput) {
    cityArray.push(cityInput);
    localStorage.setItem('cityKey', JSON.stringify(cityArray));
    $(".city-list").prepend( $("<a>").addClass("list-group-item list-group-item-action").text(cityInput))
  
}
//---------------------------------------------------------------
//Ajax part
const APIkey = "78244aeb7fca6683e6a91e3953c941ac";
$("#submit").click(function(event){
    event.preventDefault();
    var cityInput = $("#cityInput").val();
    if (cityInput==""){ // if input is empty, don't do anything
        return
    } else {
        savecitytolist(cityInput);
        var Lon = "";
        var Lat = "";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+
        "&units=metric&appid="+APIkey;
        $("#cityInput").val("");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log("Current Weather:");
            console.log(response);
            $("#cityName").text(response.name+" "+response.weather[0].icon); // icon is only printing a string
            $("#temp").text("Temperature: "+response.main.temp+" C");
            $("#hum").text("Humidity: "+response.main.humidity+" %");
            $("#windSpeed").text("Wind Speed: "+response.wind.speed+" m/s");
            Lon = response.coord.lon;
            console.log("lon: "+Lon);
            Lat = response.coord.lat;
            console.log("lat: "+Lat);


            // api call for UV Index using lat and lon from previous call
            var UVIqueryURL ="https://api.openweathermap.org/data/2.5/uvi?lat="+Lat+"&lon="+Lon+"&appid="+APIkey;
            console.log(UVIqueryURL);
            $.ajax({
                url: UVIqueryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                $("#UVindex").text("UV Index: "+response.value);
            });
        });
        // 5 Day forecast api call
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput+"&units=metric&appid="+APIkey;
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log("5 day fc:");
            console.log(response);
            for (i=0;i<5;i++){ // for each box, empty previous stuff, create elements with text for date, temp, hum
                $("#box"+i).empty();
                $("#box"+i).append($("<h4>").addClass("fc-date").text("Date: ")); // need a way to get the date from response   
                $("#box"+i).append($("<p>").addClass("fc-temp").text("Temp: "+response.list[i].main.temp+" C"));   
                $("#box"+i).append($("<p>").addClass("fc-hum").text("Humidity: "+response.list[i].main.humidity+" %"));
            }   
        })
    }
});



