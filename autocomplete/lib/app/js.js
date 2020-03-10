
import {jJerryWidgets} from '../vendor/jjerry/jjerry-widgets.js';
for(var i = 0; i<1000000; i++) var tmp = i; tmp = null; // delay load

$(document).ready(function() {

    $('#closeModal').on("click", function() {
        jJerryWidgets("#modal", {
            wide: true,
            width: "800px"
        }).modalClose();
    });

    $('#closeModalConsulta').on("click", function() {
        jJerryWidgets("#modal_consulta", {
            wide: true,
            width: "800px"
        }).modalClose();
    });
     
     $('#txtUnidade').keyup(function(e){
        if(e.keyCode == 13) {

            let search = $('#txtUnidade').val();

            if(!search || search.length < 3) {return}

            $.getJSON('sys/sql.php?unidade='+search, function(data){
                $("#txtUnidade").val('');
                
                if(data.length == 0) {
                    jJerryWidgets(null, {
                        context: "Nenhuma Unidade Encontrada !",
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
                    var $id     = Math.floor(Math.random() * 1000);
                    for(var x = 0; x <= $random.length; x++) {
                        if($random.indexOf($id) == -1) {
                            $random.push($id);
                            break;
                        } else {
                            $id = Math.floor(Math.random() * 1000);
                        }
                    }
                    $("#modal_ul").append("<li id='li_"+$id+"'>" + value.nome_unidade + "</li>");
                    $("#li_"+$id).on("click", function(){
                        $("#txtUnidade").val(value.nome_unidade);
                        $("#idUnidade").val(value.id);
                        jJerryWidgets("#modal", {
                            wide: true,
                            width: "800px"
                        }).modalClose();

                        /*jJerryWidgets("modal", {
                            timeout: 0
                        }).fadeOut(1, {blocker:true});*/

                        /*jJerryWidgets("modal", {
                            timeout: 0
                        }).hidden({blocker:true});*/
                    });
                });

            });
        }
     });
     
     $('#txtCliente').keyup(function(e){
		if(e.keyCode == 13) {

			let search = $('#txtCliente').val();

			if(!search || search.length < 3) {return}

            if($('#idUnidade').val() == "" || $('#txtUnidade').val() == "") {
                jJerryWidgets(null, {
                    context: "Primeiro informe uma unidade !",
                    timein: 1,
                    timeout: 2500,
                    bgcolor: "#8F1122",
                    color: '#FEFEFE'
                }).tooltip();
                return;
            }

            $.getJSON('sys/sql.php?unidade='+$('#idUnidade').val()+'&cliente='+search, function(data){
                $('#txtCliente').val('');

                if(data.length == 0) {
                    jJerryWidgets(null, {
                        context: "Nenhum Cliente Encontrado !",
                        timein: 1,
                        timeout: 2500,
                        bgcolor: "#8F1122",
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

                /*jJerryWidgets("modal", {
                    timeout: 0
                }).fadeIn(1, {blocker:true});*/

                /*jJerryWidgets("modal", {
                    timeout: 0
                }).visible({blocker:true});*/

		    	$("#modal_ul").html("");
		    	
                $(data).each(function(key, value) {
		            var $random = [];
		            var $id     = Math.floor(Math.random() * 1000);
		            for(var x = 0; x <= $random.length; x++) {
		            	if($random.indexOf($id) == -1) {
		            		$random.push($id);
		            		break;
		            	} else {
		            		$id = Math.floor(Math.random() * 1000);
		            	}
		            }
		            $("#modal_ul").append("<li id='li_"+$id+"'>" + value.nome_cliente + " - " + value.nome_unidade + "</li>");
                    $("#li_"+$id).on("click", function(){
                        $("#txtCliente").val(value.nome_cliente);
                        jJerryWidgets("#modal", {
                            wide: true,
                            width: "800px"
                        }).modalClose();
                    });
		        });

		    });
		}
    });

    $("#btConsultaCliente").click(function(){

        if($('#idUnidade').val() == "" || $('#txtUnidade').val() == "") {
            jJerryWidgets(null, {
                context: "Primeiro informe uma unidade !",
                timein: 1,
                timeout: 2500,
                bgcolor: "#8F1122",
                color: '#FEFEFE'
            }).tooltip();
            return;
        }

        if($('#txtCliente').val() == "") {
            jJerryWidgets(null, {
                context: "Informe um cliente !",
                timein: 1,
                timeout: 2500,
                bgcolor: "#8F1122",
                color: '#FEFEFE'
            }).tooltip();
            return;
        }

        let $uni = $('#txtUnidade').val();
        let $cli = $('#txtCliente').val();

        $.getJSON('sys/sql.php?consulta='+$uni + "&cliente=" + $cli, function(data){

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

            jJerryWidgets("#modal_consulta", {
                timeout: 0,
                wide: true,
                loop: false,
                width: "800px",
                bgcolor: "#FFFFFF",
                color: "#000000",
                bordercolor: "#EEEEEE",
                bgscreen: "#000000"
            }).modalOpen();

            /*jJerryWidgets("modal", {
                timeout: 0
            }).fadeIn(1, {blocker:true});*/

            /*jJerryWidgets("modal", {
                timeout: 0
            }).visible({blocker:true});*/

            $("#view_consulta").html("");
            
            $(data).each(function(key, value) {
                var $random = [];
                var $id     = Math.floor(Math.random() * 1000000);
                for(var x = 0; x <= $random.length; x++) {
                    if($random.indexOf($id) == -1) {
                        $random.push($id);
                        break;
                    } else {
                        $id = Math.floor(Math.random() * 1000);
                    }
                }
                $("#view_consulta").append("<p id='p_"+$id+"'>"+ value.dados + " - " + value.unidade + " - " + value.cliente + "<br />" + value.response + "</p>");
                $("#p_"+$id).on("click", function(){
                    console.log("#p_"+$id, "<p id='p_"+$id+"'>" + value.response + "</p>");
                });
            });

        });

    });
});
