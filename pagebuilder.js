var statham = require('statham'),
    addEventListener = function(){},
    window = {
        addEventListener: addEventListener,
        document: {
            addEventListener: addEventListener
        }
    };

GLOBAL.window = window;
GLOBAL.document = window.document;

function buildPage(appPath, pagePath){

    // So the files are actually latest.
    for(var key in require.cache){
        delete require.cache[key];
    }

    var app = require(appPath),
        page = {
            views: [require(pagePath)(app)]
        };

    return statham.stringify(page);
}

module.exports = buildPage;