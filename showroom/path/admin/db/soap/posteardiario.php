<?php
ini_set("display_errors", 1);
ini_set("include_path", '/home/bcf2stt2aznm/php:' . ini_get("include_path") );
header('Content-Type: text/html; charset=utf-8');
header("Content-type: text/javascript; charset=utf-8");
date_default_timezone_set('America/Monterrey'); 
$cad = $_POST["xmlssc"];
$JRNAL_SRCE = $_POST["source"];
$pass = $_POST["pass"];


	
	ini_set("soap.wsdl_cache_enabled", "0");
	   ini_set('soap.wsdl_cache_ttl',0);
	   ini_set('soap.wsdl_cache_enabled',0);
	   $context = stream_context_create([
	     'ssl' => [
	       'verify_peer' => false,
	       'verify_peer_name' => false,
	       'allow_self_signed' => true,
	       'header' => 'Content-Type: application/soap+xml'
	     ],
	     'http' => [
	       'header' => 'Content-Type: application/soap+xml'
	     ],
	     'https' => [
	       'header' => 'Content-Type: application/soap+xml'
	     ]
	   ]);
	   
	  
	   $urlSoap = "http://localhost:8080/connect/wsdl/SecurityProvider?wsdl";

	   $client = new SoapClient("http://localhost:8080/connect/wsdl/SecurityProvider?wsdl", array (
	   "trace" => 1,
	   "exceptions" => 0));

	   $params = array(
	     "name" => $JRNAL_SRCE,
	     "password" => "asd123"
	   );

	   $voucher = $client->__soapCall("Authenticate", array($params));
	   $string = json_encode($voucher);
	   $json = json_decode($string, true);
	  //var_dump($client->__getLastRequest());
	 $strVoucher = $json['response'];
	 //echo $strVoucher;

	   $client1 = new SoapClient("http://localhost:8080/connect/wsdl/ComponentExecutor?wsdl", array (
	   "trace" => 1,
	   "exceptions" => 0));

	   $params1 = array(
	     		"authentication"=> $strVoucher,
				"licensing"=> "",
				"component" => "Journal",
				"method" => "Import",
				"group" => "",
				"payload" => $cad
	   );

	   $diario = $client1->__soapCall("Execute", array($params1));
	   $string1 = json_encode($diario);
	   $resp = json_decode($string1, true);
	   $respxml = $resp['response'];
	   $xml = simplexml_load_string($respxml);
	  
	  $jrnalnumero = $xml->Payload->Ledger->Line[0]->JournalNumber;
	  $userText = $xml->xpath('//UserText');
	  $i = "";
	 while(list( , $nodo) = each($userText)) {
	 	
	$i = $i. 'Error: '.$nodo.'<br>';
	    
	 }
	 if($jrnalnumero != ""){
	 	echo $jrnalnumero;
	 }else{
	 	
	 	echo $i;
	 	//print_r($userText);
	 	
	 }
	 //print_r ($userText);
	  exit();






?>