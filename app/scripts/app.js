/*------------------------------------------------------------------------------------------------------------------------
@author: sholto maud
@www: http://www.yourwebsite.com (optional)
@github: shotlom

@twitter: yourTwitterUsername

@copyright: COPYRIGHT 2013 Chromicon
=============================================================================
Filename: app.js
=============================================================================
This file is the main javascript file for the Chromicon application.
--------------------------------------------------------------------------------------------------------------------- */

var Gaffa = require('gaffa'),
    gaffa = new Gaffa(),
    app = {},
    views = app.views = require('./views')(gaffa),
    actions = app.actions = require('./actions')(gaffa),
    behaviours = app.behaviours = require('./behaviours')(gaffa),
    createAppWrapper = require('./controls/appWrapper')(app);

window.gaffa = app.gaffa = gaffa;

gaffa.model.set(require('./model'));

// Add the views on load.
// This inserts them into the DOM.
window.addEventListener('load', function(){
    if ( !supports_html5_storage() ){
        alert("This browser does not support offline localStorage. Please try using a modern browser like Google Chrome.");
    }

    gaffa.views.add(createAppWrapper());
});

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

module.exports = app;