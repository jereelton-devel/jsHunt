
const jsBoost = (function(selector, args) {

    function attr(type, value) {
        try {

            if(selector.indexOf("#") == 0) {
                document.getElementById(selector.replace("#", "")).src = value;
            } else if(selector.indexOf("\.") == 0) {

                let elements = document.getElementsByClassName(selector.replace("\.", ""));

                for( var i = 0; i < elements.length; i++ ) {
                    elements[i].src = value;
                }

            } else {
                throw err = "Selector ["+selector+"] not found, use id or class";
            }

        } catch(err) {
            console.error(err);
        }
    }

    function html(text) {
        try {

            if(selector.indexOf("#") == 0) {
                document.getElementById(selector.replace("#", "")).innerHTML = text;
            } else if(selector.indexOf("\.") == 0) {

                let elements = document.getElementsByClassName(selector.replace("\.", ""));

                for( var i = 0; i < elements.length; i++ ) {
                    elements[i].innerHTML = "<span style='display: "+display+"'>"+i+" - </span>"+text;
                }

            } else {
                throw err = "Selector ["+selector+"] not found, use id or class";
            }

        } catch(err) {
            console.error(err);
        }
    }

    function append(text) {
        try {

            if(selector.indexOf("#") == 0) {
                document.getElementById(selector.replace("#", "")).innerHTML += text;
            } else if(selector.indexOf("\.") == 0) {

                let elements = document.getElementsByClassName(selector.replace("\.", ""));

                for( var i = 0; i < elements.length; i++ ) {
                    elements[i].innerHTML += "<span style='display: "+display+"'>"+i+" - </span>"+text;
                }

            } else {
                throw err = "Selector ["+selector+"] not found, use id or class";
            }

        } catch(err) {
            console.error(err);
        }
    }

	function modalOpen(params) {
		
		var bg = params.bgscreen;
		var bx = params.boxmodel;
		var ml = params.cssMarginLeft;
		var ch = params.cssHeight;
		var ef = params.effect;
		var et = params.effectTransition;
		var eh = params.effectHeight;

		// Fixed Settings
		document.getElementById(bg.replace("#", "")).style.display    = "block";
		document.getElementById(bx.replace("#", "")).style.display    = "block";
		document.getElementById(bx.replace("#", "")).style.transition = "all .5s";
		// Dinamic Settings
		document.getElementById(bx.replace("#", "")).style.marginLeft = ml;
		document.getElementById(bx.replace("#", "")).style.height     = ch;

		if(ef == "accordion") {
			setTimeout(function(){
				document.getElementById(bx.replace("#", "")).style.transition = et;
				document.getElementById(bx.replace("#", "")).style.height     = eh;
			}, 800);
		}
	}

	function modalClose(params) {
		
		var bg = params.bgscreen;
		var bx = params.boxmodel;
		var ml = params.cssMarginLeft;
		var ch = params.cssHeight;
		var ef = params.effect;
		var et = params.effectTransition;
		var eh = params.effectHeight;

		if(ef == "accordion") {
			document.getElementById(bx.replace("#", "")).style.transition = et;
			document.getElementById(bx.replace("#", "")).style.height     = eh;
		}

		setTimeout(function() {
			document.getElementById(bx.replace("#", "")).style.transition = "all 1s ease-in";
			document.getElementById(bx.replace("#", "")).style.marginLeft = ml;

			// Time to close bg screen (Tela Preta)
			setTimeout(function(){
				document.getElementById(bg.replace("#", "")).style.display = "none";
			}, 500);

		}, 800);
	}

	return {
		attr: attr,
		html: html,
		append: append,
		modalOpen: modalOpen,
		modalClose: modalClose
	};

});

window.jsBoost = jsBoost;
window.$$      = jsBoost();
