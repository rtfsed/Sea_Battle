<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "BattleSea";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Запрос к базе данных для получения последнего значения
$sql = "SELECT * FROM `moves` ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    $row = $result->fetch_assoc();
    $move = $row['move'];
    $start = $row['start'];
    $data = array(
        'move' => $move,
        'start' => $start
    );
    echo json_encode($data);
}
else {
    echo "0 results";
}
$conn->close();
    ?>