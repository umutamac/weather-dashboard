# Weather Dashboard

This project is designed to retrieve current weather information and future forecast from a openweathermap API when a user searches in a city.

When user searches a city in search bar, the typed in city name is used in two different HTTP Get requests from Openweathermap API. The first response includes current date, a weather icon, temperature, humidity and wind speed. The second response is used to show the weather forecast at the same hour for the next 5 days. The response first reponse also includes the lattitude and longitute of the city, and they are used to request the current UV Index of the city.

Additionally, the city name gets saved into local storage when it is searched, and the name is then displayed on the search list on the left side of the window. Clicking on one of the past searches triggers the same server requests for all of the information mentioned above.

## Technologies and Tools
This project leverages jQuery, and was a practice project to get myself familiarized with the library. The weather information is brought over from Openweathermap API with an API key. The styling in the project is mostly done using Bootstrap CSS.

### Links
Github Repo: https://github.com/umutamac/weather-dashboard

Depolyed Project: https://umutamac.github.io/weather-dashboard/

![Weather Dashboard](/Assets/weather_dashboard.png?raw=true "Weather Dashboard")

### Contact
You can reach me at amacalptekin@gmail.com if you have any questions or just want to chat!
