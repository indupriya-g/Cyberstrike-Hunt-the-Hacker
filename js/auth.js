document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const googleBtn = document.getElementById("google-login");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  // Regex pattern for password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\-]).{8,}$/;

  // 🔐 Traditional Username/Password Login
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value.trim(); // Get password from input field

    // Validate password
    if (!passwordRegex.test(password)) {
      errorMessage.textContent = "Password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.";
      return;  // Stop form submission if validation fails
    }

    errorMessage.textContent = ""; // Clear error message if password is valid

    // Continue with form submission if username and password are valid
    if (username && password) {
      // Simulate login - no actual authentication logic here
      window.location.href = "dashboard.html";
    } else {
      alert("Please enter both username and password.");
    }
  });

  // 🔐 Google Sign-In using Firebase
 googleBtn.addEventListener("click", () => {
  console.log("Google Sign-In button clicked");

  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("Sign-in successful", result.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Sign-in error:", error.code, error.message);
      alert("Google Sign-In failed: " + error.message);
    });
});

  });

