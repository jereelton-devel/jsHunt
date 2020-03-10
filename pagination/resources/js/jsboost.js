
//NO IE VERSION COMPATIBLE - ES6

const jsBoost = ((selector = "", _global = {}) => {

    function messeger() {
        
        $(window.settings.messegerid).html(
            "<p class='text-center' style='width: 100%;'>"
                +window.settings.messeger+
            "</p>");
        
        return this;
    }

    function currentPage(page) {
        if(window.settings.page == page) return true;
    }

    function requester(callback) {

        $.ajax({
            
            type: window.settings.type,
            url: window.settings.url,
            data: window.settings.data,
            dataType: window.settings.dataType,

        }).done(function(datadone){

            if(parseInt(datadone.paginas) > 0) {

                $$.pagination(datadone);

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

        $(window.settings.paginationlist).html(dataList);

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

            $(dataList).appendTo(window.settings.paginationlist);

        }

        dataList = '\
            <li class="page-item">\
              <a data-link-pag-last aria-label="Next" class="page-link">\
                <span aria-hidden="true">&raquo;</span>\
              </a>\
            </li>';

        $(dataList).appendTo(window.settings.paginationlist);

        // Ativa o evento do botao que serve para acessar o primeiro indice da lista de paginacao
        $('[data-link-pag-first]').on("click", function(e){
            e.preventDefault();

            if(currentPage(0)) return false;

            window.settings.data = "pagina=0";
            window.settings.page = 0;
            $$.messeger().requester();
        });

        // Ativa o botao para todos os eventos de paginacao com o valor da pagina atual
        $('[data-link-pag]').on("click", function(e){
            e.preventDefault();

            if(currentPage($(this).text())) return false;

            window.settings.data = "pagina=" + $(this).text();
            window.settings.page = $(this).text();
            $$.messeger().requester();
        });

        // Ativa o evento do botao que serve para acessar o ultimo indice da lista de paginacao
        $('[data-link-pag-last]').on("click", function(e){
            e.preventDefault();

            if(currentPage(pages)) return false;

            window.settings.data = "pagina=" + pages;
            window.settings.page = pages;
            $$.messeger().requester();
        });

        return this;
    }

    function createTable(items) {
        
        $(window.settings.datatable).html('');

        if(typeof items == "object") {

            $(items).each(function(key, value) {

                if(typeof value == "object") {
                    
                    var dataTable = "<tr>";
                
                    for(var item in value) {
                        dataTable += "<td>"+value[item]+"</td>";
                    }

                    dataTable += "</tr>";

                    $(dataTable).appendTo(window.settings.datatable);
                }
            });
        }

        return this;
    }
    
    function pagination(params) {
        
        $$.createTable(params.produto);
        
        $$.createPagination(params.paginas, params.page);

        return this;
    }

    function setup(params) {

        var settings = {
            'url': params.url || null,
            'type': params.type || null,
            'data': params.data || null,
            'dataType': params.dataType || null,
            'page': params.page || null,
            'callback': params.callback || null,
            'datatable': params.datatable || null,
            'paginationlist' : params.paginationlist || null,
            'messegerid': params.messegerid || null,
            'messeger': params.messeger || null,
        };

        window.settings = settings;

        return this;
    }

    return {messeger, requester, createPagination, createTable, pagination, setup};

});

window.jsBoost  = jsBoost;
window.$$       = jsBoost();
