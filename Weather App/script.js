// Dom Selection 
const city = document.getElementById('city');
const search = document.getElementById('search');
const weather = document.querySelector('.weather');
const cityName = document.getElementById('cityname');
const date = document.getElementById('date');
const weatherIcon = document.getElementById('weather_icon');
const temp = document.getElementById('temp');
const status = document.getElementById('status');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const dir = document.getElementById('dir');
const cloud = document.getElementById('cloud');


const appUrl = "https://api.weatherapi.com/v1/current.json?key=599b654723894e34bf491416242410&q=" ;
search.addEventListener('click', fetchData);

async function fetchData() {
    const cityValue = city.value; // Get the city input value
    if (!cityValue) {
        alert("Please enter a city name."); // Alert if input is empty
        return;
    }

    try {
        const response = await fetch(appUrl + (cityValue)); 
        if (!response.ok) {
            throw new Error('City not found')
        }
        const data = await response.json();
      

        // Date conversion
        const dateString = data.location.localtime;
        function formatDate(dateString) {
           
            const date = new Date(dateString);
        
           
            if (isNaN(date)) {
                return 'Invalid date';
            }
        
            
            const day = date.getDate();
        
           
            const options = { month: 'short' };
            const month = new Intl.DateTimeFormat('en-US', options).format(date);
        
           
            const dayOfWeekOptions = { weekday: 'long' }; 
            const dayOfWeek = new Intl.DateTimeFormat('en-US', dayOfWeekOptions).format(date);
        
           
            return `${day} ${month} ${dayOfWeek}`;
        }
       
        let code = data.current.condition.code;


if (code == "1030" || code == "1135" || code == "1147")  {
    weatherIcon.src = "mist.svg";
} else if (code == "1063" || code == "1150" || code == "1153" || code == "1180" || code == "1183" || 
           code == "1186" || code == "1189" || code == "1192" || code == "1195" || code == "1198" || 
           code == "1201" || code == "1204" || code == "1207" || code == "1240" || code == "1243" || 
           code == "1246" || code == "1249" || code == "1252" || code == "1273" || code == "1276") {
    weatherIcon.src = "rainy.svg";
} else if (code == "1066" || code == "1069" || code == "1210" || code == "1213" || code == "1216" || 
           code == "1219" || code == "1222" || code == "1225" || code == "1237" || code == "1255" || 
           code == "1258" || code == "1279" || code == "1282") {
    weatherIcon.src = "snowy.svg";
} else if (code == "1000" || code == "1003") {
    weatherIcon.src = "sunny.svg";
} else if (code == "1006" || code == "1009") {
    weatherIcon.src = "cloudy.svg";
}

        
        

        cityName.textContent = data.location.name; 
        date.innerHTML =formatDate(dateString);
        temp.innerHTML = `${Math.round(data.current.temp_c)} °C`; 
        status.innerHTML = `${data.current.condition.text}`; 
        humidity.innerHTML = `${data.current.humidity}%`;
        wind.innerHTML = `${Math.round(data.current.wind_kph)} kph`;
        dir.innerHTML = `${data.current.wind_dir}`; 
        cloud.textContent = `${data.current.cloud} %`; 

        weather.style.display = 'block';
    } catch (error) {
        console.error(error);
        alert(error.message); 
    }
}