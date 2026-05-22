<?php
// Temporary script to trigger CakePHP migrations on Railway

$cakeBin = dirname(__DIR__) . '/bin/cake.php';
$output = [];
$returnVar = 0;

// Execute the migration command
exec("php $cakeBin migrations migrate 2>&1", $output, $returnVar);

echo "<html><head><title>Database Migration</title></head><body style='font-family:sans-serif; padding: 20px;'>";
echo "<h1>Database Migration Status: " . ($returnVar === 0 ? "<span style='color:green;'>SUCCESS</span>" : "<span style='color:red;'>FAILED</span>") . "</h1>";
echo "<h3>Console Output:</h3>";
echo "<pre style='background:#f4f4f4; padding:15px; border-radius:5px; border:1px solid #ddd;'>" . implode("\n", $output) . "</pre>";
echo "</body></html>";
