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
  const password = document.getElementById("password").value;
  
  // Sign in the user with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log("User signed in:", user);
      // Get the current user
      const currentUser = firebase.auth().currentUser;
      // Retrieve the user data from the Firebase Realtime Database
      firebase.database().ref("users/" + currentUser.uid).once("value")
        .then(function(snapshot) {
          const userData = snapshot.val();
          // Display the user's name on the dashboard
          const nameSpan = document.querySelector(".current span.hidden_xs_content");
          nameSpan.textContent = `Hi, ${userData.first_name}!`;
        })
        .catch(function(error) {
          console.error("Error retrieving user data:", error);
        });
      // Redirect the user to the home page or another page as desired
      window.location.href = "my_account.html";
    })
    .catch(function(error) {
      console.error("Error signing in:", error);
      // Show an error message to the user
    });
});