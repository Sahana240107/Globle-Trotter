// ===============================
// GLOBAL STATE
// ===============================
const params = new URLSearchParams(window.location.search);
const tripId = params.get("trip_id");

let selectedStopId = null;

// ===============================
// DOM ELEMENTS
// ===============================
const cityInput = document.getElementById("cityName");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const stopsList = document.getElementById("stopsList");
const activitiesList = document.getElementById("activitiesList");

const activityTitle = document.getElementById("activityTitle");
const activityForm = document.getElementById("activityForm");

// ===============================
// SAFETY CHECK
// ===============================
if (!tripId) {
  alert("Trip ID missing in URL! Use ?trip_id=1");
}

// ===============================
// ADD STOP
// ===============================
function addStop() {
  const city = cityInput.value.trim();
  const start = startDateInput.value;
  const end = endDateInput.value;

  if (!city) {
    alert("City name is required");
    return;
  }

  fetch("http://localhost:5000/itinerary/add-stop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trip_id: tripId,
      city_name: city,
      start_date: start || null,
      end_date: end || null
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.stop_id) {
        alert("Failed to add stop");
        return;
      }

      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${city}</strong><br>
        ${start || "?"} → ${end || "?"}
      `;

      li.addEventListener("click", () => {
        selectStop(li, data.stop_id, city);
      });

      stopsList.appendChild(li);

      cityInput.value = "";
      startDateInput.value = "";
      endDateInput.value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Server error while adding stop");
    });
}

// ===============================
// SELECT STOP
// ===============================
function selectStop(element, stopId, city) {
  document.querySelectorAll("#stopsList li")
    .forEach(li => li.classList.remove("active"));

  element.classList.add("active");

  selectedStopId = stopId;

  activityTitle.textContent = `Activities in ${city}`;
  activityForm.classList.remove("hidden");

  activitiesList.innerHTML = `
    <li style="opacity:0.6">
      No activities yet. Add one below.
    </li>
  `;
}

// ===============================
// ADD ACTIVITY
// ===============================
function addActivity() {
  if (!selectedStopId) {
    alert("Select a city first");
    return;
  }

  const name = document.getElementById("activityName").value.trim();
  const date = document.getElementById("activityDate").value;
  const cost = document.getElementById("activityCost").value || 0;
  const duration = document.getElementById("activityDuration").value || null;

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
      activity_date: date || null,
      cost: cost,
      duration_hours: duration
    })
  })
    .then(res => res.json())
    .then(() => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${date || ""} • <strong>${name}</strong>
        — ₹${cost} ${duration ? `(${duration}h)` : ""}
      `;

      activitiesList.appendChild(li);

      document.getElementById("activityName").value = "";
      document.getElementById("activityDate").value = "";
      document.getElementById("activityCost").value = "";
      document.getElementById("activityDuration").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Error adding activity");
    });
}
