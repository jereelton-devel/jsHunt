<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Pagination Template Sample</title>

<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />

</head>
<body>

<div class="container-fluid">
	<div class="row">
		<div class="col-lg-12">
			<h1 class="">Produtos</h1>

			<table class="table table-striped table-hover bg-light">
				<thead class="bg-dark text-light">
					<tr>
						<td>ID</td>
						<td>DESCRIÇÃO</td>
						<td>VALOR</td>
						<td>QTDE</td>
						<td>CRIADO</td>
						<td>ATUALIZADO</td>
					</tr>
				</thead>
				<tbody id="tbody-data">
					<!--Items-->
				</tbody>
			</table>

			<nav aria-label="Page navigation">
				<ul id="ul_pagination" class="pagination justify-content-center" style="margin: 20px 0">
					<!--Items-->
				</ul>
			</nav>
		</div>
	</div>
</div>

<script src="vendor/jquery/jquery.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<!--script src="resources/js/jsboost-requester.js"></script>
<script src="resources/js/jsboost-pagination.js"></script-->
<script src="resources/js/jsboost.js"></script>
<script src="resources/js/jsapp.js"></script>
</body>
</html> 
