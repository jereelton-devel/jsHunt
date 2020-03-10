
const jsBoost = (function(selector, args) {

	var userAgent = navigator.userAgent.toLowerCase();

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
    
    /* FadeIn FadeOut Effects Controls */
    var fadeCtrl = null;

    //How use: jsBoost("#selectorId", {options}).fadeIn();
    function fadeIn(timefade) {
        clearInterval(fadeCtrl);
        let _opacity = 0; //0....100
        let _element = document.getElementById(selector.replace("#", ""));

        // CSS Reset Element
        _element.style.display = "block";
        _element.style.opacity = 0;
        //Cross Browser CSS
        if( userAgent.indexOf( 'msie' ) != -1 ) { //IE
            _element.style.filter  = "alpha(opacity=0)";
        }

        fadeCtrl = setInterval(function(){
            if((_opacity == 100)) {
                clearInterval(fadeCtrl);

                // Element Automatic Close
                if(parseInt(args.timeout) > 0) {

                    setTimeout(function(){
                        jsBoost(selector).fadeOut();
                    }, parseInt(args.timeout));

                }

            } else {
                _opacity += 2;
                _element.style.opacity = _opacity / 100;
                //Cross Browser CSS
                if( userAgent.indexOf( 'msie' ) != -1 ) { //IE
                    _element.style.filter  = "alpha(opacity=" + _opacity + ")";
                }
            }

        }, timefade || 1);
    }

    //How use: jsBoost("#selectorId", {options}).fadeOut();
    function fadeOut(timefade) {
        clearInterval(fadeCtrl);
        let _opacity = 100; //100....0
        let _element = document.getElementById(selector.replace("#", ""));

        fadeCtrl = setInterval(function(){
            if((_opacity == 0)) {
                clearInterval(fadeCtrl);
                _element.style.display = "none";
            } else {
                _opacity -= 2;
                _element.style.opacity = _opacity / 100;
                //Cross Browser CSS
                if( userAgent.indexOf( 'msie' ) != -1 ) { //IE
                    _element.style.filter = "alpha(opacity=" + _opacity + ")";
                }
            }
            
        }, timefade || 1);
    }

	function modal(params) {
		
		var ac = params.action;
		var bg = params.bgscreen;
		var bx = params.boxmodel;

		if(ac == "open") {
			document.getElementById(bg.replace("#", "")).style.display    = "block";
			jsBoost(bx, {timeout: 0}).fadeIn();
		}

		if(ac == "close") {
			setTimeout(function(){
				document.getElementById(bg.replace("#", "")).style.display = "none";
			}, 500);
			jsBoost(bx, {timeout: 0}).fadeOut();
		}
	}

	return {
		attr: attr,
		html: html,
		append: append,
		modal: modal,
		fadeIn: fadeIn,
		fadeOut: fadeOut
	};

});

window.jsBoost = jsBoost;
window.$$      = jsBoost();
