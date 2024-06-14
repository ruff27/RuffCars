<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->car) &&
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->phone)
) {
    $query = "INSERT INTO payments (car, name, email, phone) VALUES (:car, :name, :email, :phone)";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(":car", $data->car);
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":phone", $data->phone);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Payment was successful."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to process payment."));
    }
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
  }
?>
