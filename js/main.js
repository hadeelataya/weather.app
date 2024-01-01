var date = document.getElementById("date-time")
var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// =====================================================================
function getDateTime() {
    let now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes();
  
   
    hour = hour % 12;
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
  }
  date.innerText = getDateTime();
  setInterval(() => {
    date.innerText = getDateTime();
  }, 1000);
// ==================================================================================
async function getWeather(a) {
    var t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c18acbd0745a4a29bc8153527233112&units=metric&q=${a}&days=7`);
    if (t.ok && 400 != t.status) {
        var a = await t.json();

        displayCurrentWeather(a.location, a.current),
        displayAnotherWeather(a.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", a=>{
    getWeather(a.target.value)
}
);
// ====================================================
function displayCurrentWeather(a, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        var n = `
        <div class="today forecast">  
        <div class="forecast-header"  id="today">   
        <div class="day">${days[e.getDay()]}</div>  
        <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>   
        </div>  
        <div class="forecast-content" id="current">  
        <div class="location">${a.name}</div>    
        <div class="degree">\n        
        <div class="num">${t.temp_c}<sup>o</sup>C</div>     
        <div class="forecast-icon">\n           
        <img src="https:${t.condition.icon}" alt="" width=90></div>   
        </div>\n 
          <div class="custom">${t.condition.text}</div>\n    <span>
          <img src="images/icon-umberella.png" alt="">20%</span>
          <span>
          <img src="images/icon-wind.png" alt="">18km/h</span>
          <span>
          <img src="images/icon-compass.png" alt="">East</span>   
          </div>
          </div>`;
       
        document.getElementById("forecast").innerHTML = n
    }
}
// ==============================================================
function displayAnotherWeather(a) {
    var t = "";
    for (let e = 1; e < a.length ; e++){
        t += `
    <div class="forecast">     
    <div class="forecast-header">           
    <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>    
    </div>       
    <div class="forecast-content">            
    <div class="forecast-icon">            
    <img src="https:${a[e].day.condition.icon}" alt="" width=48>            </div>      
    <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>         
    <small>${a[e].day.mintemp_c}<sup>o</sup></small>    
    <div class="custom">${a[e].day.condition.text}</div>   
    </div>  
    </div>`;
    }
    document.getElementById("forecast").innerHTML += t
}
getWeather("cairo");
