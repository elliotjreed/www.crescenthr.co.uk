<?php

declare(strict_types=1);

namespace ElliotJReed\Tests;

use ElliotJReed\Exception\EmailOrTelephoneRequired;
use ElliotJReed\Exception\NameRequired;
use ElliotJReed\ProcessForm;
use PHPUnit\Framework\TestCase;

final class ProcessFormTest extends TestCase
{
    public function testItInsertsSendEmail(): void
    {
        $_ENV['SMTP_HOST'] = 'smtp.example.com';
        $_ENV['SMTP_USERNAME'] = 'smtp@example.com';
        $_ENV['SMTP_PASSWORD'] = 'password';
        $_ENV['SMTP_PORT'] = 567;
        $_ENV['SMTP_FROM_EMAIL'] = 'from@example.com';
        $_ENV['SMTP_FROM_NAME'] = 'Crescent HR Contact Form';
        $_ENV['SMTP_SUBJECT'] = 'Message received via Crescent HR contact form';
        $_ENV['SMTP_TO_EMAIL'] = 'to@example.com';
        $_ENV['SMTP_TO_NAME'] = 'Miss To';

        $mailerSpy = new MailerSpy();
        $process = (new ProcessForm($mailerSpy))->process([
            'name' => 'Mrs Name',
            'email' => 'mrs.name@example.com',
            'phone' => '0115 123 4567',
            'message' => 'Hello I would like to contact you.',
            'preferredMethod' => 'phone'
        ]);

        $this->assertTrue($process);
        $this->assertTrue($mailerSpy->sendCalled);

        $this->assertSame('from@example.com', $mailerSpy->From);
        $this->assertSame('Crescent HR Contact Form', $mailerSpy->FromName);
        $this->assertSame('smtp.example.com', $mailerSpy->Host);
        $this->assertTrue($mailerSpy->SMTPAuth);
        $this->assertSame('smtp@example.com', $mailerSpy->Username);
        $this->assertSame('password', $mailerSpy->Password);
        $this->assertSame('ssl', $mailerSpy->SMTPSecure);
        $this->assertSame(567, $mailerSpy->Port);
        $this->assertSame('text/html', $mailerSpy->ContentType);
        $this->assertSame('Message received via Crescent HR contact form', $mailerSpy->Subject);
        $this->assertStringContainsString('<strong>Name:</strong> Mrs Name<br>', $mailerSpy->Body);
        $this->assertStringContainsString('<strong>Email Address:</strong> mrs.name@example.com<br>', $mailerSpy->Body);
        $this->assertStringContainsString('<strong>Telephone:</strong> 0115 123 4567<br>', $mailerSpy->Body);
        $this->assertStringContainsString('Hello I would like to contact you.', $mailerSpy->Body);
        $this->assertSame(
            'Name: Mrs Name' . "\r\n" .
            'Email: mrs.name@example.com' . "\r\n" .
            'Phone: 0115 123 4567' . "\r\n" .
            'Preferred Contact Method: phone' . "\r\n\r\n" .
            'Hello I would like to contact you.',
            $mailerSpy->AltBody
        );
        $this->assertSame('', $mailerSpy->ErrorInfo);
    }

    public function testItReturnsFalseOnMailerException(): void
    {
        $_ENV['SMTP_HOST'] = 'smtp.example.com';
        $_ENV['SMTP_USERNAME'] = 'smtp@example.com';
        $_ENV['SMTP_PASSWORD'] = 'password';
        $_ENV['SMTP_PORT'] = 567;
        $_ENV['SMTP_FROM_EMAIL'] = 'from@example.com';
        $_ENV['SMTP_FROM_NAME'] = 'Crescent HR Contact Form';
        $_ENV['SMTP_SUBJECT'] = 'Message received via Crescent HR contact form';
        $_ENV['SMTP_TO_EMAIL'] = 'to@example.com';
        $_ENV['SMTP_TO_NAME'] = 'Miss To';

        $mailerSpy = new MailerSpy();
        $mailerSpy->throwException = true;
        $process = (new ProcessForm($mailerSpy))->process([
            'name' => 'Mrs Name',
            'email' => 'mrs.name@example.com',
            'phone' => '0115 123 4567',
            'message' => 'Hello I would like to contact you.',
            'preferredMethod' => 'phone'
        ]);

        $this->assertFalse($process);
        $this->assertTrue($mailerSpy->sendCalled);
    }

    public function testItThrowsExceptionOnEmptyName(): void
    {
        $this->expectException(NameRequired::class);

        (new ProcessForm(new MailerSpy()))->process([
            'name' => '',
            'email' => 'mrs.name@example.com',
            'phone' => '0115 123 4567',
            'message' => 'Hello I would like to contact you.',
            'preferredMethod' => 'phone'
        ]);
    }

    public function testItThrowsExceptionOnEmptyPhoneAndEmail(): void
    {
        $this->expectException(EmailOrTelephoneRequired::class);

        (new ProcessForm(new MailerSpy()))->process([
            'name' => 'Mrs Name',
            'email' => '',
            'phone' => '',
            'message' => 'Hello I would like to contact you.',
        ]);
    }
}
