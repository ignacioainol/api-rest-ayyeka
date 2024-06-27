<?php
//comando cron: php -q /home/grupovis/public_html/sendDataDga.php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/Santiago');

/** Variables */
$deviceKey = '6361e18c7e02af000e73526b'; // (gvaralascruces)
$appToken = 'BBFF-4Pccg1gBWhxF4YAKtYjgj5J9CbA3Yx2ORfEqGava0RRE6SASxWudwGR';

$dataPool = json_decode(file_get_contents('http://206.189.192.118', true));
echo "<pre>";
print_r($dataPool);
exit();
/*$codObra = 'OB-0804-220';


$variables = [
    'flow' => '6363d793508ee902cbd188b2',
    'totalizer' => '636fe30e4829ec000bb2ea8f',
    'freatico' => '636812208c5a2f835da02beb'
];*/


$allData = [];
foreach ($variables as $key => $val) {
    $allData[] = json_decode(file_get_contents("https://industrial.api.ubidots.com/api/v2.0/devices/{$deviceKey}/variables/{$val}/?token={$appToken}"));
}

//Fecha
$today = date("d-m-Y");
$currentHour = date("H:i:s");

$epoch = $allData[0]->lastValue->timestamp;
$datePart = explode(" ", date('Y-m-d H:m:s', intval($epoch / 1000)));
$ISOFormated = "{$datePart[0]}T{$datePart[1]}Z";

$url = "https://snia.mop.gob.cl/controlextraccion/datosExtraccion/SendDataExtraccionService";
// $url = "https://snia.mop.gob.cl/controlextraccion/wsdl/datosExtraccion/SendDataExtraccionService";

$xmldata = '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:aut1="http://www.mop.cl/controlextraccion/xsd/datosExtraccion/AuthSendDataExtraccionRequest">
                    <x:Header>
                        <aut1:authSendDataExtraccionTraza>
                            <aut1:codigoDeLaObra>' . $codObra . '</aut1:codigoDeLaObra>
                            <aut1:timeStampOrigen>' . $ISOFormated . '</aut1:timeStampOrigen>
                        </aut1:authSendDataExtraccionTraza>
                    </x:Header>
                    <x:Body>
                        <aut1:authSendDataExtraccionRequest>
                            <aut1:authDataUsuario>
                                <aut1:idUsuario>
                                    <aut1:rut>16932658-4</aut1:rut>
                                </aut1:idUsuario>
                                <aut1:password>BZZQDEo9Qz</aut1:password>
                            </aut1:authDataUsuario>
                            <aut1:authDataExtraccionSubterranea>
                                <aut1:fechaMedicion>' . $today . '</aut1:fechaMedicion>
                                <aut1:horaMedicion>' . $currentHour . '</aut1:horaMedicion>
                                <aut1:totalizador>' . round($allData[1]->lastValue->value, 2) . '</aut1:totalizador>
                                <aut1:caudal>' . round($allData[0]->lastValue->value, 2) . '</aut1:caudal>
                                <aut1:nivelFreaticoDelPozo>' . round($allData[2]->lastValue->value, 2) . '</aut1:nivelFreaticoDelPozo>
                            </aut1:authDataExtraccionSubterranea>
                        </aut1:authSendDataExtraccionRequest>
                    </x:Body>
                </x:Envelope>';

 $ch = curl_init();
 if (!$ch) {
     die("Couldn't initialize a cURL handle");
 }
 curl_setopt($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 curl_setopt($ch, CURLOPT_TIMEOUT, 60);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
 curl_setopt($ch, CURLOPT_POSTFIELDS, $xmldata);
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
 $result = curl_exec($ch); // execute
 echo $result;             //show response
 curl_close($ch);
?>
