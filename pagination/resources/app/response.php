<?php 

header("Content-Type: application/json");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jun 2015 05:00:00 GMT");

require_once("config.php");

if(isset($_GET['pagina']) && $_GET['pagina'] != "") {
	
	$conexao  = new PDO("mysql:dbname=$database;host=$server", $user, $pass);

	$itens_por_pagina = 5;

	$pagina   = ((isset($_GET['pagina'])) ? intval($_GET['pagina']): 0);

	$initial  = ($pagina > 0) ? intval(($pagina - 1) * $itens_por_pagina) : 0;

	$query    = "SELECT * FROM $database.$table LIMIT $initial, $itens_por_pagina";
	$controle = $conexao->prepare($query);
	$controle->execute();
	$produto  = $controle->fetchAll(PDO::FETCH_ASSOC);
	$page     = $controle->rowCount();

	$query2    = "SELECT * FROM $database.$table";
	$controle2 = $conexao->prepare($query2);
	$controle2->execute();
	$produtos  = $controle2->fetchAll(PDO::FETCH_ASSOC);
	$total     = $controle2->rowCount();
	$paginas   = ceil(intval($total)/intval($itens_por_pagina));

	$response  = [
		//"itens_por_pagina" => $itens_por_pagina,
		"produto"          => $produto,
		"page"             => $pagina,
		//"produtos"         => $produtos,
		//"total"            => $total,
		"paginas"          => $paginas
	];

	echo json_encode($response);
}

// Mysql Database Test
/*
USE db_estudos;

CREATE TABLE IF NOT EXISTS tb_produtos(
	id INT(11) NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(256) NOT NULL,
    valor VARCHAR(256) NOT NULL,
    qtde VARCHAR(256) NOT NULL,
    data_criacao TIMESTAMP NOT NULL,
    data_atualizacao TIMESTAMP NOT NULL
, PRIMARY KEY(id));

INSERT INTO tb_produtos VALUE(null, 'Memoria RAM Hyper Fury', 'R$ 180,00', '30', null, null);
INSERT INTO tb_produtos VALUE(null, 'Notebook ASUS 312 Super Machine', 'R$ 4180,00', '5', null, null);
INSERT INTO tb_produtos VALUE(null, 'Teclado Gamer', 'R$ 50,00', '15', null, null);
INSERT INTO tb_produtos VALUE(null, 'Mouse Gamer', 'R$ 45,00', '6', null, null);
INSERT INTO tb_produtos VALUE(null, 'Monitor UltraWide Gamer LG', 'R$ 750,00', '11', null, null);
INSERT INTO tb_produtos VALUE(null, 'Cabo de rede Azul', 'R$ 25,00', '80', null, null);
INSERT INTO tb_produtos VALUE(null, '1 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '2 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '3 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '4 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '5 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '6 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '7 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '8 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '9 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '10 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '11 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '12 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '13 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '14 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '15 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '16 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '17 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '18 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '19 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '20 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '21 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '22 HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '23HD Externo 1TB', 'R$ 350,00', '4', null, null);
INSERT INTO tb_produtos VALUE(null, '24 HD Externo 1TB', 'R$ 350,00', '4', null, null);

SELECT * FROM tb_produtos;
*/

?>