<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>jQuery Search</title>
<link rel="stylesheet" href="lib/vendor/jquery/jquery.modal.min.css" />
<link rel="stylesheet" href="css/app.css" />
</head>
<body>

<div id="container">
	<div>
		<label>Unidade:</label><br />
		<input type="text" id="txtUnidade" name="txtUnidade" size="60" />
		<input type="hidden" id="idUnidade" name="idUnidade" />
	</div>
	<div>
		<label>Cliente:</label><br />
		<input type="text" id="txtCliente" name="txtCliente" size="60" />
	</div>

	<button id="btConsultaCliente">Consultar</button>
</div>

<div id="modal">
	<h1>Resultados</h1>
	<div>
		<a id="closeModal">X</a>
	</div>
	<ul id="modal_ul"></ul>
</div>

<div id="modal_consulta">
	<h1>Resultados</h1>
	<div>
		<a id="closeModalConsulta">X</a>
	</div>
	<div id="view_consulta"></div>
</div>

<script src="lib/vendor/jquery/jquery.js"></script>
<script src="lib/vendor/jquery/jquery.modal.min.js"></script>
<script src="lib/app/js.js" type="module"></script>
</body>
</html>