<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->message)
) {
    $query = "INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":message", $data->message);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Message sent successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to send message."));
    }
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
  }
?>
