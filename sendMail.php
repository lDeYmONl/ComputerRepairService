<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$success = false;
try {

    if (!filter_var($email_a, FILTER_VALIDATE_EMAIL) && empty($_POST['mPhone'])) {
        echo json_encode(['success' => false]);
    }
    
    $mail->setFrom('argonautt99@gmail.com');

    $mail->addAddress('argonautt99@gmail.com');

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Сервісний центр Reset!';
    if (isset($_POST['mPhone'])) {
        $mail->Body = 'Ім\'я: ' . $_POST['mName'] . '; Телефон: ' . $_POST['mPhone'] . ';';
    } else {
        $mail->Body = 'ФІО: ' . $_POST['surname'] . ' ' . $_POST['name'] . ';\n E-mail: ' . $_POST['email'] . '; Телефон: ' . $_POST['phone-number'] . ';\n Повідомлення: ' . $_POST['message'] . ';';
    }
    $mail->send();
    echo json_encode(['success' => true]);

} catch (Exception $e) {

    echo json_encode(['success' => false]);

}

?>