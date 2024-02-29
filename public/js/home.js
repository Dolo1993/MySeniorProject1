//to handle navigation 
document.getElementById('mobile-nav').addEventListener('change', function () {
    var selectedOption = this.value;
    if (selectedOption) {
        window.location.href = selectedOption;
    }
});



// to handle slow appearing on the contact page
document.addEventListener("DOMContentLoaded", function() {
    const leaders = document.querySelectorAll('.leader');
    function checkVisibility() {
        leaders.forEach(leader => {
            const bounding = leader.getBoundingClientRect();
            const opacity = Math.max(0, Math.min(1, 1 - (bounding.top / window.innerHeight)));
            leader.style.opacity = opacity.toFixed(2);
            if (bounding.top < window.innerHeight && bounding.bottom >= 0) {
                leader.classList.add('show');
            }
        });
    }
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    checkVisibility(); 
}); 


// prevent right click
// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// });
 


// to calculate the weather temperature in Liberia
const apiKey = "4693e3d9da68657f229c5244a54f4233";
const city = "Monrovia,Liberia";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

// Retrieve the current temperature and weather icon
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const currentTemp = Math.round(data.main.temp);
    const weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weatherDesc = data.weather[0].description;
    document.getElementById("current-temp").textContent = currentTemp;
    document.getElementById("weather-icon").setAttribute("src", weatherIcon);
    document.getElementById("weather-icon").setAttribute("alt", weatherDesc);
    document.querySelector("figcaption").textContent = weatherDesc;
  }) 



 // Function to calculate and display the days until Christmas
 function calculateDaysUntilChristmas() {
    let today = new Date();
    let christmas = new Date(today.getFullYear(), 11, 25);

    // check if it's the days of December after Christmas, if so, change to next year
    if (today.getMonth() === 11 && today.getDate() > 25) {
        christmas.setFullYear(christmas.getFullYear() + 1);
    }
    let daysLeft = (christmas.getTime() - Date.now()) / 84600000;

    // Display the information
    document.getElementById('daysleft').innerHTML = `${daysLeft.toFixed(0)} days`;

    // Display the number of days since the last visit
    document.getElementById('lastVisited').textContent = getLastVisited();

    // Store the current visit date in local storage
    localStorage.setItem('lastVisited', today.toISOString());
}

// Function to get the last visited time from localStorage
function getLastVisited() {
    const currentDate = new Date();
    const lastVisited = localStorage.getItem('lastVisited');
    const lastVisitedDate = lastVisited ? new Date(lastVisited) : null;

    if (lastVisitedDate) {
        // Calculate the number of days between the current date and the last visit date
        const daysSinceLastVisit = Math.round((currentDate - lastVisitedDate) / (1000 * 60 * 60 * 24));
        return `${daysSinceLastVisit} days`;
    } else {
        return "N/A"; 
    }
}

// function to initialize the page
calculateDaysUntilChristmas();

// Initialize display elements
const todayDisplay = document.querySelector("#today");
const visitsDisplay = document.querySelector("#visits");
const daysLeftOutput = document.querySelector("#daysleft");

// Get the stored value in localStorage
let numVisits = Number(window.localStorage.getItem("visits-ls"));

// Determine if this is the first visit or display the number of visits.
if (numVisits !== 0) {
    visitsDisplay.textContent = numVisits;
} else {
    visitsDisplay.textContent = `This is your first visit!`;
}

// Increment the number of visits.
numVisits++;

// Store the new number of visits value
localStorage.setItem("visits-ls", numVisits);

