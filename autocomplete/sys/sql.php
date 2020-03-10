<?php // Simulador de Select
	
	$cliente  = (isset($_GET['cliente']))  ? $_GET['cliente']  : "";
	$unidade  = (isset($_GET['unidade']))  ? $_GET['unidade']  : "";
	$consulta = (isset($_GET['consulta'])) ? $_GET['consulta'] : "";
	$response = array();

	$unidades = [
		0 => [ "id" => 0, "nome_unidade" => "Unidade Campinas"            ],
		1 => [ "id" => 1, "nome_unidade" => "Unidade Sao Paulo"           ],
		2 => [ "id" => 2, "nome_unidade" => "Unidade Sao Jose dos Campos" ],
		3 => [ "id" => 3, "nome_unidade" => "Unidade Taubate"             ],
		4 => [ "id" => 4, "nome_unidade" => "Unidade Cacapava"            ]
	];

	$clientes = [
		0 => [ "nome_cliente" => "Empresa de Telecom",     "unidade"  => 1 ],
		1 => [ "nome_cliente" => "Negocios e Tecnologia",  "unidade"  => 0 ],
		2 => [ "nome_cliente" => "Desenvolvedores PHP",    "unidade"  => 2 ],
		3 => [ "nome_cliente" => "WePack Desenvolvedores", "unidade"  => 0 ],
		4 => [ "nome_cliente" => "Nova Empresa Webdev",    "unidade"  => 1 ],
		5 => [ "nome_cliente" => "Empresa Devel PHP",      "unidade"  => 1 ],
		6 => [ "nome_cliente" => "Tecnologia Web Plus PHP","unidade"  => 0 ],
		7 => [ "nome_cliente" => "Joticode Desenvolvimento", "unidade"  => 2 ],
		8 => [ "nome_cliente" => "Webmaster Developers",   "unidade"  => 2 ],
		9 => [ "nome_cliente" => "Negocios Web PHP Mysql", "unidade"  => 1 ]
	];
	// Simulanado uma consulta SQL SELECT
	if($unidade != "" && $cliente == "" && $consulta == "") {
		if($unidade == "%%%") {
			$response = $unidades;
		} else {
			for($i = 0; $i < count($unidades); $i++) {
				if(stristr($unidades[$i]["nome_unidade"], $unidade)) {
					array_push($response, $unidades[$i]);
				}
			}
		}
	}
	// Simulanado uma consulta SQL SELECT com o uso do JOIN
	if($unidade != "" && $cliente != "" && $consulta == "") {
		if($cliente == "%%%") {
			for($i = 0; $i < count($clientes); $i++) {
				if($clientes[$i]["unidade"] == $unidade) {
					array_push($response, array_merge($clientes[$i], $unidades[$clientes[$i]["unidade"]]));
				}
			}
		} else {
			for($i = 0; $i < count($clientes); $i++) {
				if( stristr($clientes[$i]["nome_cliente"], $cliente) && ($clientes[$i]["unidade"] == $unidade) ) {
					array_push($response, array_merge($clientes[$i], $unidades[$clientes[$i]["unidade"]]));
				}
			}
		}
	}
	// Simulando a consulta dos registros do cliente
	if($consulta != "") {
		echo json_encode([
			"response" => "Consulta realizada com sucesso",
			"unidade"  => $consulta,
			"cliente"  => $cliente,
			"dados"    => "Dados do cliente"
		]);
	} else {
		echo json_encode($response);
	}

?>