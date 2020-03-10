<?php
	
	$busca    = $_GET['busca'];
	$response = array();

	$clientes = [
		0 => [
			"response" => "Empresa de Telecom"
		],
		1 => [
			"response" => "Negocios e Tecnologia"
		],
		2 => [
			"response" => "Desenvolvedores PHP"
		],
		3 => [
			"response" => "WePack Desenvolvedores"
		],
		4 => [
			"response" => "Nova Empresa Web"
		]
	];

	for($i = 0; $i < count($clientes); $i++) {
		if(stristr($clientes[$i]["response"], $busca)) {
			array_push($response, $clientes[$i]);
		}
	}

	echo json_encode($response);

?>