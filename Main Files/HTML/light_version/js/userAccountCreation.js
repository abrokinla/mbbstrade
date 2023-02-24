// initialize firebase
firebase.initializeApp(firebaseConfig);

// Get the submit div
const submitDiv = document.querySelector(".register_btn a");
// Click event listener to the submit div
submitDiv.addEventListener("click", function(e) {
  // Prevent the default link behavior
  e.preventDefault();
  // Create a new user account
  // Get the submit div
const submitDiv = document.querySelector(".register_btn a");

// Click event listener to the submit div
submitDiv.addEventListener("click", function(e) {
  // Prevent the default link behavior
  e.preventDefault();

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

  

  // Get the form data
  const ref_name = document.getElementById("ref_name").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("pword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const transPin = document.getElementById("transPin").value;
  const confirmTransPin = document.getElementById("confirmTransPin").value;
  const email = document.getElementById("email").value;
  const country = document.getElementById("country").value;

  // Compare the password and confirm password
  if (password !== confirmPassword) {
    showFlashNotification("Password do not match");
    // console.error("Password do not match");
    return;
  }

  // Compare the trans-pin and confirm trans-pin
  if (transPin !== confirmTransPin) {
    showFlashNotification("Transaction Pin do not match");
    return;
  }

  // Make an AJAX request to the server
  $.ajax({
    url: "check_email.php",
    type: "GET",
    data: { email: email },
    dataType: "json",
    success: function(result) {
      if (result.email_exists) {
        // The email address already exists
        showFlashNotification("Email already exists, login to account.");
      } else {
        // The email address is available, you can proceed with the registration process
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/submit.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
          }
        };
        xhr.send("ref_name=" + ref_name + "&first_name=" + first_name + "&last_name=" + last_name + "&username=" + username + "&password=" + password + "&transPin=" + transPin + "&email=" + email + "&country=" + country);
      }
    }
  });



  
  firebase.auth().fetchSignInMethodsForEmail(email)
  .then(function(signInMethods) {
    if (signInMethods.length > 0) {
      showFlashNotification('An account already exists for this email address.');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {      
        showFlashNotification('User account created successfully.')
        window.location = "login.html"   
      })        
       .catch(function(error) {
        // An error happened
        let errorCode = error.code;
        let errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
        showFlashNotification("Error creating user: " + errorMessage)        
      });
  })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      showFlashNotification("Error creating user: " + errorMessage);
    });
  });

  });
