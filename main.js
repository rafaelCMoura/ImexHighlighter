define(function (require, exports, module) {
	'use strict';


    // Defining a new CodeMirror mode to use with brackets:
    CodeMirror.defineMode("imex", function (config, parserConfig) {
        
    });
    
    CodeMirror.defineMIME("text/imex", {
        
    });

    var LanguageManager = brackets.getModule("language/LanguageManager");
    
    LanguageManager.defineLanguage("imex", {
        name: "IMEX",
        mode: ["IMEX", "text/imex"],
        fileExtensions: [".dat"],
        blockComment: ["*", "*"], // Verificar comentario
        lineComment: ["**"]       // Verificar
    });
    
    
    
});