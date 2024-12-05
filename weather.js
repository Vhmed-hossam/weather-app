var city = document.getElementById("thecity");
var day = document.getElementById("theday");
var date = document.getElementById("thedate");
var temp = document.getElementById("thetemp");
var wind = document.getElementById("thewind");
var desc = document.getElementById("thewdesc");
var precent = document.getElementById("theprecentumb");
var dirction = document.getElementById("thedirection");
var searchbtn = document.getElementById("searchbtn");
var theoneandonlyinput = document.getElementById("theoneandonlyinput");
var day2 = document.getElementById("theday2");
var day3 = document.getElementById("theday3");

async function getWeather(cityName) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=f218fc08cc99483480a103545240212&q=${cityName}`
        );
        if (!response.ok) {
            throw new Error('City not found or invalid API response');
        }
        const data = await response.json();
        if (data && data.current) {
            updateWeatherDisplay(data);
        } else {
            alert('City not found or invalid data returned.');
        }
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again later.');
    }
}

function updateWeatherDisplay(data) {
    city.innerHTML = `${data.location.name}`;
    temp.innerHTML = `${data.current.temp_c}°C`; 
    desc.innerHTML = data.current.condition.text; 
    wind.innerHTML = `${data.current.wind_kph} km/h`;  
    precent.innerHTML = `${data.current.precip_mm} mm`;  
    dirction.innerHTML = data.current.wind_dir;  
    const dateObj = new Date();
    date.innerHTML = `${dateObj.toLocaleDateString('en-US')}`;
    day.innerHTML = `${dateObj.toLocaleString('en-US', { weekday: 'long' })}`;
}
function inputclicked() {
    theoneandonlyinput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            getWeather(theoneandonlyinput.value); 
        }
    });
    searchbtn.addEventListener("click", async () => {
        await getWeather(theoneandonlyinput.value);
    });
}
inputclicked();
