
const jsBoost = ((selector = "", _global = {}) => {

    function messeger(localvar = {}) {
        $(selector).html("<p class='text-center' style='width: 100%;'>"+localvar.msg+"</p>");
        return this;
    }

    function requester(localvar = {}) {

        $.ajax({
            
            type: localvar.type,
            url: localvar.url,
            data: localvar.data,
            dataType: localvar.dataType,

        }).done(function(datadone){

            if(parseInt(datadone.paginas) > 0) {

                localvar.callback(datadone);

            } else {
                
                return "Nenhum registro encontrado !";

            }

        }).fail(function(datafail){

            console.error(datafail);

        });

        return this;

    }

    function createPagination(pages, page) {

        var style    = '';
        var dataList = '\
            <li class="page-item">\
              <a data-link-pag-first aria-label="Previous" class="page-link">\
                <span aria-hidden="true">&laquo;</span>\
              </a>\
            </li>';

        $(selector).html(dataList);

        // Monta a lista de paginacao
        for(var n = 0; n < pages; n++) {
            
            if(page > 0 && (page-1) == n || page == 0 && page == n) {
                style = ' class="page-item active"';
            } else {
                style = ' class="page-item"';
            }

            var dataList = "\
                <li"+style+">\
                    <a data-link-pag class='page-link'>"+(n+1)+"</a>\
                </li>";

            $(dataList).appendTo(selector);

        }

        dataList = '\
            <li class="page-item">\
              <a data-link-pag-last aria-label="Next" class="page-link">\
                <span aria-hidden="true">&raquo;</span>\
              </a>\
            </li>';

        $(dataList).appendTo(selector);

        // Ativa o evento do botao que serve para acessar o primeiro indice da lista de paginacao
        $('[data-link-pag-first]').on("click", function(e){
            e.preventDefault();

            jsBoost('#ul_pagination', {

                'datatable': '#tbody-data',
                'paginationlist': '#ul_pagination'

            }).messeger({

                'msg': "Carregando..."

            }).requester({
                //Ajax settings
                'type': "GET",
                'url': "http://localhost/testes/pagination/resources/app/response.php",
                'data': "pagina=0",
                'dataType': "json",
                //Params settings and Callback
                'page': 0,
                'callback': jsBoost(null, {
                    "datatable": "#tbody-data",
                    "paginationlist": "#ul_pagination"
                }).pagination
            });
        });

        // Ativa o botao para todos os eventos de paginacao
        $('[data-link-pag]').on("click", function(e){
            e.preventDefault();

            jsBoost('#ul_pagination', {

                'datatable': '#tbody-data',
                'paginationlist': '#ul_pagination'

            }).messeger({

                'msg': "Carregando..."

            }).requester({
                //Ajax settings
                'type': "GET",
                'url': "http://localhost/testes/pagination/resources/app/response.php",
                'data': "pagina=" + $(this).text(),
                'dataType': "json",
                //Params settings and Callback
                'page': $(this).text(),
                'callback': jsBoost(null, {
                    "datatable": "#tbody-data",
                    "paginationlist": "#ul_pagination"
                }).pagination
            });
        });

        // Ativa o evento do botao que serve para acessar o ultimo indice da lista de paginacao
        $('[data-link-pag-last]').on("click", function(e){
            e.preventDefault();

            jsBoost('#ul_pagination', {

                'datatable': '#tbody-data',
                'paginationlist': '#ul_pagination'

            }).messeger({

                'msg': "Carregando..."

            }).requester({
                //Ajax settings
                'type': "GET",
                'url': "http://localhost/testes/pagination/resources/app/response.php",
                'data': "pagina=" + pages,
                'dataType': "json",
                //Params settings and Callback
                'page': pages,
                'callback': jsBoost(null, {
                    "datatable": "#tbody-data",
                    "paginationlist": "#ul_pagination"
                }).pagination
            });
        });

    }

    function createTable(items) {
        
        $(selector).html('');

        if(typeof items == "object") {

            $(items).each(function(key, value) {

                if(typeof value == "object") {
                    
                    var dataTable = "<tr>";
                
                    for(var item in value) {
                        dataTable += "<td>"+value[item]+"</td>";
                    }

                    dataTable += "</tr>";

                    $(dataTable).appendTo(selector);
                }
            });
        }
    }
    
    function pagination(params) {
        jsBoost(_global.datatable).createTable(params.produto);
        jsBoost(_global.paginationlist).createPagination(params.paginas, params.page);
    }

    return {messeger, requester, createPagination, createTable, pagination};

});

window.jsBoost = jsBoost;
