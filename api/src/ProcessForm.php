<?php

declare(strict_types=1);

namespace ElliotJReed;

use ElliotJReed\Exception\EmailOrTelephoneRequired;
use ElliotJReed\Exception\NameRequired;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

final class ProcessForm
{
    private $mailer;

    public function __construct(PHPMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function process(array $formData): bool
    {
        $this->ensureRequiredDataIsPresent($formData);

        try {
            $this->mailer->isSMTP();
            $this->mailer->Host = $_ENV['SMTP_HOST'];
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $_ENV['SMTP_USERNAME'];
            $this->mailer->Password = $_ENV['SMTP_PASSWORD'];
            $this->mailer->SMTPSecure = 'ssl';
            $this->mailer->Port = (int) $_ENV['SMTP_PORT'];

            $this->mailer->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
            $this->mailer->addAddress($_ENV['SMTP_TO_EMAIL'], $_ENV['SMTP_TO_NAME']);

            $template = new \SplFileObject(__DIR__ . '/templates/contact_email.html');

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $_ENV['SMTP_SUBJECT'];
            $this->mailer->Body = $this->buildMessageBody($formData, $template->fread($template->getSize()));
            $this->mailer->AltBody = $this->buildAltMessageBody($formData);

            return $this->mailer->send();
        } catch (Exception $e) {
            \error_log($this->mailer->ErrorInfo);
            \error_log($e->getMessage());

            return false;
        }
    }

    private function sanitiseEmail(?string $string): string
    {
        return $this->sanitise(\htmlspecialchars($string ?: ''));
    }

    private function sanitise(?string $string): string
    {
        return \trim(\strip_tags($string ?: ''));
    }

    private function ensureRequiredDataIsPresent(array $formData): void
    {
        if (empty($formData['name'])) {
            throw new NameRequired();
        }

        if (empty($formData['email']) && empty($formData['phone'])) {
            throw new EmailOrTelephoneRequired();
        }
    }

    private function buildMessageBody(array $formData, string $content): string
    {
        $preferredMethod = 'email';
        if (isset($formData['preferredMethod']) && $formData['preferredMethod'] === 'phone') {
            $preferredMethod = 'telephone';
        }
        $messageBody = \str_replace('FORMMESSAGEBODYCONTENT', $this->sanitiseEmail($formData['message']), $content);
        $messageBody = \str_replace('FORMMESSAGENAME', $this->sanitiseEmail($formData['name']), $messageBody);
        $messageBody = \str_replace('FORMMESSAGEPHONE', $this->sanitiseEmail($formData['phone']), $messageBody);
        $messageBody = \str_replace('FORMMESSAGEEMAIL', $this->sanitiseEmail($formData['email']), $messageBody);
        $messageBody = \str_replace('FORMMESSAGEPREFERREDMETHOD', $preferredMethod, $messageBody);

        return $messageBody;
    }

    private function buildAltMessageBody(array $formData): string
    {
        return 'Name: ' . $this->sanitiseEmail($formData['name']) . "\r\n" .
               'Email: ' . $this->sanitiseEmail($formData['email']) . "\r\n" .
               'Phone: ' . $this->sanitiseEmail($formData['phone']) . "\r\n" .
               'Preferred Contact Method: ' . $this->sanitiseEmail($formData['preferredMethod']) . "\r\n\r\n" .
               $this->sanitiseEmail($formData['message']);
    }
}
