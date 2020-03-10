
const jsHunt = (function(selector, args) {
        
    window.userAgent = navigator.userAgent.toLowerCase();
    window.selector  = selector;
    window.args      = args;
    
    (function() {

        except = function(msg) {
            throw err = msg;
            return err;
        }

        try {
            if(window.selector) {

                if(window.selector.indexOf("#") === 0) {
                    window.sel = document.getElementById(window.selector.replace("#", ""));
                } else if(window.selector.indexOf("\.") === 0) {
                    window.sel = document.getElementsByClassName(window.selector.replace("\.", ""));
                } else if(window.selector.indexOf("\[") === 0) {
                    window.sel = document.querySelectorAll(window.selector);
                } else if(window.selector.search(/^[a-z]/) === 0) {
                    window.sel = document.getElementsByTagName(window.selector);
                } else {
                    throw err = "Invalid selector ("+selector+"), use id, class or label";
                }
            } else {
                window.sel = window.selector = undefined;
            }
        } catch(err) {
            console.error(err);
        } finally {
            try {
                (window.selector && !window.sel) ?
                    except("jsHunt is not done, check your selector call's !") : "";
            } catch(e) {
                console.error(e);
                return;
            }
        }
        return this;
    })();

    // for test your application, see: http://joticode.com/jsboost/docs/test
    _test_ = function() {
        let _sel = sel;
        let keys = Object.keys(_sel);
        (keys.length > 0) ? 
            keys.forEach(function(index) {
                console.log("test_1", typeof _sel, _sel.length, _sel[index]);
            }) : (_sel) ?
                console.log("test_2", typeof _sel, _sel.length, _sel) :
                console.error("test", typeof _sel, _sel.length, _sel);
        return this;
    };

    exception = function(msg){
        throw err = msg;
        return err;
    }

    on = function(ev, callback) {
        let _sel = sel;
        let keys = Object.keys(_sel);
        try {
            switch(ev) {
                case "click":
                (keys.length > 0) ? 
                    keys.forEach(function(index) {
                        _sel[index].addEventListener("click", function(e){
                            e.preventDefault();
                            callback(this.text || null);
                            //console.log("on.click-1", _sel[index], this.text.trim(), keys, index);
                        });
                    }) : (_sel) ?
                        _sel.addEventListener("click", function(e){
                            e.preventDefault();
                            callback(this.text || null);
                            //console.log("on.click-2", _sel, (this.text) ? this.text.trim() : null);
                        }) : console.error("on.click", typeof _sel, _sel.length, _sel);
                break;

                case "change": //TODO: new events
                break;

                default:
                    throw err = "Event [" + ev + "] not found for on event!";

            }

        } catch(err) {
            console.error(err);
        }
        return this;
    };

    text = function(i) {
        return (i) ? this.sel[i].text : this.sel.text;
    }

    click = function(callback) {
        let _sel = sel;
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
    }

    nodeParent = function(parentItem, item) {
        let _sel = sel[item];
        (_sel.parentElement.className === parentItem.replace("\.", "")) ?
            window.c = _sel.parentElement :
            "";
        return this;
    };

    addClass = function(val) {
        (window.c) ? window.c.attributes.class.value += " " + val : "";
        return this;
    };

    removeClass = function(classname) {
        let _sel = sel;
        let keys = Object.keys(_sel);
        try {
            (keys.length > 0) ?
                keys.forEach(function(i){
                    (typeof _sel[i] !== "undefined") ? _sel[i].classList.remove(classname) : undefined;
                }) : exception("Selector ("+window.selector+") not found");
        } catch(err) {
            console.error(err);
        }
        return this;
    };

    attr = function(type, value) {
        //TODO: Criar opcoes de atributos alem do src
        try {
            let _sel = sel;
            (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                _sel.forEach(function(a, index, el) {
                    _sel[index].attributes.src.value = value;
                }) : (_sel) ?
                    _sel.attributes.src.value = value : err = "attr() error " + type;
        } catch(err) {
            console.error(err);
        }
        return this;
    };

    html = function(text) {
        try {
            let _sel = sel;
            (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                _sel.forEach(function(a, index, el) {
                    _sel[index].innerHTML = text;
                }) : (_sel) ?
                    _sel.innerHTML = text : err = "html() error " + type;
        } catch(err) {
            console.error(err);
        }
        return this;
    };

    append = function(text) {
        try {
            let _sel = sel;
            (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                _sel.forEach(function(a, index, el) {
                    _sel[index].innerHTML += text;
                }) : (_sel) ?
                    _sel.innerHTML += text : err = "append() error " + type;
        } catch(err) {
            console.error(err);
        }
        return this;
    };

    display = function(value) {
        try {
            let _sel = sel;
            (_sel && _sel === "object" || Array.isArray(_sel)) ? 
                _sel.forEach(function(a, index, el) {
                    _sel[index].style.display = value;
                }) : (_sel) ?
                    _sel.style.display = value : err = "display() error " + type;
        } catch(err) {
            console.error(err);
        }
        return this;
    };
    
    /* FadeIn FadeOut Effects Controls */
    var fadeCtrl = null;

    fadeIn = function(p) {
        clearInterval(fadeCtrl);
        var _opacity  = 0; //0....100
        //copy current target tag (noConflict)
        let _element  = sel;
        let _selector = selector;
        
        // CSS Reset Element
        _element.style.display = "block";
        
        //Cross Browser CSS > IE
        if( userAgent.indexOf( 'msie' ) != -1 ) {
            _element.style.filter  = "alpha(opacity=0)";
        } else { _element.style.opacity = 0; }

        fadeCtrl = setInterval(function(){
            if((_opacity >= 100)) {
                clearInterval(fadeCtrl);

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
    }

    fadeOut = function(p) {
        clearInterval(fadeCtrl);
        var _opacity  = 100; //100....0
        //copy current target tag (noConflict)
        let _element  = sel;
        let _selector = selector;
        
        fadeCtrl = setInterval(function(){
            if((_opacity <= 0)) {
                clearInterval(fadeCtrl);
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
    }

	modal = function(params) {
        try {
            if(params === undefined) {
                throw err = "Modal params missing !";
            }
            let ac = params.action;
            let bg = params.bgscreen;
            let bx = params.boxmodel;
            let ef = params.effect;
            //copy current target tag (noConflict)
            let _selector = selector;

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
	}

    loaded = function(callback) {
        window.onload = function() {
            callback();
        }
    }

    return this;
});

//No Conflict Resolved
var _jsHunt = window.jsHunt,
    _$$      = window.$$;

jsHunt.noConflict = function( digger ) {
    if(window.$$ === jsHunt) {
        window.$$ = _$$;
    }
    if(digger && window.jsHunt === jsHunt) {
        window.jsHunt = _jsHunt;
    }
    return jsHunt;
};

jsHunt.noConflict();

if ( typeof noGlobal === typeof undefined ) {
    window.jsHunt = window.$$ = jsHunt;
}