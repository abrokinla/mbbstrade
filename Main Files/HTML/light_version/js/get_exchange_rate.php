<?php
$html = file_get_contents('https://www.x-rates.com/calculator/?from=USD&to=NGN&amount=1');
preg_match('/<span class="ccOutputTrail">\s+(.*?)\s+<\/span>/', $html, $match);
$exchange_rate = $match[1];
echo $exchange_rate;
?>
