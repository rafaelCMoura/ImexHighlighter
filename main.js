define(function (require, exports, module) {
	'use strict';

    brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    
    // Defining a new CodeMirror mode to use with brackets:
    CodeMirror.defineMode("imex", function (config, parseConfig) {
        
        var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
        ExtensionUtils.loadStyleSheet(module, "styles/styles.css");
        
        return {
            token: function (stream, state) {
            
                // Comments
                if (stream.match(/\*\*.*/)) {
                    stream.skipToEnd();
                    return 'imex_comment';
                }
        
                // String
                if (stream.match(/("([^"'])*"|'[^'"]*')/)) {
                    return 'imex_string';
                }
        
                // Number
                if (stream.match(/(\d*\.\d\d*|\d+)/)) {
                    return 'imex_number';
                }
                
                // Keyword IO
                if (stream.match(/(\*|)(RESULTS|SIMULATOR|IMEX|TITLE1|TITLE2|TITLE3|CASEID|INUNIT|FIELD|WPRN|TIME|ITER|BRIEF|RES|OUTPRN|TABLES|NONE|WSRF|OUTSRF|WRST|DEBUG|PDUMP|PRES|GRID|CART|CON|DEPTH|POR|CPOR|PRPOR|PERMI|PERMJ|PERMK|REFINE|INTO|MODEL|BLACKOIL|PVT|DENSITY|BWI|REFPW|VWI|ROCKFLUID|RPT|SWT|SLT|INITIAL|VERTICAL|BLOCK_CENTER|REFDEPTH|REFPRES|DWOC|DGOC|NUMERICAL|DTMAX|NORM|PRESS|SATUR|WELL|DTWELL|DYNAGRID|DEREFINE|PRODUCER|INJECTOR|MONITOR|OPERATE|DATE|PERFV|GEOMETRY|ALTER)/)) {
                    return 'imex_card_main';
                }
                
                // Keyword WATER
                if (stream.match(/(\*|)(MIN|MAX|STG|BHP|STO|GOR|WCUT|GEO|SHUTIN|CONT|REPEAT)/)) {
                    return 'imex_card_sub';
                }
                
                // Keyword WATER
                if (stream.match(/(\*|)(WATER|SW|CW|CVW)/)) {
                    return 'imex_card_water';
                }
                
                // Keyword OIL
                if (stream.match(/(\*|)(OIL|SO|CO|CVO)/)) {
                    return 'imex_card_oil';
                }
                
                // Keyword GAS
                if (stream.match(/(\*|)(GAS|SG)/)) {
                    return 'imex_card_gas';
                }
                
                // Keyword I
                if (stream.match(/(\*|)(DI|IVAR|DK)/)) {
                    return 'imex_card_i';
                }
                
                // Keyword J
                if (stream.match(/(\*|)(DJ|JVAR|DK)/)) {
                    return 'imex_card_j';
                }
                
                // Keyword K
                if (stream.match(/(\*|)(DK|KVAR|DK)/)) {
                    return 'imex_card_k';
                }
                
                
                // Keyword RUN
                if (stream.match(/(\*|)RUN/)) {
                    return 'imex_card_run';
                }
                
                // Keyword STOP
                if (stream.match(/(\*|)STOP/)) {
                    return 'imex_card_stop';
                }
                
                // Easter egg
                if (stream.match(/Rafael Cabral de Moura/)) {
                    return 'imex_magic';
                }
                
                // BR Logo
                if (stream.match(/\sBR\s/)) {
                    return 'imex_BR';
                }
                
                // Skip everything else
                stream.eat(/./);
            },
            startState: function(){ return {inComment: false}; }
        };
    });
    
    CodeMirror.defineMIME("text/imex", "imex");
    
    var LanguageManager = brackets.getModule("language/LanguageManager");
    
    LanguageManager.defineLanguage("imex", {
        name: "imex",
        mode: ["imex", "text/imex"],
        fileExtensions: [".dat"],
        blockComment: ["**", "**"],
        lineComment: ["**"]
    });
    
});