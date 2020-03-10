
const jsBoostPagination = ((selector = "", args = {}) => {

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
            //requester(0);
            jsBoostRequester().requester(0, pagination);
        });

        // Ativa o botao para todos os eventos de paginacao
        $('[data-link-pag]').on("click", function(e){
            e.preventDefault();
            jsBoostRequester().requester($(this).text(), pagination);
        });

        // Ativa o evento do botao que serve para acessar o ultimo indice da lista de paginacao
        $('[data-link-pag-last]').on("click", function(e){
            e.preventDefault();
            jsBoostRequester().requester(pages, pagination);
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
        jsBoostPagination(args.data_target).createTable(params.produto);
        jsBoostPagination(args.pagination).createPagination(params.paginas, 0);
    }

    return {createPagination, createTable, pagination};

});

window.jsBoostPagination = jsBoostPagination;
