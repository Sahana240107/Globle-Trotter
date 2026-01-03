function login() {
    localStorage.setItem("userId", 1);
    window.location.href = "../pages/dashboard.html";
  }
  
  function createTrip() {
    localStorage.setItem("tripId", 1);
    window.location.href = "build-itinerary.html";
  }
  
  function viewItinerary() {
    window.location.href = "itinerary-view.html";
  }
  
  function goToCalendar() {
    window.location.href = "calendar-view.html";
  }

  