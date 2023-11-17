
const button = document.getElementById("searchbutton");
const input = document.getElementById("cityinput");
const cityName = document.getElementById("cityname");
const cityTime = document.getElementById("citytime");
const cityTemperature = document.getElementById("citytemperature");
const localImage = document.getElementById("localImage");
const weatherDescription = document.getElementById("weatherdescription");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const errorMessage = document.getElementById("error-message");

const API_KEY = "6f3d0a8fedc94ff6848131617231711"; 

async function getData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
        );
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error fetching data");
    }
}

button.addEventListener("click", async () => {
    try {
        errorMessage.innerText = ""; 
        const value = input.value;
        const result = await getData(value);

        cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        cityTime.innerText = `Local Time: ${result.location.localtime}`;
        cityTemperature.innerText = `${result.current.temp_c}°C`;

        
        localImage.src = "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/industry/weather-forecast-background.jpg";

        const iconCode = result.current.condition.code;

        weatherDescription.innerText = result.current.condition.text;
        humidity.innerText = `Humidity: ${result.current.humidity}%`;
        wind.innerText = `Wind: ${result.current.wind_kph} km/h`;
    } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.innerText = "City not found. Please try again.";
    }
});
