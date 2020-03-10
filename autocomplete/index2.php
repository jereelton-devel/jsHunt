<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Auto Complete</title>
<link rel="stylesheet" href="lib/vendor/jquery/jquery-ui.css" />
</head>
<body>
	
<label>Cliente:</label>
<input type="text" id="txtCliente" name="txtCliente" size="60"/>
<label>Unidade:</label>
<input type="text" id="txtUnidade" name="txtUnidade" size="60"/>

<script src="lib/vendor/jquery/jquery.js"></script>
<script src="lib/vendor/jquery/jquery-ui.js"></script>

<script type="text/javascript">
$(document).ready(function() {
     
     $('#txtCliente').keyup(function(e){
		if(e.keyCode == 13) {
			console.log("[ENTER]");
			return;
		}

		dig = $('#txtCliente').val();

		if(!dig) {return;}

	    // Captura o retorno do retornaCliente.php
	    $.getJSON('sys/processa.php?busca='+dig, function(data){
	        var cliente = [];
	         
	        // Armazena na array capturando somente o nome do cliente
	        $(data).each(function(key, value) {
	            cliente.push(value.response);
	        });

	        // Chamo o Auto complete do JQuery ui setando o id do input, array com os dados e o mínimo de caracteres para disparar o AutoComplete
	        $('#txtCliente').autocomplete({ source: cliente, minLength: 3});
	    });
     });
});
</script>
</body>
</html>