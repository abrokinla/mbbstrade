<?php
$servername = "localhost:3306";
$username = "mmbstrad_mmbstrad";
$password = "123ADEabraham";
$dbname = "mmbstrad_mmbstradedb";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve the form data
$ref_name = $_POST['refname'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$username = $_POST['username'];
$password = $_POST['pword'];
$trans_pin = $_POST['transPin'];
$email = $_POST['email'];
$country = $_POST['country'];

// Insert the data into the database
$sql = "INSERT INTO user (referal_name, first_name, last_name, username, pword, transpIn, email, country)
VALUES ('$ref_name', '$first_name', '$last_name', '$username', '$password', '$trans_pin', '$email', '$country')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
