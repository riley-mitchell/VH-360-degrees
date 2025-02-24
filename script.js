// Wait for DOM to load and check auth status
document.addEventListener("DOMContentLoaded", function() {
  console.log("VH360° - Modern interface initialized");
  checkAuthAndRedirect();
});

// Check if user is authenticated and redirect if needed
function checkAuthAndRedirect() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPage = window.location.pathname.split('/').pop();
    
    if (user && user.email) {
      // If user is logged in and on index, redirect to dashboard
      if (currentPage === "index.html" || currentPage === "") {
        window.location.href = "dashboard.html";
      }
    } else {
      // If user is not logged in and trying to access dashboard, redirect to index
      if (currentPage === "dashboard.html") {
        window.location.href = "index.html";
      }
    }
  } catch (error) {
    console.error("Error checking auth:", error);
  }
}

// Function to handle dashboard access
function checkDashboardAccess(event) {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email) {
    window.location.href = "dashboard.html";
  } else {
    showError("Please sign in to access the dashboard");
  }
}

// Google Sign-In callback function
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID Token: " + response.credential);
  
  try {
    const userInfo = parseJwt(response.credential);
    console.log("User Info:", userInfo);
    
    if (userInfo.email && userInfo.email.endsWith("@vhhscougars.org")) {
      console.log("Login successful:", userInfo);
      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      }));
      
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      showError("Only @vhhscougars.org emails are allowed.");
    }
  } catch (error) {
    console.error("Error processing sign-in:", error);
    showError("An error occurred during sign-in. Please try again.");
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
  
  const signUpBox = document.querySelector('.sign-up-box');
  if (signUpBox) {
    signUpBox.prepend(errorAlert);
  }
  
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
