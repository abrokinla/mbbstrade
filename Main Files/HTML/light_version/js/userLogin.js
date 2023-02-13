// initialize firebase
firebase.initializeApp(firebaseConfig);
// Get the submit div
const loginDiv = document.querySelector(".login_btn a");
// Click event listener to the submit div
loginDiv.addEventListener("click", function(e) {
  // Prevent the default link behavior
  e.preventDefault();
  // Create a new user account
  // Get the email and password from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("pword").value;

  function showFlashNotification(message) {
    var notification = document.createElement("div");
    notification.innerHTML = message;
    notification.style.backgroundColor = "#d9edf7";
    notification.style.color = "#31708f";
    notification.style.padding = "15px";
    notification.style.position = "fixed";
    notification.style.top = "0";
    notification.style.left = "0";
    notification.style.right = "0";
    notification.style.textAlign = "center";
    document.body.appendChild(notification);
  
    setTimeout(function() {
      notification.style.display = "none";
    }, 3000);
  }
  
  // Sign in the user with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log("User signed in:", user);
      showFlashNotification("verification successful")      
      // Redirect the user to the home page or another page as desired
      window.location.href = "my_account.html";
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      showFlashNotification("Error creating user: " + errorMessage);
      // Show an error message to the user
    });
});