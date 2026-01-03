document.addEventListener("DOMContentLoaded", () => {
  const stopsContainer = document.getElementById("stopsContainer");
  const addStopBtn = document.getElementById("addStopBtn");

  addStopBtn.addEventListener("click", addStop);

  function addStop() {
    const stopDiv = document.createElement("div");
    stopDiv.className = "stop";

    stopDiv.innerHTML = `
      <div class="stop-header">
        <h3>Stop</h3>
        <div>
          <button class="moveUp">⬆</button>
          <button class="moveDown">⬇</button>
        </div>
      </div>

      <input type="text" placeholder="City Name">
      <input type="date">
      <input type="date">

      <button class="saveStop">Save Stop</button>

      <div class="activities"></div>
      <button class="addActivity">+ Add Activity</button>
    `;

    // Reorder
    stopDiv.querySelector(".moveUp").onclick = () => {
      if (stopDiv.previousElementSibling)
        stopsContainer.insertBefore(stopDiv, stopDiv.previousElementSibling);
    };

    stopDiv.querySelector(".moveDown").onclick = () => {
      if (stopDiv.nextElementSibling)
        stopsContainer.insertBefore(stopDiv.nextElementSibling, stopDiv);
    };

    // Save Stop
    stopDiv.querySelector(".saveStop").onclick = async () => {
      const inputs = stopDiv.querySelectorAll("input");
      const res = await fetch("http://localhost:5000/stops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_id: 1,
          city_name: inputs[0].value,
          start_date: inputs[1].value,
          end_date: inputs[2].value
        })
      });
      const data = await res.json();
      stopDiv.dataset.stopId = data.stop_id;
      alert("Stop saved");
    };

    // Add Activity
    stopDiv.querySelector(".addActivity").onclick = () => {
      const actDiv = document.createElement("div");
      actDiv.className = "activity";
      actDiv.innerHTML = `
        <input placeholder="Activity Name">
        <input type="date">
        <input placeholder="Cost">
        <input placeholder="Duration (hrs)">
        <button class="saveActivity">Save Activity</button>
      `;

      actDiv.querySelector(".saveActivity").onclick = async () => {
        const i = actDiv.querySelectorAll("input");
        await fetch("http://localhost:5000/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stop_id: stopDiv.dataset.stopId,
            activity_name: i[0].value,
            activity_date: i[1].value,
            cost: i[2].value,
            duration_hours: i[3].value
          })
        });
        alert("Activity saved");
      };

      stopDiv.querySelector(".activities").appendChild(actDiv);
    };

    stopsContainer.appendChild(stopDiv);
  }
});
