module.exports = function(gaffa){
    var actions = {
        Navigate : require('gaffa-navigate'),
        Set : require('gaffa-set'),
        Ajax : require('gaffa-ajax'),
        Push : require('gaffa-push'),
        Remove : require('gaffa-remove'),
        Toggle : require('gaffa-toggle'),
        Conditional : require('gaffa-conditional'),
        Clean : require('gaffa-clean'),
        BrowserStorage : require('gaffa-browser-storage')
    };

    for(var key in actions){
        gaffa.registerConstructor(actions[key]);
    }

    return actions;
};