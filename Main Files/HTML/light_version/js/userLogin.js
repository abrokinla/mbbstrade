// initialize firebase
firebase.initializeApp(firebaseConfig);

// Get the submit div
const loginDiv = document.querySelector(".login_btn a");

// Click event listener to the submit div
loginDiv.addEventListener("click", function(e) {
  // Prevent the default link behavior
  e.preventDefault();

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
      showFlashNotification("Verification successful");
      
      // Fetch data from fetchData.php using the email address
      const fetchDataURL = `fetchData.php?email=${email}`;
      
      $.ajax({
        url: fetchDataURL,
        type: "GET",
        success: function(data) {
          console.log(data);
          // Redirect the user to the all_transactions.html page and pass the data to the page
          // window.location.href = `all_transactions.html?data=${data}`;
        },
        error: function(error) {
          console.error(error);
          showFlashNotification("Error fetching data: " + error);
        }
      });
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error("Error authenticating user:", errorCode, errorMessage);
      showFlashNotification("Error authenticating user: " + errorMessage);
      // Show an error message to the user
    });
});
