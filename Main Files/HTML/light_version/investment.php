<?php
// Get the user_id, inv_plan, amount, start_date, end_date, payment_method and approved from the POST data
$user_id = $_POST['user_id'];
$inv_plan = $_POST['inv_plan'];
$amount = $_POST['amount'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$payment_method = $_POST['payment_method'];
$approved = $_POST['approved'];

// Connect to your database using the appropriate credentials
$servername = "localhost:3306";
$username = "mmbstrad_mmbstrad";
$password = "123ADEabraham";
$dbname = "mmbstrad_mmbstradedb";

$connection = mysqli_connect($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($connection->connect_error) {
  die('Connection failed: ' . $connection->connect_error);
}

// Prepare and execute the SQL query to insert or update the data into the database
$sql = "INSERT INTO investment (user_id, inv_plan, amount, start_date, end_date, payment_method, approved)
        VALUES ('$user_id', '$inv_plan', '$amount', '$start_date', '$end_date', '$payment_method', '$approved')
        ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount)";

if ($connection->query($sql) === TRUE) {
  echo 'Investment successful';
} else {
  echo 'Error: ' . $sql . '<br>' . $connection->error;
}

// Close the database connection
$connection->close();

?>
