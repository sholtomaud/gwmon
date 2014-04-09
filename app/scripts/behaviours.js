module.exports = function(gaffa){
    var behaviours = {
        ModelChange : require('gaffa-model-change'),
        PageLoad : require('gaffa-page-load')
    };

    for(var key in behaviours){
        gaffa.registerConstructor(behaviours[key]);
    }

    return behaviours;
};