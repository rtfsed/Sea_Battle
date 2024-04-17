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
$sql = "SELECT * FROM `users` ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Возвращаем последнее значение в формате JSON
    $row = $result->fetch_assoc();
    $lastId = $row['Dati'];
    $pass = $row['Pass'];
    $attac = $row['Plaer'];
    $poshta = $row['Poshta'];
    if($attac!=0){
    $data = array(
        'id' => $lastId,
        'pass' => $pass,
        'plaer' => $attac,
        'poshta' => $poshta
    );
    echo json_encode($data);
}
} else {
    echo "0 results";
}
$conn->close();
?>
