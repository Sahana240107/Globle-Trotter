document.addEventListener("DOMContentLoaded", () => {

  const addStopBtn = document.getElementById("addStopBtn");
  const stopsContainer = document.getElementById("stopsContainer");

  addStopBtn.addEventListener("click", addStop);

  function addStop() {
    console.log("Add Stop clicked"); // 🔍 DEBUG CHECK

    const stopDiv = document.createElement("div");
    stopDiv.className = "stop";

    stopDiv.innerHTML = `
      <h3>New Stop</h3>
      <input type="text" placeholder="City Name">
      <input type="date">
      <input type="date">
      <button class="saveStop">Save Stop</button>
      <div class="activities"></div>
    `;

    const saveBtn = stopDiv.querySelector(".saveStop");

    saveBtn.addEventListener("click", () => {
      alert("Stop saved (backend call next)");
    });

    stopsContainer.appendChild(stopDiv);
  }

});
