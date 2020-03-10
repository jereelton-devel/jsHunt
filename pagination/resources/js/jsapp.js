
window.onload = function() {

$$.setup({

        'url': "http://localhost/testes/JS/jsBoost/pagination/resources/app/response.php",
        'type': "GET",
        'data': "pagina=0",
        'dataType': "json",
        'page': "0",
        'callback': null,
        'datatable': "#tbody-data",
        'paginationlist': "#ul_pagination",
        'messegerid': "#ul_pagination",
        'messeger': "Carregando...",

    }).messeger().requester();
}
