
function openModal(context, video) {

	jsBoost().modalOpen({
		bgscreen: "#bg",
		boxmodel: "#box",
		cssMarginLeft: "-450px",
		cssHeight: "100px",
		// Accordion Settings, when effect = accordion
		effect: "accordion",
		effectTransition: "all .5s ease-in",
		effectHeight: "800px"
	});

	jsBoost("#h1-target").html(context);
	jsBoost("#video").attr("src", video);

}

function closeModal(context) {

	jsBoost().modalClose({
		bgscreen: "#bg",
		boxmodel: "#box",
		cssMarginLeft: "-4000px",
		cssHeight: "800px",
		// Accordion Settings, when effect = accordion
		effect: "accordion",
		effectTransition: "all .5s ease-in",
		effectHeight: "100px"
	});

	jsBoost("#h1-target").html(context);
	setTimeout(function(){
		jsBoost("#video").attr("src", "");
	}, 1500);

}

$(document).ready(function() {

	$data_button_click = $('[data-button-click]');
	$data_close_slide  = $('[data-close-modal]');

	$data_button_click.on("click", function(){
		var data = this.value.split(';');
		var context = 'Modal Accordion jsBoost' + data[0];
		var midia   = data[1];
		openModal(context, midia);
	});

	$data_close_slide.on("click", function(){
		closeModal('Modal Accordion jsBoost<br />Encerrando...');
	});

});
