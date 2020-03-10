
import {jsBoostWidgets} from './jsboost-widget.js';

export const jsBoostEvent = (() => {

	function init() {

	    $("#data-panel").hide();

	    $('#closeModal').on("click", function() {
	        jsBoostWidgets("#modal", {
	            wide: true,
	            width: "800px"
	        }).modalClose();
	    });
	}

	return {
		init
	};

})();

export const jsBoost = (() => {

	var Event = {
		init: function() {
			console.log("Event.init");
		}
	};

	return {
		Event
	};

})();