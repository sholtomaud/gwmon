module.exports = function(gaffa){
    var views = {
        Container : require('gaffa-container'),
        Heading : require('gaffa-heading'),
        List : require('gaffa-list'),
        Group : require('gaffa-group'),
        Form : require('gaffa-form'),
        Label : require('gaffa-label'),
        Text : require('gaffa-text'),
        Button : require('gaffa-button'),
        Anchor : require('gaffa-anchor'),
        Image : require('gaffa-image'),
        Html : require('gaffa-html'),
        Textbox : require('gaffa-textbox'),
        Checkbox : require('gaffa-checkbox')
    };

    for(var key in views){
        gaffa.registerConstructor(views[key]);
    }

    return views;
};