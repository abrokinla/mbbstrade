<?php
  header("Content-Type: application/json; charset=UTF-8");

    $servername = "localhost:3306";
    $username = "mmbstrad_mmbstrad";
    $password = "xxxxxxxxxx";
    $dbname = "mmbstrad_mmbstradedb";

  // Connect to the database
  $db = mysqli_connect("host", "username", "password", "database_name");
  
  // Check connection
  if (mysqli_connect_errno()) {
      printf("Connect failed: %s\n", mysqli_connect_error());
      exit();
  }

  // Get the email address from the request
  $email = $_REQUEST["email"];

  // Check if the email address already exists in the database
  $check_email = "SELECT * FROM users WHERE email='$email'";
  $result = mysqli_query($db, $check_email);
  $email_exists = mysqli_num_rows($result) > 0;

  // Return the result as a JSON object
  echo json_encode(array("email_exists" => $email_exists));
?>
