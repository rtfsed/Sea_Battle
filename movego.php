<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "BattleSea";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $database);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



$data = json_decode(file_get_contents('php://input'), true);
$move = $data['move'];
$start = $data['start'];

$result = $conn->query("INSERT INTO `moves` (move,start) VALUES ('$move','$start')");
$conn->close();

?>