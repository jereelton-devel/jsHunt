
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

console.log("global", this);

(function() {
    console.log("function", this);
})();

function teste() {
    var t = null;
    console.log("teste", this);
}

teste();

var f = {
    firstname: "Marcelo",
    lastname: "Oliveira",

    func: function() {
        console.log("func", this);
        console.log("func", this.firstname);
    }
}

document.getElementById("bt_open_modal").onclick = function(e) {e.preventDefault(); teste();}

f.func();