#!/usr/bin/env php
<?php

$srcFile  = isset( $argv[1] ) ? $argv[1] : 'raw.html';
$destFile = isset( $argv[2] ) ? $argv[2] : 'index.html';

echo "$srcFile > $destFile\n";

$content = file_get_contents($srcFile);
$pattern = "!<link rel=\"import\" href=\".*?\">!";
$matches = array();

while (preg_match($pattern, $content, $matches)) {

    $searched    = $matches[0];
    $htmlFile    = str_replace( "<link rel=\"import\" href=\"", "", str_replace( "\">", "", $matches[0] ) );
    $replacement = file_get_contents( $htmlFile );

    echo "replacement for $htmlFile\n";
    $content = str_replace( $searched, $replacement, $content );

    $matches = array();
}

file_put_contents( $destFile, $content );

?>