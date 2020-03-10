
import {jsBoostEvent}   from '../vendor/jsboost/jsboost-event.js';
import {jsBoostRequest} from '../vendor/jsboost/jsboost-request.js';

import {jsBoostWidgets} from '../vendor/jsboost/jsboost-widget.js';


import {jsBoost}   from '../vendor/jsboost/jsboost-event.js';

$(document).ready(function() {
    jsBoostEvent.init();
    jsBoostRequest.getName();
    jsBoostRequest.getData();

    // Teste de acesso subnivel
    jsBoost.Event.init();
    
    jsBoostWidgets("#flextransition").click(function(){
    	jsBoostWidgets().flyToRight("#container", "#flextransition");
    });

});
