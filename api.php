<?php

require_once 'jsonRPCClient.php';
require_once 'config.php';

$bitcoin = new jsonRPCClient($connection_url);

header('Content-Type: application/json');
echo json_encode([
    'balance' => $bitcoin->getbalance(),
    'transactions' => $bitcoin->listtransactions()
]);
