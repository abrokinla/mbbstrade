<?php
  header("Content-Type: application/json; charset=UTF-8");
  // Start the session
  session_start();
  
  // Enable error reporting
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Establish a connection to the database
  $servername = "localhost:3306";
  $username = "mmbstrad_mmbstrad";
  $password = "123ADEabraham";
  $dbname = "mmbstrad_mmbstradedb";

  $connection = mysqli_connect($servername, $username, $password, $dbname);

  // Check connection
  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

  // Check if the user_id is set in the session storage
  if(isset($_SESSION['userid'])) {
    // Get the user_id from the session storage
    $user_id = $_SESSION['userId'];

    // Prepare and execute the SQL query to select the investments for the user
    $sql = "SELECT * FROM investment WHERE user_id = '$user_id'";
    $result = mysqli_query($connection, $sql);

    // Check if the query returned any rows
    if(mysqli_num_rows($result) > 0) {
      $data = array();

      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }

      // Return the result as a JSON object
      echo json_encode($data);
    } else {
      // No rows were returned
      echo "No investments found for user with ID: " . $user_id;
    }
  } else {
    // User ID is not set in the session storage
    echo "User ID not found in session storage.";
  }

  // Close the database connection
  mysqli_close($connection);
?>
