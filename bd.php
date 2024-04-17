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
$id = $data['id'];
$pass = $data['pass'];
$plaer = $data['plaer'];
$poshta = $data['poshta'];

$result = $conn->query("INSERT INTO `users` (Dati,Pass,Plaer,Poshta) VALUES ('$id','$pass','$plaer','$poshta')");
$conn->close();

?>