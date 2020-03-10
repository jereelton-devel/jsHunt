<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8" />
<title>jQuery Search</title>
<link rel="stylesheet" href="lib/vendor/jquery/jquery-ui.css" />
</head>
<body>

<div>
	<label>Cliente:</label><br />
	<input type="text"   id="txtCliente" name="txtCliente" size="60" />
	<input type="hidden" id="idUnidade"  name="idUnidade" />
</div>
<div>
	<label>Unidade:</label><br />
	<input type="text" id="txtUnidade" name="txtUnidade" size="60" />
</div>

<script src="lib/vendor/jquery/jquery.js"></script>
<script src="lib/vendor/jquery/jquery-ui.js"></script>

<script type="text/javascript">
$(document).ready(function() {
     
     $('#txtCliente').keyup(function(e){
		if(e.keyCode == 13) {
			console.log("[ENTER]");
			return;
		}

		let dig = $('#txtCliente').val();

		if(!dig) {return}

	    // Captura o retorno do sql.php
	    $.getJSON('sys/sql.php?cliente='+dig, function(data){
	        var clientes = [];
	         
	        // Armazena na array capturando somente o nome do clientes
	        $(data).each(function(key, value) {
	            clientes.push(value.response);
	        });

	        // Chamo o Auto complete do JQuery ui setando o id do input,
	        // array com os dados e o mínimo de caracteres para disparar o AutoComplete
	        $('#txtCliente').autocomplete({ source: clientes, minLength: 3});
	    });
     });

     $('#txtCliente').change(function() {
	    // Captura o retorno do sql.php
	    $.getJSON('sys/sql.php?cliente='+$('#txtCliente').val(), function(data){
	    	$('#idUnidade').val(data[0].unidade);
	    });
     });
     
     $('#txtUnidade').keyup(function(e){
		if(e.keyCode == 13) {
			console.log("[ENTER]");
			return;
		}

		let dig = $('#txtUnidade').val();

		if($('#idUnidade').val() == "" || !dig) {return}

	    // Captura o retorno do sql.php
	    $.getJSON('sys/sql.php?cliente='+$('#idUnidade').val()+'&unidade='+dig, function(data){
	        var unidades = [];
	         
	        // Armazena na array capturando somente o nome do unidades
	        $(data).each(function(key, value) {
	            unidades.push(value.response);
	        });

	        // Chamo o Auto complete do JQuery ui setando o id do input,
	        // array com os dados e o mínimo de caracteres para disparar o AutoComplete
	        $('#txtUnidade').autocomplete({ source: unidades, minLength: 3});
	    });
     });
});
</script>
</body>
</html>