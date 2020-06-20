<?php
declare(strict_types=1);

use ElliotJReed\Exception\Form;
use ElliotJReed\ProcessForm;
use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    \header("Location: https://trentvineyard.elliotjreed.com");
    exit();
}

\header('Content-Type: application/json');

require __DIR__ . '/../vendor/autoload.php';

(Dotenv\Dotenv::create(__DIR__ . '/..'))->load();

try {
    echo \json_encode((new ProcessForm(new PHPMailer(true)))->process($_POST));
} catch (Form $exception) {
    echo \json_encode($exception->getMessage());
}
