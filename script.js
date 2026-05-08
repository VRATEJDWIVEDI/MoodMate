// Thoughts
const thoughts = [
  "You don’t have to be perfect, just consistent.",
  "Small steps every day = big results.",
  "Your future depends on what you do today.",
  "Discipline will take you where motivation can’t.",
  "You are stronger than your excuses.",
  "Progress, not perfection.",
  "Do something today your future self will thank you for.",
  "It’s okay to rest, but don’t quit.",
  "Hard days build strong people.",
  "You didn’t come this far to only come this far.",
  "Your only competition is yesterday’s you.",
  "Stay patient. Stay focused. Stay consistent.",
  "Even 1% improvement daily matters.",
  "Believe in yourself even when no one else does.",
  "You are capable of more than you think."
];

function showRandomThought() {
  const i = Math.floor(Math.random() * thoughts.length);
  const text = thoughts[i];

  // Normal thought
  document.getElementById("thought").innerText = text;

  // Moving thought
  const moving = document.getElementById("movingThought");
  moving.innerHTML = `<span class="move">${text}</span>`;
  moving.classList.remove("hidden");

  // Hide after animation
  setTimeout(() => {
    moving.classList.add("hidden");
  }, 6000);
}

// Mood Data
const moodData = {

  happy: {
    message: `That’s a solid place to be in 😄  
Don’t waste it—good moods are like power-ups.  

Here are some things you can do to actually use this happy energy:`,

    image: "assets/happy.gif",

    activities: [
      "🎉 Celebrate your joy",
      "💌 Share happiness with a friend",
      "🎶 Listen to your favorite song",
      "💃 Dance for 5 minutes",
      "📸 Capture this moment"
    ]
  },

  sad: {
    message: `It’s okay to feel low sometimes 😔  
You don’t have to fix everything right now.`,

    image: "assets/sad.gif",

    activities: [
      "🎧 Listen to calming music",
      "💬 Talk to someone",
      "📝 Write your feelings",
      "🫶 Watch something comforting"
    ]
  },

  stressed: {
    message: `Your mind looks overloaded 😰  
Let’s slow things down.`,

    image: "assets/stressed.jpg",

    activities: [
      "🌬 Deep breathing",
      "🧘 Meditation",
      "🚶 Walk outside",
      "📵 Take a break from screens"
    ]
  },

  tired: {
    message: `Your body needs rest 😴  
Don’t ignore it.`,

    image: "assets/tired.jpg",

    activities: [
      "🛌 Take a nap",
      "💧 Drink water",
      "🍎 Eat something light",
      "📵 Reduce screen time"
    ]
  },

  Anger: {
  message: `Looks like something really got to you 😡  
That kind of energy can feel intense—but it’s not bad.  

Let’s channel it in a way that doesn’t hurt you or anyone else:`,

  image: "assets/angry.jpg",

  activities: [
    "🌬 Take slow deep breaths",
    "🚶 Go for a fast walk",
    "🥊 Release energy (punch pillow / exercise)",
    "📝 Write down what’s bothering you",
    "🎧 Listen to music and cool down",
    "🧊 Splash cold water on your face",
    "💭 Step away and give yourself time"
  ]
},

};

// Mood Selection
function selectMood(mood) {

  // 🧠 STORE MOOD (NEW ADDITION)
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  moods.push(mood);
  localStorage.setItem("moods", JSON.stringify(moods));

  // EXISTING CODE (UNCHANGED)
  document.body.className = mood;
  const container = document.getElementById("suggestions");
  container.innerHTML = "";

  const data = moodData[mood];

  // 🧠 MESSAGE
  const msg = document.createElement("p");
  msg.innerText = data.message;
  msg.style.fontSize = "20px";
  msg.style.margin = "20px";
  container.appendChild(msg);

  // 🖼 IMAGE
  const img = document.createElement("img");
  img.src = data.image;
  img.style.width = "200px";
  img.style.margin = "10px";
  container.appendChild(img);

  // 📦 ACTIVITIES
  data.activities.forEach(activity => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${activity}</h3>
      <button onclick="addFavorite('${activity}', '${mood}')">❤️ Save</button>
    `;

    container.appendChild(div);
  });

  // 📊 UPDATE INSIGHTS (NEW ADDITION)
  showInsights();
}

// Favorites
function addFavorite(activity, mood) {
  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  favs.push({
    text: activity,
    mood: mood
  });

  localStorage.setItem("favs", JSON.stringify(favs));
  showFavorites();
}

function showFavorites() {
  let favs = JSON.parse(localStorage.getItem("favs")) || [];
  const div = document.getElementById("favorites");

  div.innerHTML = favs.map((f, index) => `
    <div class="card">
      <h3>${f.text}</h3>
      <p>🌈 Mood: ${f.mood}</p>
      <button onclick="removeFavorite(${index})">❌ Remove</button>
    </div>
  `).join("");
}
// Journal
function saveFeeling() {
  const text = document.getElementById("feelingInput").value;

  let entries = JSON.parse(localStorage.getItem("journal")) || [];

  const newEntry = {
    text: text,
    date: new Date().toLocaleString()
  };

  entries.push(newEntry);
  localStorage.setItem("journal", JSON.stringify(entries));

  showJournal();
}

function showJournal() {
  const container = document.getElementById("journalList");
  let entries = JSON.parse(localStorage.getItem("journal")) || [];

  container.innerHTML = entries.map((entry, index) => `
    <div class="card">
      <p>${entry.text}</p>
      <small>${entry.date}</small><br>
      <button onclick="removeJournal(${index})">❌ Delete</button>
    </div>
  `).join("");
}

function removeJournal(index) {
  let entries = JSON.parse(localStorage.getItem("journal")) || [];

  entries.splice(index, 1); // remove that entry
  localStorage.setItem("journal", JSON.stringify(entries));

  showJournal(); // refresh UI
}

function shareFeeling() {
  const text = document.getElementById("feelingInput").value;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
}
function clearJournal() {
  localStorage.removeItem("journal");
  showJournal();
}
// Emergency
function toggleHelp() {
  document.getElementById("helpPanel").classList.toggle("hidden");
}

// 📊 Mood Analytics
function getMoodStats() {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];

  let stats = {
    total: moods.length,
    happy: 0,
    sad: 0,
    stressed: 0,
    tired: 0,
    Anger: 0
  };

  moods.forEach(m => {
    if (stats[m] !== undefined) {
      stats[m]++;
    }
  });

  return stats;
}

function getTopMood(stats) {
  let max = 0;
  let top = "None";

  for (let mood in stats) {
    if (mood !== "total" && stats[mood] > max) {
      max = stats[mood];
      top = mood;
    }
  }

  return top;
}

function showInsights() {
  let stats = getMoodStats();
  let top = getTopMood(stats);

  document.getElementById("insights").innerHTML = `
    <h3>📊 Mood Stats</h3>
    <p>Total: ${stats.total}</p>
    <p>Top Mood: ${top}</p>
    <p>😊 ${stats.happy}</p>
    <p>😔 ${stats.sad}</p>
    <p>😰 ${stats.stressed}</p>
    <p>😴 ${stats.tired}</p>
    <p>😠 ${stats.Anger}</p>

    <button onclick="resetMoodStats()">🗑 Reset</button>
  `;
}

// Load on start
showInsights();
function resetMoodStats() {
  localStorage.removeItem("moods");
  showInsights();
}