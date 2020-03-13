/*
* jsHunt Javascript Library - 2020 (by JOTICODE)
*/

(function(){

    const jsHunt = function(_selector, _args) {

        if(!(this instanceof jsHunt)) {
            return new jsHunt(_selector, _args);
        }

        this.selector  = _selector;
        this.args      = _args;

        except = function(msg) {
            throw err = msg;
            return err;
        };

        try {
            if(this.selector) {
                if(this.selector.indexOf("#") === 0) {
                    this.sel = document.getElementById(this.selector.replace("#", ""));
                } else if(this.selector.indexOf("\.") === 0) {
                    this.sel = document.getElementsByClassName(this.selector.replace("\.", ""));
                } else if(this.selector.indexOf("\[") === 0) {
                    this.sel = document.querySelectorAll(this.selector);
                } else if(this.selector.search(/^[a-z]/) === 0) {
                    this.sel = document.getElementsByTagName(this.selector);
                } else {
                    throw err = "Invalid selector ("+this.selector+"), use id, class or label";
                }
            } else {
                this.sel = this.selector = undefined;
            }
        } catch(err) {
            console.error(err);
        } finally {
            try {
                (this.selector && !this.sel) ?
                    except("jsHunt is not done, check your selector call's !") : "";
            } catch(e) {
                console.error(e);
                return;
            }
        }

    }

    var userAgent = navigator.userAgent.toLowerCase();
    var nodes     = [];
    var node      = "";
    var fadeCtrl  = null; //FadeIn FadeOut Effects Controls
    
    jsHunt.fn = jsHunt.prototype = {

        // for test your application, see: http://joticode.com/jshunt/docs/test
        _test_: function() {
            let _sel = this.sel || nodes;
            let keys = Object.keys(_sel);
            (keys.length > 0) ? 
                keys.forEach(function(index) {
                    console.log("test_1", typeof _sel, _sel.length, _sel[index]);
                }) : (_sel) ?
                    console.log("test_2", typeof _sel, _sel.length, _sel) :
                    console.error("test", typeof _sel, _sel.length, _sel);
            return this;
        },

        exception: function(msg){
            throw err = msg;
            return err;
        },

        hunter: function(wanted, nodeType) {
            try {
                let hunt = document.querySelectorAll(wanted);
                let keys = Object.keys(hunt);
                nodes    = [];
                node     = "";
                (keys.length > 0) ? 
                    keys.forEach(function(index) {
                        (nodeType && nodeType === "parent") ? 
                            nodes.push(hunt[index].parentElement) : 
                            nodes.push(hunt[index]);
                    }) : (hunt) ? 
                            (nodeType && nodeType === "parent") ? 
                                node = hunt.parentElement : 
                                hunt : 
                        jsHunt.fn.exception("hunter error, not found: " + wanted);
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        getData: function(a, e) {
            switch(a) {
                case "undefined":
                    return e;
                break;
                case "text":
                    return e.text;
                break;
                case "textContent":
                    return e.textContent;
                break;
                case "value":
                    return e.value;
                break;
                case "src":
                    return e.src;
                break;
                case "attr":
                    return e.attributes;
                break;
                default:
                    throw err = "Invalid argument [" + a + "] on getData !";
            }
        },

        on: function(ev, callback) {
            let _sel = this.sel;
            let args = this.args;
            let keys = Object.keys(_sel);
            try {
                (keys.length > 0) ? 
                    keys.forEach(function(index) {
                        _sel[index].addEventListener(ev, function(e){
                            e.preventDefault();
                            callback((args === undefined) ? null : jsHunt.fn.getData(args.rsp, _sel[index]));
                        });
                    }) : (_sel) ? 
                        _sel.addEventListener("click", function(e){
                            e.preventDefault();
                            callback((args === undefined) ? null : jsHunt.fn.getData(args.rsp, _sel));
                        }) : jsHunt.fn.exception("on."+ev+" "+typeof _sel+" "+ _sel.length+" "+_sel);

            } catch(err) {
                console.error(err);
            }
            return this;
        },

        nodeParent: function(parentItem) {
            try {
                jsHunt().hunter(parentItem + " " + this.selector, "parent");
                (nodes.length <= 0) ? 
                jsHunt.fn.exception("nodeParent error, not found [" + parentItem + " " + this.selector + "] !") : null;
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        nodeChild: function(childItem) {
            try {
                jsHunt().hunter(this.selector + " " + childItem);
                (nodes.length <= 0) ? 
                jsHunt.fn.exception("nodeChild error, not found [" + this.selector + " " + childItem + "] !") : null;
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        resetStyle: function(index) {
            try {
                (index && index >= 0) ?
                    nodes[index].className = "" : 
                (nodes.length > 0 && !index) ? 
                    nodes.forEach(function(inode) {
                        inode.className = "";
                    }) : (node) ?
                        node.className = "" : jsHunt.fn.exception("resetStyle error, nodes is undefined !");
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        addClass: function(classname, index) {
            try {
                (index && index >= 0) ? 
                    (nodes[index].className.search(classname) >= 0 || 
                     nodes[index].className.search(" " + classname) >= 0) ? "" : 
                        nodes[index].className += " " + classname
                        :
                (nodes.length > 0) ? 
                    nodes.forEach(function(inode) {
                        (
                            inode.className.search(classname) >= 0 || 
                            inode.className.search(" " + classname) >= 0
                        ) ? "" : 
                            inode.className += " " + classname
                    }) : (node) ?
                        (
                            node.className.search(classname) >= 0 ||
                            node.className.search(" " + classname) >= 0
                        ) ? "" : node.className += " " + classname
                         : jsHunt.fn.exception("addClass error, nodes is undefined !");
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        removeClass: function(classname) {
            let _sel = this.sel;
            let keys = Object.keys(_sel);
            try {
                (keys.length > 0) ?
                    keys.forEach(function(i){
                        (typeof _sel[i] !== "undefined") ? _sel[i].classList.remove(classname) : undefined;
                    }) : jsHunt.fn.exception("Selector ("+this.selector+") not found");
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        attr: function(type, value) {
            //TODO: Criar opcoes de atributos alem do src
            try {
                let _sel = this.sel;
                (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                    _sel.forEach(function(a, index, el) {
                        _sel[index].attributes.src.value = value;
                    }) : (_sel) ?
                        _sel.attributes.src.value = value : err = "attr() error " + type;
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        html: function(text) {
            try {
                let _sel = this.sel;
                (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                    _sel.forEach(function(a, index, el) {
                        _sel[index].innerHTML = text;
                    }) : (_sel) ?
                        _sel.innerHTML = text : err = "html() error " + type;
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        append: function(text) {
            try {
                let _sel = this.sel;
                (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                    _sel.forEach(function(a, index, el) {
                        _sel[index].innerHTML += text;
                    }) : (_sel) ?
                        _sel.innerHTML += text : err = "append() error " + type;
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        display: function(value) {
            try {
                let _sel = this.sel;
                (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                    _sel.forEach(function(a, index, el) {
                        _sel[index].style.display = value;
                    }) : (_sel) ?
                        _sel.style.display = value : err = "display() error " + type;
            } catch(err) {
                console.error(err);
            }
            return this;
        },

        text: function(i) {

            return (i) ? this.sel[i].text : this.sel.text;

        },

        click: function(callback) {
            let _sel = this.sel;
            let keys = Object.keys(_sel);
            (keys.length > 0) ? 
                keys.forEach(function(index) {
                    _sel[index].addEventListener("click", function(e){
                        e.preventDefault();
                        callback(this.text);
                        console.log("click-1", _sel[index], this.text.trim(), keys, index);
                    });
                }) : (_sel) ?
                    _sel.addEventListener("click", function(e){
                        e.preventDefault();
                        callback(this.text || null);
                        console.log("click-2", _sel, (this.text) ? this.text.trim() : null);
                    }) : console.error("on.click", typeof _sel, _sel.length, _sel);
            return this;
        },

        fadeIn: function(p) {
            clearInterval(this.fadeCtrl);
            var _opacity  = 0; //0....100
            //copy current target tag (noConflict)
            let _element  = this.sel;
            let _selector = this.selector;
            
            // CSS Reset Element
            _element.style.display = "block";
            
            //Cross Browser CSS > IE
            if( userAgent.indexOf( 'msie' ) != -1 ) {
                _element.style.filter  = "alpha(opacity=0)";
            } else { _element.style.opacity = 0; }

            this.fadeCtrl = setInterval(function(){
                if((_opacity >= 100)) {
                    clearInterval(this.fadeCtrl);

                    // Element Automatic Close
                    if(typeof p !== "undefined" && parseInt(p.timeout) > 0) {

                        setTimeout(function(){
                            jsHunt(_selector).fadeOut();
                        }, parseInt(p.timeout));

                    }

                } else {
                    _opacity += 2;
                    
                    //Cross Browser CSS > IE
                    if( userAgent.indexOf( 'msie' ) != -1 ) {
                        _element.style.filter  = "alpha(opacity=" + _opacity + ")";
                    } else { _element.style.opacity = _opacity / 100; }
                }

            }, (p === undefined) ? 1 : p.timefade);

            return this;
        },

        fadeOut: function(p) {
            clearInterval(this.fadeCtrl);
            var _opacity  = 100; //100....0
            //copy current target tag (noConflict)
            let _element  = this.sel;
            let _selector = this.selector;
            
            this.fadeCtrl = setInterval(function(){
                if((_opacity <= 0)) {
                    clearInterval(this.fadeCtrl);
                    _element.style.display = "none";
                } else {
                    _opacity -= 2;
                    
                    //Cross Browser CSS > IE
                    if( userAgent.indexOf( 'msie' ) != -1 ) {
                        _element.style.filter = "alpha(opacity=" + _opacity + ")";
                    } else { _element.style.opacity = _opacity / 100; }
                }
                
            }, (p === undefined) ? 1 : p.timefade);

            return this;
        },

        modal: function(params) {
            try {
                if(params === undefined) {
                    throw err = "Modal params missing !";
                }
                let ac = params.action;
                let bg = params.bgscreen;
                let bx = params.boxmodel;
                let ef = params.effect;
                //copy current target tag (noConflict)
                let _selector = this.selector;

                if(ac === "open") {
                    jsHunt(bg).display("block");
                    switch(ef) {
                        case "fade":
                            jsHunt(_selector).fadeIn();
                        break;
                        case "display":
                            jsHunt(_selector).display("block");
                        break;
                        default:
                            throw err = "Modal effect params wrong !";
                    }
                }

                if(ac === "close") {
                    setTimeout(function(){
                        jsHunt(bg).display("none");
                    }, 400);
                    switch(ef) {
                        case "fade":
                            jsHunt(_selector).fadeOut();
                        break;
                        case "display":
                            jsHunt(_selector).display("none");
                        break;
                        default:
                            throw err = "Modal effect params wrong !";
                    }
                }

            } catch(err) {
                console.error(err);
            }

            return this;
        },

        loaded: function(callback) {
            window.onload = function() {
                callback();
            }
        }

    };

    window.jsHunt = jsHunt, window.jH = jsHunt;

})();

//No Conflict Resolved
var _jsHunt = window.jsHunt,
    _jH     = window.jH;

jsHunt.noConflict = function( digger ) {
    if(window.jH === jsHunt) {
        window.jH = _jH;
    }
    if(digger && window.jsHunt === jsHunt) {
        window.jsHunt = _jsHunt;
    }
    return jsHunt;
};

jsHunt.noConflict();

if ( typeof noGlobal === typeof undefined ) {
    window.jsHunt = window.jH = jsHunt;
}
