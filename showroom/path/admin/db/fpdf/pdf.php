<?php

require('fpdf.php');




$recibo = $_POST['recimp'];
$bigarray = $_POST['bigarray'];
$totalventa = $_POST['totalventa'];
$todayDate = $_POST['todayDate'];
// Column headings
$header = array('ID', 'Nombre', 'Proveedor', 'P/U','Cantidad','Descuento','Total');
//RECIBO
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Courier','',12);
$pdf->SetXY(5.0,5.0);
$pdf->Image('mainlogo.png',5,10,-300);

//header recibo
$pdf->SetXY(60.0,15.0);
$pdf->Cell(40,10,"Rosa Mexicano",10,10);
$pdf->SetXY(60.0,20.0);
$pdf->Cell(40,10,iconv('UTF-8', 'windows-1252', "Dirección de la tienda"),10,10);
$pdf->SetXY(60.0,25.0);
$pdf->Cell(40,10,"Nota de venta",10,10);

//nota
$pdf->SetXY(10.0,50.0);
$pdf->Cell(40,10,"Recibo #: ".$recibo,10,10);
$pdf->SetXY(10.0,55.0);
$pdf->Cell(40,10,"Total de venta: ".$totalventa,10,10);
$pdf->SetXY(10.0,60.0);
$pdf->Cell(40,10,"Fecha: ".$todayDate,10,10);
$x = 30;
$y = 10;
$pdf->SetFontSize(10);
$pdf->SetXY(10.0,70.0);
	for ($i = 0; $i < count($header); $i++)  {
			if($i == 0){
				$pdf->Cell(15,$y,$header[$i],0,0,'C'); 
			}else if($i == 1){
				$pdf->Cell(75,$y,$header[$i],0,0,'C'); 
	        }else if($i == 2){
				continue; 
	        }else{
	        	$pdf->Cell(20,$y,$header[$i],0,0,'C'); 
	        }
			}
	

$pdf->Ln();
foreach ($bigarray as $valor) {
	for ($i = 0; $i < count($valor); $i++)  {
			if($i == 0){
				$pdf->Cell(15,$y,$valor[$i],0,0,'C'); 
			}else if($i == 1){
				$pdf->Cell(75,$y,$valor[$i],0,0,'C'); 
	        }else if($i == 2){
				continue; 
	        }else{
	        	$pdf->Cell(20,$y,$valor[$i],0,0,'C'); 
	        }
			}
  
   $pdf->Ln();
}
$pdf->Output();

$pdf->Output('../recibos/Recibo'.$recibo.'.pdf','F');


?>

