document.addEventListener("DOMContentLoaded", function() {
  console.log("Page loaded – Original Facebook style replicated.");
});

// Google Sign-In Callback
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID Token: " + response.credential);
  
  // Decode token (optional, for debugging)
  const userInfo = parseJwt(response.credential);
  console.log("User Info:", userInfo);
  
  // Domain restriction check
  if (userInfo.email.endsWith("@vhhscougars.org")) {
    console.log("Login successful:", userInfo);
    // Store user info in local storage and redirect
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "dashboard.html"; // Redirect to the dashboard
  } else {
    alert("Only @vhhscougars.org emails are allowed.");
  }
}

// Function to decode JWT
function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')));
}

