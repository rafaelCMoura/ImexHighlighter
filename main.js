define(function (require, exports, module) {
	'use strict';

    brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    
    // Defining a new CodeMirror mode to use with brackets:
    CodeMirror.defineMode("imex", function (config, parseConfig) {
        
        var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
        ExtensionUtils.loadStyleSheet(module, "styles/styles.css");
        
        return {
            token: function (stream, state) {
            
                // Comments (Adicionar um regex q ignore o ** BR )
                if (stream.match(/\*\*.*/)) {
                    stream.skipToEnd();
                    return 'imex_comment';
                }
        
                // String
                if (stream.match(/(".*")/)) {
                    stream.skipToEnd();
                    return 'imex_string';
                }
        
                // Number
                if (stream.match(/^(-?[1-9]+\\d*([.]\\d+)?)$|^(-?0[.]\\d*[1-9]+)$|^0$/)) {
                    return 'imex_number';
                }
                
                // Keyword
                if (stream.match(/(por|POR|\*POR)/)) {
                    return 'imex_card';
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