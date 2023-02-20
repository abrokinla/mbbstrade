// Check if a token exists in sessionStorage
if (!sessionStorage.getItem('idToken')) {
    // If no token is found, redirect the user to the login page
    window.location.href = 'login.html';
  }
  