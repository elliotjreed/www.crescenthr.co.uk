<?php
declare(strict_types=1);

namespace ElliotJReed\Exception;

use Exception;

final class EmailOrTelephoneRequired extends Exception implements Form
{
    protected $message = 'Please provide an email address or telephone number.';
}
