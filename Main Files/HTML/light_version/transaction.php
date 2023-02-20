<?php

// Get the data from the POST request
$user_id = $_POST['user_id'];
$amount = $_POST['amount'];
$description = $_POST['description'];
$payment_mode = $_POST['payment_mode'];
$payment_date = $_POST['payment_date'];
$transaction_ref = $_POST['transaction_ref'];

// Connect to your database
$servername = "localhost:3306";
$username = "mmbstrad_mmbstrad";
$password = "123ADEabraham";
$dbname = "mmbstrad_mmbstradedb";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Insert the data into your transaction table
$sql = "INSERT INTO transaction (user_id, trans_desc, payment_mode, payment_date, transaction_ref, amount)
VALUES ('$user_id', '$description', '$payment_mode', '$payment_date', '$transaction_ref', '$amount')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

?>
