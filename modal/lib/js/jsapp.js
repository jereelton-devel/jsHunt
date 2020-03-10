
function openModal(context, img) {

	jsBoost().modal({
		action: "open",
		bgscreen: "#bg",
		boxmodel: "#box",
	});

	jsBoost("#h1-target").html(context);
	jsBoost("#img_modal").attr("src", img);

}

function closeModal(context) {

	jsBoost().modal({
		action: "close",
		bgscreen: "#bg",
		boxmodel: "#box",
	});

	jsBoost("#h1-target").html(context);
	jsBoost("#img_modal").attr("src", "");

}

$(document).ready(function() {

	$data_button_click = $('[data-button-click]');
	$data_close_modal  = $('[data-close-modal]');

	$data_button_click.dblclick(function(){
		var context = 'Modal jsBoost Demo';
		var image   = this.value;
		openModal(context, image);
	});

	$data_close_modal.on("click", function(){
		closeModal('Encerrando...');
	});

});
