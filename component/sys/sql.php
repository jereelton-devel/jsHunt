<?php // Simulador de Select	
	$nome     = (isset($_GET['nome']))     ? $_GET['nome']  : "";
	$consulta = (isset($_GET['consulta'])) ? $_GET['consulta'] : "";
	$response = array();

	$pessoas = [
		0 => [ "id" => 0, "nome" => "Maria dos Santos Silva" ],
		1 => [ "id" => 1, "nome" => "Joao Paulo de Assis"    ],
		2 => [ "id" => 2, "nome" => "Marcos Andrade Nunes"   ],
		3 => [ "id" => 3, "nome" => "Ana Goncalvez Moraes"   ],
		4 => [ "id" => 4, "nome" => "Paulo Henrique Silva"   ]
	];
	$dados_pessoas = [
		0 => [ "empresa" => "Empresa de Telecom",     "status"  => 1, "idade" => 36, "foto" => "Maria 3x4"  ],
		1 => [ "empresa" => "Negocios e Tecnologia",  "status"  => 0, "idade" => 28, "foto" => "Joao 3x4"   ],
		2 => [ "empresa" => "Desenvolvedores PHP",    "status"  => 1, "idade" => 25, "foto" => "Marcos 3x4" ],
		3 => [ "empresa" => "WePack Desenvolvedores", "status"  => 0, "idade" => 45, "foto" => "Ana 3x4"    ],
		4 => [ "empresa" => "Nova Empresa Webdev",    "status"  => 0, "idade" => 52, "foto" => "Paulo 3x4"  ]
	];
	if($nome != "" && $consulta == "") { // Simulanado uma consulta SQL SELECT
		if($nome == "%%%") {
			$response = $pessoas;
		} else {
			for($i = 0; $i < count($pessoas); $i++) {
				if(stristr($pessoas[$i]["nome"], $nome)) {
					array_push($response, $pessoas[$i]);
				}
			}
		}
	}
	if($nome != "" && $consulta != "") { // Simulando a consulta dos registros do cliente
		for($i = 0; $i < count($dados_pessoas); $i++) {
			if($nome == $i && stristr($pessoas[$i]["nome"], $consulta)) {
				for($f = 0; $f < 100; $f++) { //Para forçar mais registros
					array_push($response, array_merge($pessoas[$i], $dados_pessoas[$i]));
				}
			}
		}
	}
	echo json_encode($response);
?>