<?php
// Establish a connection to the database
$servername = "localhost:3306";
$username = "mmbstrad_mmbstrad";
$password = "123ADEabraham";
$dbname = "mmbstrad_mmbstradedb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the user ID from the session storage
session_start();
$user_id = $_SESSION['user_id'];

// Fetch the transactions from the database
$sql = "SELECT * FROM transactions WHERE user_id = $user_id";
$result = $conn->query($sql);

// Generate the table rows
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr class='background_white'>";
        echo "<td><div class='media cs-media'><div class='media-body'><h5>" . $row['id'] . "</h5></div></div></td>";
        echo "<td><div class='pretty p-svg p-curve'>" . $row['amount'] . "</div></td>";
        echo "<td><div class='pretty p-svg p-curve'>" . $row['trans_desc'] . "</div></td>";
        echo "<td><div class='pretty p-svg p-curve'>" . $row['payment_mode'] . "</div></td>";
        echo "<td class='flag'><div class='pretty p-svg p-curve'>" . $row['payment_date'] . "</div></td>";
        echo "<td><nav class='navbar navbar-expand'><ul class='navbar-nav'><li class='nav-item dropdown'>";
        echo "<a class='nav-link dropdown-toggle' href='#' data-toggle='dropdown'><i class='fa fa-ellipsis-v'></i></a>";
        echo "<div class='dropdown-menu'><a class='dropdown-item' href='#'>Edit</a><a class='dropdown-item' href='#'>Delete</a></div></li></ul></nav></td>";
        echo "</tr>";
    }
} else {
    echo "No transactions found";
}

// Close the database connection
$conn->close();
?>
