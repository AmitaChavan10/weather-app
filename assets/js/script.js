/* Author: 

*/
const weatherApi = {
  key: "37aa273acfd4be1d766ebdc07f26a550",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
}

const btn = document.getElementById("btn")

btn.addEventListener("click", function (e) {
  e.preventDefault()
  weatherReport()
})

function weatherReport() {
  const searchInput = document.getElementById("input-box").value
  if (searchInput == "") {
    alert("Please enter city name.")
    return false
  } else if (!isNaN(searchInput)) {
    alert("Alphabets only.")
    return false
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${weatherApi.key}&units=metric`
  )
    .then((weather) => {
      return weather.json()
    })
    .then(showWeatherReport)
    .catch((error) => alert("Enter a valid city name"))
}

function showWeatherReport(weather) {
  let city = document.getElementById("city")
  city.innerHTML = `${weather.name}, ${weather.sys.country}`

  let temp = document.getElementById("temp")
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`

  let windSpeed = document.getElementById("wind-speed")
  windSpeed.innerHTML = `Wind Speed: ${weather.wind.speed}`

  let climate = document.getElementById("climate")
  climate.innerHTML = `${weather.weather[0].main}`

  const img = document.getElementById("icon")
  if (climate.textContent == "Clear") {
    document.body.style.backgroundImage = "url('./assets/images/clear.jpeg')"
    img.src = "assets/images/clear.png"
  } else if (climate.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('./assets/images/clouds.jpeg')"
    img.src = "assets/images/cloud.png"
  } else if (climate.textContent == "Rain") {
    document.body.style.backgroundImage = "url('./assets/images/rainy.jpeg')"
    img.src = "assets/images/rain.png"
  } else if (climate.textContent == "Snow") {
    document.body.style.backgroundImage = "url('./assets/images/snowy.jpeg')"
    img.src = "assets/images/snowy.png"
  } else if (climate.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('./assets/images/stormy.jpeg')"
    img.src = "assets/images/storm.png"
  } else if (climate.textContent == "Sunny") {
    document.body.style.backgroundImage = "url('./assets/images/sunny.jpeg')"
    img.src = "assets/images/sun.png"
  } else if (
    climate.textContent == "Smoke" ||
    climate.textContent == "Haze" ||
    climate.textContent == "Fog"
  ) {
    document.body.style.backgroundImage = "url('/assets/images/haze.jpeg')"
    img.src = "assets/images/haze.png"
  }

  let date = document.getElementById("date")
  let todayDate = new Date()
  date.innerHTML = manageDate(todayDate)
}

function manageDate(dateArg) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let year = dateArg.getFullYear()
  let month = months[dateArg.getMonth()]
  let date = dateArg.getDate()

  return `${date} ${month} ${year}`
}
