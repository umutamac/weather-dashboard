let cityArray = [];
$( document ).ready(function() { //when page loads, import cities from LS and display them in search history
    cityArray = JSON.parse(window.localStorage.getItem('cityKey'));
    cityArray.map(city => {
        $(".city-list").prepend($("<a>").addClass("list-group-item list-group-item-action pastSearch").text(city))
    })
});

function savecitytolist(cityInput) {
    let cityIndex = cityArray.indexOf(cityInput);
    $(`.pastSearch:contains(${cityInput})`).remove(); // remove the old search if it exists
    // add the newest search to the top of list
    $(".city-list").prepend($("<a>").addClass("list-group-item list-group-item-action pastSearch").text(cityInput))
    // console.log(cityArray)
    if (cityIndex >= 0) { // if the cityInput exists in cityArray
        cityArray.push(cityArray.splice(cityIndex, 1)[0]); // move the existing item to the end of array
    } else { //if it doesnt already exist
        cityArray.push(cityInput); // add the item to the end of array
    }
    // console.log(cityArray)
    localStorage.setItem('cityKey', JSON.stringify(cityArray)); // set the array to LS
}

//Ajax part
const APIkey = "78244aeb7fca6683e6a91e3953c941ac";
$("#submit").click(function makeSearch(event) {
    event.preventDefault();
    var cityInput = $("#cityInput").val().trim();
    if (cityInput === "") { // if input is empty, don't do anything
        return
    } else {
        console.log("------>" + cityInput);
        savecitytolist(cityInput);
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${APIkey}`;
        $("#cityInput").val("");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function currentWeatherCall(response) {
            console.log("Current Weather:");
            console.log(response);

            var dateObject = new Date(response.dt * 1000);
            var yearDate = dateObject.toLocaleString("en-US", { year: "numeric" });
            var monthDate = dateObject.toLocaleString("en-US", { month: "numeric" });
            var dayDate = dateObject.toLocaleString("en-US", { day: "numeric" });

            $("#cityName").text(response.name);
            $("#date").text(` ${yearDate}/${monthDate}/${dayDate}`);
            $("#weatherIcon").attr("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
            $("#temp").text(response.main.temp + " C");
            $("#hum").text(response.main.humidity + "%");
            $("#windSpeed").text(response.wind.speed + " m/s");
            lonOutput = response.coord.lon;
            latOutput = response.coord.lat;
            console.log("lat: " + latOutput + "lon: " + lonOutput);

            // api call for UV Index using lat and lon from previous call
            var UVIqueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latOutput}&lon=${lonOutput}&appid=${APIkey}`;
            //console.log(UVIqueryURL);
            $.ajax({
                url: UVIqueryURL,
                method: "GET"
            }).then(function uviCall(UVIresponse) {
                console.log(UVIresponse);
                $("#UVindex").text(UVIresponse.value);
                var color = "";
                if (UVIresponse.value <= 3.0) { color = "green"; }
                else if (UVIresponse.value < 6.0) { color = "yellow"; }
                else if (UVIresponse.value >= 6.0) { color = "red"; }
                $("#UVindex").css("background-color", color);
            });
        });
        // 5 Day forecast api call
        var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&appid=${APIkey}`;
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function futureWeatherCall(response) {
            console.log("5 day fc:");
            console.log(response);
            $(".forecast-boxes").empty();
            for (i = 4; i < 40; i += 8) {
                var datetext = response.list[i].dt_txt // "2020-12-06 00:00:00"
                var date = datetext.slice(0, -9) // "2020-12-06"

                $(".forecast-boxes").append($("<div>").addClass("col box box" + i));
                $(".box" + i).append($("<h4>").addClass("fc-date").text(date)); // need a way to get the date from response   
                $(".box" + i).append($("<img>").attr("src", `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`));
                $(".box" + i).append($("<p>").addClass("fc-temp").text("Temp: " + response.list[i].main.temp + " C"));
                $(".box" + i).append($("<p>").addClass("fc-hum").text("Humidity: " + response.list[i].main.humidity + "%"));
            }
        })
    }
});


// event delegation needed so that dynamcally generated items do fire off when clicked
$(".city-list").on("click", "a", function searchAgain() {
    var searchTerm = $(this).text();
    //console.log(searchTerm);
    $("#cityInput").val(searchTerm);
    $("#submit").trigger("click");
})

$("#clear").click(function () { // clear btn clears LS and deletes search history
    localStorage.clear();
    $(".city-list").empty();
});