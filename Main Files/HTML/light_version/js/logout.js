// Get a reference to the Logout link
const logoutLink = document.getElementById('logout-link');

// Add a click event listener to the Logout link
logoutLink.addEventListener('click', function(event) {
  // Prevent the default link behavior (i.e., following the href attribute)
  event.preventDefault();
  
  // Remove the idToken from localStorage
  localStorage.removeItem('idToken');
  
  // Redirect the user to the index.html page
  window.location.href = "index.html";
});
