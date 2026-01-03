const params = new URLSearchParams(window.location.search);
const start = document.getElementById('startDate').value;
const end = document.getElementById('endDate').value;


fetch('http://localhost:5000/itinerary/add-stop', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
trip_id: tripId,
city_name: city,
start_date: start,
end_date: end
})
})
.then(res => res.json())
.then(data => {
const li = document.createElement('li');
li.innerHTML = `<strong>${city}</strong><br>${start} → ${end}`;
li.onclick = () => selectStop(li, data.stop_id, city);
stopsList.appendChild(li);


document.getElementById('cityName').value = '';
document.getElementById('startDate').value = '';
document.getElementById('endDate').value = '';
});



function selectStop(element, stopId, city) {
document.querySelectorAll('#stopsList li').forEach(li => li.classList.remove('active'));
element.classList.add('active');


selectedStopId = stopId;
activityTitle.textContent = `Activities in ${city}`;
activityForm.classList.remove('hidden');
activitiesList.innerHTML = '';
}


function addActivity() {
const name = document.getElementById('activityName').value;
const date = document.getElementById('activityDate').value;
const cost = document.getElementById('activityCost').value;
const duration = document.getElementById('activityDuration').value;


fetch('http://localhost:5000/itinerary/add-activity', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
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
const li = document.createElement('li');
li.innerHTML = `${date} • <strong>${name}</strong> — ₹${cost} (${duration}h)`;
activitiesList.appendChild(li);


document.getElementById('activityName').value = '';
document.getElementById('activityDate').value = '';
document.getElementById('activityCost').value = '';
document.getElementById('activityDuration').value = '';
});
}