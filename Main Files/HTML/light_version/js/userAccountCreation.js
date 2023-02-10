// initialize firebase
firebase.initializeApp(firebaseConfig);

// Get the submit div
const submitDiv = document.querySelector(".register_btn a");
// Click event listener to the submit div
submitDiv.addEventListener("click", function(e) {
  // Prevent the default link behavior
  e.preventDefault();
  // Create a new user account
  // Get the email and password from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const transPin = document.getElementById("transPin").value;
  const confirmTransPin = document.getElementById("confirmTransPim").value;

  // Compare the password and confirm password
  if (password !== confirmPassword) {
    console.log("Password do not match");
    // console.error("Password do not match");
    return;
  }
  // Compare the trans-pin and confirm trans-pin
  if (transPin !== confirmTransPin) {
    console.log("Transaction Pin do not match");
    // console.error("Password do not match");
    return;
  }

  // Create a new user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log("User created:", user);
      // Get the other form fields
      const refname = document.getElementById("refname").value;
      const first_name = document.getElementById("first_name").value;
      const last_name = document.getElementById("last_name").value;
      const username = document.getElementById("username").value;
      const transPin = document.getElementById("transPin").value;
      const country = document.getElementById("country").value;
      // Get the current user
      const currentUser = firebase.auth().currentUser;
      // Save the user data to the Firebase Realtime Database
      firebase.database().ref("users/" + currentUser.uid).set({
        refname: refname,
        first_name: first_name,
        email: email,
        last_name:last_name,
        username:username,
        transPin:transPin,
        country: country
      })
      .then(function() {
        console.log("User data saved to the database");
      })
      .catch(function(error) {
        console.error("Error saving user data:", error);
      });
    })
    .catch(function(error) {
      console.error("Error creating user:", error);
    });
  });
