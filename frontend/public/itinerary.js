// ---------- GLOBAL STATE ----------
const params = new URLSearchParams(window.location.search);
const tripId = params.get("trip_id");

let selectedStopId = null;

// ---------- DOM ELEMENTS ----------
const stopsList = document.getElementById("stopsList");
const activityTitle = document.getElementById("activityTitle");
const activityForm = document.getElementById("activityForm");
const activitiesList = document.getElementById("activitiesList");

// ---------- ADD STOP ----------
function addStop() {
  const city = document.getElementById("cityName").value;
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  if (!city) {
    alert("City name required");
    return;
  }

  fetch("http://localhost:5000/itinerary/add-stop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trip_id: tripId,
      city_name: city,
      start_date: start,
      end_date: end
    })
  })
    .then(res => res.json())
    .then(data => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${city}</strong><br>${start || ""} → ${end || ""}`;
      li.onclick = () => selectStop(li, data.stop_id, city);
      stopsList.appendChild(li);

      // clear inputs
      document.getElementById("cityName").value = "";
      document.getElementById("startDate").value = "";
      document.getElementById("endDate").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add stop");
    });
}

// ---------- SELECT STOP ----------
function selectStop(element, stopId, city) {
  document.querySelectorAll("#stopsList li")
    .forEach(li => li.classList.remove("active"));

  element.classList.add("active");

  selectedStopId = stopId;
  activityTitle.textContent = `Activities in ${city}`;
  activityForm.classList.remove("hidden");
  activitiesList.innerHTML = "";
}

// ---------- ADD ACTIVITY ----------
function addActivity() {
  if (!selectedStopId) {
    alert("Select a city first");
    return;
  }

  const name = document.getElementById("activityName").value;
  const date = document.getElementById("activityDate").value;
  const cost = document.getElementById("activityCost").value;
  const duration = document.getElementById("activityDuration").value;

  if (!name) {
    alert("Activity name required");
    return;
  }

  fetch("http://localhost:5000/itinerary/add-activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stop_id: selectedStopId,
      activity_name: name,
      activity_date: date,
      cost: cost,
      duration_hours: duration
    })
  })
    .then(res => res.json())
    .then(() => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${date || ""} • <strong>${name}</strong>
        — ₹${cost || 0} (${duration || 0}h)
      `;
      activitiesList.appendChild(li);

      // clear activity inputs
      document.getElementById("activityName").value = "";
      document.getElementById("activityDate").value = "";
      document.getElementById("activityCost").value = "";
      document.getElementById("activityDuration").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add activity");
    });
}
