<?php

declare(strict_types=1);

namespace ElliotJReed\Exception;

use Exception;

final class NameRequired extends Exception implements Form
{
    protected $message = 'Please provide your name.';
}
