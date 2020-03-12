
(function(){

    var blJs = function(sel) {
        if(!(this instanceof blJs)) {
            return new blJs(sel);
        }
        this.selector = sel;
    }

    blJs.fn = blJs.prototype = {
        hide: function(){
            document.querySelector(this.selector).setAttribute("style", "display:none"); return this;
        },
        show: function(){
            document.querySelector(this.selector).setAttribute("style", "display:block"); return this;
        },
        html: function(){
            document.querySelector(this.selector).innerHTML = "TESTE"; return this;
        }
    }

    window.blJs = blJs, window.$ = blJs;

})();

