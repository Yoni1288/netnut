<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$host = 'mysql';
$user = 'MYSQL_USER';
$pass = 'MYSQL_PASSWORD';

// Create connection
$conn = mysqli_connect($host, $user, $pass, 'MYSQL_DATABASE');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$phpdatabase = "CREATE TABLE IF NOT EXISTS Translations (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    toLang VARCHAR(50) NOT NULL,
    translation VARCHAR(300))";
     
mysqli_query( $conn,$phpdatabase);

if ($_POST){
    http_response_code(200);  
    $to = $_POST['to'];
    $translate = $_POST['translate'];
    $sql = "SELECT * FROM Translations where toLang = '$to' and translation = '$translate'";
    $result = $conn->query($sql);
    $rowcount = $result->num_rows;
    if($rowcount > 0){
        $firstrow = mysql_fetch_assoc($result);
        echo json_encode(
            [
               "success" => true,
               "message" => $firstrow['translation'],
            ]
        );
    }
    else{
        $node = file_get_contents("http://node:4000/?target=".$to."&text=".$translate);
        $json = json_decode($node, true);

        if($json['success'] === true){
            $text = $json['message'];
            $insert = "INSERT INTO Translations (toLang, translation) VALUES ($to, $text)";
            
            if(mysqli_query($conn, $sql)){
                echo json_encode(
                    [
                       "success" => true,
                       "message" => $text,
                    ]
                );
            } else{
                echo json_encode(
                    [
                       "success" => false,
                       "message" => '',
                    ]
                );
            }

        }
        
        

    }

} else {

 echo json_encode(
     [
        "sent" => false,
     ]
 );
 mysqli_close($conn);
}