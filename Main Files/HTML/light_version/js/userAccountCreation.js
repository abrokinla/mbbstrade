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
  // const transPin = document.getElementById("transPin").value;
  // const confirmTransPin = document.getElementById("confirmTransPim").value;

  // Compare the password and confirm password
  if (password !== confirmPassword) {
    console.log("Password do not match");
    // console.error("Password do not match");
    return;
  }
  // Compare the trans-pin and confirm trans-pin
  // if (transPin !== confirmTransPin) {
  //   console.log("Transaction Pin do not match");
  //   return;
  // }

  // Create a new user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      user.sendEmailVerification().then(function() {
      // Email sent
      console.log("Email verification sent");
      alert("User created successfully. Please check your email to verify your account.");      
      window.location.href = "register.html";
    }).catch(function(error) {
      // An error happened
      console.error("Error sending email verification:", error);
      alert("Error sending email verification: " + error.message);
    });       
      
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      alert("Error creating user: " + errorMessage);
    });
  });
