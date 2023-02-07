const addAchievementButton = document.getElementById("add-achievement-button");
const achievementInput = document.getElementById("achievement-input");
const calendar = document.getElementById("calendar");

const emoji = document.querySelector(".emoji");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let achievements = [];

if (localStorage.getItem("achievements")) {
  achievements = JSON.parse(localStorage.getItem("achievements"));
}

function addAchievement() {
  const achievement = achievementInput.value;
  const date = new Date();
  const formattedDate = `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;

  const existingAchievement = achievements.find((a) => a.achievement === achievement && a.date === formattedDate);
  if (existingAchievement) {
    // Show error message if the achievement already exists on the same date
    alert("Achievement already exists for the given date. Please enter a different achievement.");
    return;
  }

  achievements.push({ achievement, date: formattedDate });
  localStorage.setItem("achievements", JSON.stringify(achievements));
  
  renderCalendar();
}

function renderCalendar() {
    calendar.innerHTML = "";
    achievements.forEach((achievement) => {
      const existingDay = calendar.querySelector(`[data-date="${achievement.date}"]`);
  
      if (existingDay) {
        existingDay.querySelector(".achievements").innerHTML += `
          <li>${achievement.achievement}
            <i class="fa fa-times clear-achievement" aria-hidden="true"></i>
          </li>
        `;
      } else {
        const day = document.createElement("div");
        day.classList.add("day");
        day.setAttribute("data-date", achievement.date);
        day.innerHTML = `
          <h3>${achievement.date}</h3>
          <ul class="achievements">
            <li>${achievement.achievement}
              <i class="fa fa-times clear-achievement" aria-hidden="true"></i>
            </li>
          </ul>
        `;
  
        calendar.appendChild(day);
      }
    });
  
    const clearButtons = document.querySelectorAll(".clear-achievement");
    clearButtons.forEach((clearButton) => {
      clearButton.addEventListener("click", (event) => {
        const parentLi = event.target.parentElement;
        const parentUl = parentLi.parentElement;
        const parentDay = parentUl.parentElement;
        const date = parentDay.getAttribute("data-date");
  
        // Remove achievement from the display
        parentLi.remove();
  
        // Remove achievement from local storage
        achievements = achievements.filter((achievement) => {
          return !(achievement.date === date && achievement.achievement === parentLi.innerText.trim());
        });
        localStorage.setItem("achievements", JSON.stringify(achievements));
        renderCalendar();
        updateEmoji();
      });
    });
  }   
  addAchievementButton.addEventListener("click", () => {
    addAchievement();
    updateEmoji();
  });

renderCalendar();


const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote");

fetch("https://api.quotable.io/quotes?tag=discipline")
  .then((res) => res.json())
  .then((data) => {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomQuote = data.results[randomIndex];
    quoteText.textContent = randomQuote.content;
  });

  function updateEmoji() {
    let currentStreak = 1;
    let longestStreak = 1;
  
    // Get the achievements from local storage
    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    achievements.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    for (let i = 0; i < achievements.length - 1; i++) {
      const currentDate = new Date(achievements[i].date);
      const nextDate = new Date(achievements[i + 1].date);
  
      if (nextDate - currentDate === 86400000) {
        currentStreak++;
      } else {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        currentStreak = 1;
      }
    }
  
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
  
    // Update the emoji based on the longest streak
    emoji.innerHTML = "<strong> Streak: </strong>"
    if (longestStreak >= 3) {
      emoji.innerHTML += "⚡️";
    } else if (longestStreak === 2) {
      emoji.innerHTML += "🔥";
    } else if (longestStreak === 1) {
      emoji.innerHTML = "😊";
    } else {
      emoji.innerHTML = "😢";
    }
  }
  
  // Call the updateEmoji function when the page loads
  window.addEventListener("load", updateEmoji);

  const infoIcon = document.getElementById("info-icon");
const infoMessage = document.getElementById("info-message");

infoIcon.addEventListener("click", function() {
  infoMessage.style.display = "block";
});

infoIcon.addEventListener("mouseout", function() {
  infoMessage.style.display = "none";
});
// This code displays the information icon and creates a hidden info message. When the information icon is clicked, the info message is displayed, and when the mouse moves away from the icon, the info message is hidden again.





  
