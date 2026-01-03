const API_URL = "http://localhost:5000";

// Example (can be wired later)
async function getBudget(tripId) {
  const res = await fetch(`${API_URL}/itinerary/budget/${tripId}`);
  return res.json();
}
