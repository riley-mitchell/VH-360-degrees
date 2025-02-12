document.addEventListener("DOMContentLoaded", function() {
  console.log("Page loaded – Modernized Facebook style implemented.");
});

function handleCredentialResponse(response) {
  console.log("Encoded JWT ID Token: " + response.credential);
  
  const userInfo = parseJwt(response.credential);
  console.log("User Info:", userInfo);
  
  if (userInfo.email.endsWith("@vhhscougars.org")) {
    console.log("Login successful:", userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "dashboard.html";
  } else {
    alert("Only @vhhscougars.org emails are allowed.");
  }
}

function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')));
}
