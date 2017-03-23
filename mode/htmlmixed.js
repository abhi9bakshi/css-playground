'use strict';(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],d):d(CodeMirror)})(function(d){function p(f){var c=k[f];return c?c:k[f]=new RegExp("\\s+"+f+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")}function q(f,c){return(f=f.match(p(c)))?/^\s*(.*?)\s*$/.exec(f[2])[1]:
""}function l(f,c){for(var d in f)for(var g=c[d]||(c[d]=[]),h=f[d],e=h.length-1;0<=e;e--)g.unshift(h[e])}function r(d,c){for(var f=0;f<d.length;f++){var g=d[f];if(!g[0]||g[1].test(q(c,g[0])))return g[2]}}var t={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],
[null,null,"css"]]},k={};d.defineMode("htmlmixed",function(f,c){function k(a,b){var c=g.token(a,b.htmlState),e=/\btag\b/.test(c),m;if(e&&!/[<>\s\/]/.test(a.current())&&(m=b.htmlState.tagName&&b.htmlState.tagName.toLowerCase())&&h.hasOwnProperty(m))b.inTag=m+" ";else if(b.inTag&&e&&/>$/.test(a.current())){e=/^([\S]+) (.*)/.exec(b.inTag);b.inTag=null;a=">"==a.current()&&r(h[e[1]],e[2]);a=d.getMode(f,a);var l=new RegExp("^</s*"+e[1]+"s*>","i"),n=new RegExp("</s*"+e[1]+"s*>","i");b.token=function(a,b){if(a.match(l,
!1))return b.token=k,b.localState=b.localMode=null;b=b.localMode.token(a,b.localState);var c=a.current(),d=c.search(n);-1<d?a.backUp(c.length-d):c.match(/<\/?$/)&&(a.backUp(c.length),a.match(n,!1)||a.match(c));return b};b.localMode=a;b.localState=d.startState(a,g.indent(b.htmlState,""))}else b.inTag&&(b.inTag+=a.current(),a.eol()&&(b.inTag+=" "));return c}var g=d.getMode(f,{name:"xml",htmlMode:!0,multilineTagIndentFactor:c.multilineTagIndentFactor,multilineTagIndentPastTag:c.multilineTagIndentPastTag}),
h={},e=c&&c.tags;c=c&&c.scriptTypes;l(t,h);e&&l(e,h);if(c)for(e=c.length-1;0<=e;e--)h.script.unshift(["type",c[e].matches,c[e].mode]);return{startState:function(){var a=d.startState(g);return{token:k,inTag:null,localMode:null,localState:null,htmlState:a}},copyState:function(a){var b;a.localState&&(b=d.copyState(a.localMode,a.localState));return{token:a.token,inTag:a.inTag,localMode:a.localMode,localState:b,htmlState:d.copyState(g,a.htmlState)}},token:function(a,b){return b.token(a,b)},indent:function(a,
b){return!a.localMode||/^\s*<\//.test(b)?g.indent(a.htmlState,b):a.localMode.indent?a.localMode.indent(a.localState,b):d.Pass},innerMode:function(a){return{state:a.localState||a.htmlState,mode:a.localMode||g}}}},"xml","javascript","css");d.defineMIME("text/html","htmlmixed")});
