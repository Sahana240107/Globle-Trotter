async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  errorEl.textContent = "";

  if (!email || !password) {
    errorEl.textContent = "Please enter email and password";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      errorEl.textContent = data.message || "Login failed";
      return;
    }

    // Store token
    localStorage.setItem("token", data.token);

    // Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (err) {
    errorEl.textContent = "Server not reachable";
    console.error(err);
  }
}
