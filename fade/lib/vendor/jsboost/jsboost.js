
/*IE Compatible*/

const jsBoost = (function(selector, args) {

    //get browser for adaptive resources to IE
    var userAgent = navigator.userAgent.toLowerCase();
    
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

    //How use: jsBoost("#selectorId", {options}).fadeOut();
    function fade() {
        if(args.effect == "fadein") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(e){
                e.preventDefault();
                jsBoost(args.element, args).fadeIn();
            });
        } else if(args.effect == "fadeout") {
            document.getElementById(selector.replace("#", ""))
            .addEventListener("click", function(e){
                e.preventDefault();
                jsBoost(args.element).fadeOut();
            });
        } else {
            console.error("Erro on args.effect: function $fade(), received:", args.effect);
        }
    }

    return {
        /*Effects*/
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        fade: fade
    };
});


window.jsBoost = jsBoost;
window.$$      = jsBoost();
