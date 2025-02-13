// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
  console.log("VH360° - Modern interface initialized");
});

// Google Sign-In callback function
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID Token: " + response.credential);
  
  const userInfo = parseJwt(response.credential);
  console.log("User Info:", userInfo);
  
  if (userInfo.email.endsWith("@vhhscougars.org")) {
    console.log("Login successful:", userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "dashboard.html";
  } else {
    showError("Only @vhhscougars.org emails are allowed.");
  }
}

// JWT parsing function
function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')));
}

// Error handling function
function showError(message) {
  const errorAlert = document.createElement('div');
  errorAlert.className = 'alert-box error';
  errorAlert.innerHTML = `
    <svg class="alert-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <p>${message}</p>
  `;
  
  document.querySelector('.sign-up-box').prepend(errorAlert);
  
  // Remove error after 5 seconds
  setTimeout(() => {
    errorAlert.remove();
  }, 5000);
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
