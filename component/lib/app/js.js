
import {jJerryWidgets} from '../vendor/jjerry/jjerry-widgets.js';
for(var i = 0; i<1000000; i++) var tmp = i; tmp = null; // delay load

$(document).ready(function() {

    $("#data-panel").hide();

    $('#closeModal').on("click", function() {
        jJerryWidgets("#modal", {
            wide: true,
            width: "800px"
        }).modalClose();
    });
     
    $('#txtNome').keyup(function(e){
        if(e.keyCode == 13) {

            let search = $('#txtNome').val();

            if(!search || search.length < 3) {return}

            $.getJSON('sys/sql.php?nome='+search, function(data){
                $("#txtNome").val('');
                
                if(data.length == 0) {
                    jJerryWidgets(null, {
                        context: "Nenhuma Registro Encontrado !",
                        timein: 1,
                        timeout: 2500,
                        bgcolor: "#880000",
                        color: '#FEFEFE'
                    }).tooltip();
                    return;
                }

                jJerryWidgets("#modal", {
                    timeout: 0,
                    wide: true,
                    loop: false,
                    width: "800px",
                    bgcolor: "#FFFFFF",
                    color: "#000000",
                    bordercolor: "#EEEEEE",
                    bgscreen: "#000000"
                }).modalOpen();

                $("#modal_ul").html("");
                
                $(data).each(function(key, value) {
                    var $random = [];
                    var $id     = Math.floor(Math.random() * 1000000);
                    for(var x = 0; x <= $random.length; x++) {
                        if($random.indexOf($id) == -1) {
                            $random.push($id);
                            break;
                        } else {
                            $id = Math.floor(Math.random() * 1000000);
                        }
                    }
                    $("#modal_ul").append("<li id='li_"+$id+"'>" + value.nome + "</li>");
                    $("#li_"+$id).on("click", function(){
                        $("#txtNome").val(value.nome);
                        $("#idPessoa").val(value.id);
                        jJerryWidgets("#modal", {
                            wide: true,
                            width: "800px"
                        }).modalClose();
                    });
                });
            });
        }
     });

    $("#btConsulta").click(function(){

        if($('#idPessoa').val() == "" || $('#txtNome').val() == "") {
            jJerryWidgets(null, {
                context: "Informe um nome !",
                timein: 1,
                timeout: 2500,
                bgcolor: "#8F1122",
                color: '#FEFEFE'
            }).tooltip();
            return;
        }

        let $nm = $('#txtNome' ).val();
        let $id = $('#idPessoa').val();

        $.getJSON('sys/sql.php?consulta='+$nm + "&nome=" + $id, function(data){

            if(data.length == 0) {
                jJerryWidgets(null, {
                    context: "Nenhum Registro Encontrado !",
                    timein: 1,
                    timeout: 2500,
                    bgcolor: "#8F1122",
                    color: '#FEFEFE'
                }).tooltip();
                return;
            }
            
            $("#data-panel").show();
            $("#data-panel").html('');

            $(data).each(function(key, value) {

                //var dataCtrl = setInterval(function(){
                setTimeout(function(){
                    var $random = [];
                    var $id     = Math.floor(Math.random() * 1000000);
                    for(var x = 0; x <= $random.length; x++) {
                        if($random.indexOf($id) == -1) {
                            $random.push($id);
                            break;
                        } else {
                            $id = Math.floor(Math.random() * 1000000);
                        }
                    }

                    $("#data-panel").append(
                        '<div id="div_panel_'+$id+'" class="panel panel-primary">'
                            + '<div class="panel-heading">Dados Pessoais</div>'
                            + '<div data-dados-pessoais class="panel-body">'
                                + '<p id="p_'+$id+'"><strong>Id:</strong> '
                                + value.id      + ' - <strong>Nome:</strong>'
                                + value.nome    + ' - <strong>Empresa:</strong> ' 
                                + value.empresa + ' - <strong>Status:</strong> ' 
                                + value.status  + ' - <strong>Idade:</strong> '
                                + value.idade   + ' - <strong>Foto:</strong> '
                                + value.foto    + '</p>'
                            + '</div>'
                            + '</div>'
                    );
                    $("#div_panel_"+$id).hide();

                    $("#p_"+$id).on("click", function(){
                        console.log("#p_"+$id, "<p id='p_"+$id+"'>" + value.nome + "</p>");
                    });

                    setTimeout(function(){
                        $("#div_panel_"+$id).fadeIn();
                    }, 500);

                }, 20);

            });

        });

    });
});
