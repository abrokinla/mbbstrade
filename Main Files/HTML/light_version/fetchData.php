<?php
  header("Content-Type: application/json; charset=UTF-8");

  $servername = "localhost:3306";
  $username = "mmbstrad_mmbstrad";
  $password = "123ADEabraham";
  $dbname = "mmbstrad_mmbstradedb";

  // Connect to the database
  $db = mysqli_connect($servername, $username, $password, $dbname);

  // Check connection
  if (mysqli_connect_errno()) {
      printf("Connect failed: %s\n", mysqli_connect_error());
      exit();
  }

  // Get the email address from the request
  $email = $_REQUEST["email"];

  // Fetch the data from the user table that matches the email address
  $fetch_data = "SELECT * FROM user WHERE email='$email'";
  $result = mysqli_query($db, $fetch_data);
  $data = mysqli_fetch_assoc($result);

  // Return the result as a JSON object
  echo json_encode($data);
?>
