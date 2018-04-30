var pxt;!function(o){!function(e){e.startDebuggerAsync=function(e){new n(e).start()};var n=function(){function n(e){this.container=e,this.pkgLoaded=!1,this.intervalRunning=!1}return n.prototype.start=function(){var e=this;this.initializeWebsocket(),this.intervalRunning||(this.intervalRunning=!0,this.intervalId=setInterval(function(){if(!e.ws)try{e.initializeWebsocket()}catch(e){console.warn("Connection to server failed, retrying in "+n.RETRY_MS+" ms")}},n.RETRY_MS)),this.session=new pxsim.SimDebugSession(this.container),this.session.start(this)},n.prototype.initializeWebsocket=function(){var t=this;o.Cloud.isLocalHost()&&o.Cloud.localToken&&(o.debug("initializing debug pipe"),this.ws=new WebSocket("ws://localhost:3234/"+o.Cloud.localToken+"/simdebug"),this.ws.onopen=function(e){o.debug("debug: socket opened")},this.ws.onclose=function(e){o.debug("debug: socket closed"),t.closeListener&&t.closeListener(),t.session.stopSimulator(),t.ws=void 0},this.ws.onerror=function(e){o.debug("debug: socket closed due to error"),t.errorListener&&t.errorListener(e.type),t.session.stopSimulator(),t.ws=void 0},this.ws.onmessage=function(e){var n;try{n=JSON.parse(e.data)}catch(e){o.debug("debug: could not parse message")}n&&("runner"===n.type?t.handleRunnerMessage(n):("request"===n.type&&"launch"===n.command&&t.sendRunnerMessage("configure",{projectDir:n.arguments.projectDir}),t.dataListener(n)))})},n.prototype.send=function(e){this.ws.send(e)},n.prototype.onData=function(e){this.dataListener=e},n.prototype.onError=function(e){this.errorListener=e},n.prototype.onClose=function(e){this.closeListener=e},n.prototype.close=function(){this.session&&this.session.stopSimulator(!0),this.intervalRunning&&(clearInterval(this.intervalId),this.intervalId=void 0),this.ws&&this.ws.close()},n.prototype.handleRunnerMessage=function(e){switch(e.subtype){case"ready":this.sendRunnerMessage("ready");break;case"runcode":this.runCode(e)}},n.prototype.runCode=function(e){var n=[];e.breakpoints.forEach(function(e){n.push([e.id,{verified:!0,line:e.line,column:e.column,endLine:e.endLine,endColumn:e.endColumn,source:{path:e.fileName}}])}),this.session.runCode(e.code,e.usedParts,e.usedArguments,new pxsim.BreakpointMap(n),o.appTarget.simulator.boardDefinition)},n.prototype.sendRunnerMessage=function(e,n){void 0===n&&(n={}),n.subtype=e,n.type="runner",this.send(JSON.stringify(n))},n.RETRY_MS=2500,n}();e.DebugRunner=n}(o.runner||(o.runner={}))}(pxt||(pxt={})),function(x){!function(e){function b(e,n){e.append($('<div class="ui content blocks"/>').append(n))}function w(e,n,t){e.append($('<div class="ui content js"/>').append(n)),"undefined"!=typeof hljs&&n.find("code.highlight").each(function(e,n){hljs.highlightBlock(n)})}function l(t,e,o,n,i,r){void 0===r&&(r={});x.webConfig.commitCdnUrl;var a=$('<div class="ui bottom attached tabular icon small compact menu hideprint"> <div class="right icon menu"></div></div>'),s=$('<div class="ui top attached segment nobreak"></div>'),c=a.find(".right.menu"),l=x.appTarget.appTheme||{};if(r.showEdit&&!l.hideDocsEdit){var d=$('<a class="item" role="button" tabindex="0" aria-label="'+lf("edit")+'"><i role="presentation" aria-hidden="true" class="edit icon"></i></a>').click(function(){i.package.compressToFileAsync(t.showJavaScript?x.JAVASCRIPT_PROJECT_NAME:x.BLOCKS_PROJECT_NAME).done(function(e){return window.open((t.pxtUrl||x.appTarget.appTheme.homeUrl||"").replace(/\/$/,"")+"/#project:"+ts.pxtc.encodeBase64(x.Util.uint8ArrayToString(e)),"pxt")})});c.append(d)}if(t.showJavaScript||!n){if(s.append(o),n){var p=$('<a class="item blocks" role="button" tabindex="0" aria-label="'+lf("Blocks")+'"><i role="presentation" aria-hidden="true" class="puzzle icon"></i></a>').click(function(){s.find(".blocks")[0]?s.find(".blocks").remove():b(o?o.parent():s,n)});c.append(p)}}else if(s.append(n),r.showJs)w(s,o);else{var u=$('<a class="item js" role="button" tabindex="0" aria-label="'+lf("JavaScript")+'"><i role="presentation" aria-hidden="true" class="align left icon"></i></a>').click(function(){s.find(".js")[0]?s.find(".js").remove():w(n?n.parent():s,o)});c.append(u)}if(r.run&&!l.hideDocsSimulator){var m=$('<a class="item" role="button" tabindex="0" aria-label="'+lf("run")+'"><i role="presentation" aria-hidden="true" class="play icon"></i></a>').click(function(){if(s.find(".sim")[0])s.find(".sim").remove();else{var e="81.97%";x.appTarget.simulator&&(e=100/x.appTarget.simulator.aspectRatio+"%");var n=$('<div class="ui card sim"><div class="ui content"><div style="position:relative;height:0;padding-bottom:'+e+';overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="'+y(t)+"#nofooter=1&code="+encodeURIComponent(o.text())+'" allowfullscreen="allowfullscreen" sandbox="allow-popups allow-forms allow-scripts allow-same-origin" frameborder="0"></iframe></div></div></div>');s.append(n)}});c.append(m)}if(r.hexname&&r.hex){var f=$('<a class="item" role="button" tabindex="0" aria-label="'+lf("download")+'"><i role="presentation" aria-hidden="true" class="download icon"></i></a>').click(function(){x.BrowserUtils.browserDownloadBinText(r.hex,r.hexname,x.appTarget.compile.hexMimeType)});c.append(f)}var g=[s];if(c.children().length&&g.push(a),e.replaceWith(g),t.downloadScreenshots&&r.hexname){x.debug("Downloading screenshot for: "+r.hexname);var h=r.hexname.substr(0,r.hexname.lastIndexOf(".")),v=(window.getComputedStyle(n.get(0).getElementsByClassName("blocklyText").item(0)).getPropertyValue("font-size"),n.get(0)),k=n.get(0).getBoundingClientRect();x.blocks.layout.svgToPngAsync(v,0,0,k.width,k.height,4).done(function(e){e&&x.BrowserUtils.browserDownloadDataUri(e,(name||(x.appTarget.nickname||x.appTarget.id)+"-"+h)+".png")})}}function r(n,t,o){if(!n)return Promise.resolve();var i=$("."+n).first();return i[0]?(o.emPixels||(o.emPixels=14),o.layout||(o.layout=x.blocks.BlockLayout.Flow),x.runner.decompileToBlocksAsync(i.text(),o).then(function(e){try{t(i,e)}catch(e){console.error("error while rendering "+i.html()),i.append($("<div/>").addClass("ui segment warning").text(e.message))}return i.removeClass(n),Promise.delay(1,r(n,t,o))})):Promise.resolve()}function m(e){if(!e||e.kind!=ts.SyntaxKind.ExpressionStatement)return null;var n=e;return n.expression&&n.expression.kind==ts.SyntaxKind.CallExpression?n.expression.callInfo:null}function n(e,n,o,p){return r(n,function(e,l){if(l.compileJS){var n=l.compileJS.ast.getSourceFile("main.ts").statements.slice(0).reverse(),t=$("<div />").addClass("ui cards");t.attr("role","listbox");var d=function(e){e&&t.append(x.docs.codeCard.render(e,{hideHeader:!0,shortName:!0}))};n.forEach(function(e){var n=m(e);if(n){var t=Blockly.Blocks[n.attrs.blockId];if(p){var o=l.compileBlocks.blocksInfo.apis.byQName[n.qName],i=l.compileBlocks.blocksInfo.apis.byQName[o.namespace];d({name:i.attributes.blockNamespace||i.name,url:i.attributes.help||"reference/"+(i.attributes.blockNamespace||i.name).toLowerCase(),description:i.attributes.jsDoc,blocksXml:t&&t.codeCard?t.codeCard.blocksXml:n.attrs.blockId?'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="'+n.attrs.blockId+'"></block></xml>':void 0})}else if(t){var r=x.U.clone(t.codeCard);r&&d(r)}else d({name:n.qName,description:n.attrs.jsDoc,url:n.attrs.help||void 0})}else switch(e.kind){case ts.SyntaxKind.ExpressionStatement:var a=e;switch(a.expression.kind){case ts.SyntaxKind.TrueKeyword:case ts.SyntaxKind.FalseKeyword:d({name:"Boolean",url:"blocks/logic/boolean",description:lf("True or false values"),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></xml>'});break;default:x.debug("card expr kind: "+a.expression.kind)}break;case ts.SyntaxKind.IfStatement:d({name:p?"Logic":"if",url:"blocks/logic"+(p?"":"/if"),description:p?lf("Logic operators and constants"):lf("Conditional statement"),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_if"></block></xml>'});break;case ts.SyntaxKind.WhileStatement:d({name:p?"Loops":"while",url:"blocks/loops"+(p?"":"/while"),description:p?lf("Loops and repetition"):lf("Repeat code while a condition is true."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="device_while"></block></xml>'});break;case ts.SyntaxKind.ForOfStatement:d({name:p?"Loops":"for of",url:"blocks/loops"+(p?"":"/for-of"),description:p?lf("Loops and repetition"):lf("Repeat code for each item in a list."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_for_of"></block></xml>'});break;case ts.SyntaxKind.ForStatement:var s=e,c=!0;3==s.condition.getChildCount()&&(c=!("0"==s.condition.getChildAt(0).getText()||s.condition.getChildAt(1).kind==ts.SyntaxKind.LessThanToken)),d(c?{name:p?"Loops":"for",url:"blocks/loops"+(p?"":"/for"),description:p?lf("Loops and repetition"):lf("Repeat code for a given number of times using an index."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_simple_for"></block></xml>'}:{name:p?"Loops":"repeat",url:"blocks/loops"+(p?"":"/repeat"),description:p?lf("Loops and repetition"):lf("Repeat code for a given number of times."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_repeat_ext"></block></xml>'});break;case ts.SyntaxKind.VariableStatement:d({name:p?"Variables":"variable declaration",url:"blocks/variables"+(p?"":"/assign"),description:p?lf("Variables"):lf("Assign a value to a named variable."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set"></block></xml>'});break;default:x.debug("card kind: "+e.kind)}}),o&&(e=e.parent()),e.replaceWith(t)}},{package:e.package,aspectRatio:e.blocksAspectRatio})}function s(e,n){if(!e)return Promise.resolve();var t,o=$("."+e).first();if(!o[0])return Promise.resolve();o.removeClass(e);try{var i=JSON.parse(o.text());Array.isArray(i)||(i=[i]),t=i}catch(e){console.error("error while rendering "+o.html()),o.append($("<div/>").addClass("ui segment warning").text(e.messageText))}return n.snippetReplaceParent&&(o=o.parent()),function(e,n,i){if(!n||0==n.length)return Promise.resolve();if(0==n.length){var t=x.docs.codeCard.render(n[0],i);e.replaceWith(t)}else{var r=document.createElement("div");r.className="ui cards",r.setAttribute("role","listbox"),n.forEach(function(n){var t=x.docs.codeCard.render(n,i);if(r.appendChild(t),"package"==n.cardType){var o=x.github.parseRepoId((n.url||"").replace(/^\/pkg\//,""));o&&x.packagesConfigAsync().then(function(e){switch(x.github.repoStatus(o,e)){case x.github.GitRepoStatus.Banned:t.remove();break;case x.github.GitRepoStatus.Approved:n.imageUrl=x.github.mkRepoIconUrl(o),r.insertBefore(x.docs.codeCard.render(n,i),t),t.remove()}}).catch(function(e){x.debug("failed to load repo "+n.url)})}}),e.replaceWith(r)}return Promise.resolve()}(o,t,{hideHeader:!0}).then(function(){return Promise.delay(1,s(e,n))})}function y(e){return e.pxtUrl?e.pxtUrl+"/--run":x.webConfig&&x.webConfig.runUrl?x.webConfig.runUrl:"/--run"}(x.runner||(x.runner={})).renderAsync=function(a){var i;return a||(a={}),a.pxtUrl&&(a.pxtUrl=a.pxtUrl.replace(/\/$/,"")),a.showEdit&&(a.showEdit=!x.BrowserUtils.isIFrame()),(i=a).packageClass&&$("."+i.packageClass).each(function(e,n){var t=$(n),o=t.text().split("\n").map(function(e){return e.replace(/\s*/g,"")}).filter(function(e){return!!e}).join(",");i.package=i.package?i.package+","+o:o,i.snippetReplaceParent&&(t=t.parent()),t.remove()}),a.simulatorClass&&$("."+a.simulatorClass).each(function(e,n){var t=$(n),o="81.97%";x.appTarget.simulator&&(o=100/x.appTarget.simulator.aspectRatio+"%");var i=$('<div class="ui centered card"><div class="ui content">\n                    <div style="position:relative;height:0;padding-bottom:'+o+';overflow:hidden;">\n                    <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-popups allow-forms allow-scripts allow-same-origin"></iframe>\n                    </div>\n                    </div></div>');i.find("iframe").attr("src",y(a)+"#nofooter=1&code="+encodeURIComponent(t.text().trim())),a.snippetReplaceParent&&(t=t.parent()),t.replaceWith(i)}),function(o){var i={showEdit:!!o.showEdit,run:!!o.simulator};function t(e,n){"undefined"!=typeof hljs&&($(e).text($(e).text().replace(/^\s*\r?\n/,"")),hljs.highlightBlock(e));var t=x.U.clone(i);n&&(t.run=!1,t.showEdit=!1),l(o,$(e).parent(),$(e),void 0,void 0,t)}$("code.lang-typescript").each(function(e,n){t(n,!1),$(n).removeClass("lang-typescript")}),$("code.lang-typescript-ignore").each(function(e,n){t(n,!0),$(n).removeClass("lang-typescript-ignore")})}(a),Promise.resolve().then(function(){return e=a,"core"==x.appTarget.id?Promise.resolve():x.runner.decompileToBlocksAsync("",e).then(function(e){var o={},i=e.compileBlocks.blocksInfo;i.blocks.forEach(function(e){var n=(e.attributes.blockNamespace||e.namespace).split(".")[0];if(!o[n]){var t=i.apis.byQName[n];t&&t.attributes.color&&(o[n]=t.attributes.color)}});var t="";return Object.keys(o).forEach(function(e){var n=o[e]||"#dddddd";t+="\n                        span.docs."+e.toLowerCase()+" {\n                            background-color: "+n+" !important;\n                            border-color: "+x.toolbox.fadeColor(n,.2,!0)+" !important;\n                        }\n                    "}),t}).then(function(t){return Object.keys(x.toolbox.blockColors).forEach(function(e){var n=x.toolbox.blockColors[e];t+="\n                        span.docs."+e.toLowerCase()+" {\n                            background-color: "+n+" !important;\n                            border-color: "+x.toolbox.fadeColor(n,.2,!0)+" !important;\n                        }\n                    "}),t}).then(function(e){var n=document.createElement("style");n.id="namespaceColors",n.type="text/css",(document.head||document.getElementsByTagName("head")[0]).appendChild(n),n.appendChild(document.createTextNode(e))});var e}).then(function(){return function(d){(d=x.Util.clone(d)).emPixels=18,d.snippetMode=!0;var p=$(":not(pre) > code"),u=0;return function o(){if(u>=p.length)return Promise.resolve();var i=$(p[u++]),e=i.text(),n=/^(\|+)([^\|]+)\|+$/.exec(e);if(n){var t=/^(([^\:\.]*?)[\:\.])?(.*)$/.exec(n[2]),r=t[2]?t[2].trim().toLowerCase():"",a=1==n[1].length?"docs inlinebutton "+r:"docs inlineblock "+r,s=t[3].trim();return i.replaceWith($('<span class="'+a+'"/>').text(x.U.rlf(s))),o()}var c=/^\[([^\]]+)\]$/.exec(e);if(!c)return o();var l=c[1];return x.runner.decompileToBlocksAsync(l,d).then(function(e){if(e.blocksSvg){var n=$('<span class="block"/>').append(e.blocksSvg),t=m(e.compileJS.ast.getSourceFile("main.ts").statements[0]);t&&t.attrs.help&&(n=$('<a class="ui link"/>').attr("href","/reference/"+t.attrs.help).append(n)),i.replaceWith(n)}return Promise.delay(1,o())})}()}(a)}).then(function(){return n(a,a.linksClass,a.snippetReplaceParent,!1)}).then(function(){return n(a,a.namespacesClass,a.snippetReplaceParent,!0)}).then(function(){return r((c=a).signatureClass,function(e,n){if(n.compileJS){var t=m(n.compileJS.ast.getSourceFile("main.ts").statements[0]);if(t){var o=Blockly.Blocks[t.attrs.blockId],i=o&&o.codeCard?o.codeCard.blocksXml:void 0,r=i?$(x.blocks.render(i)):n.compileBlocks&&n.compileBlocks.success?$(n.blocksSvg):void 0,a=t.decl.getText().replace(/^export/,"");a=a.slice(0,a.indexOf("{")).trim()+";";var s=$('<code class="lang-typescript highlight"/>').text(a);c.snippetReplaceParent&&(e=e.parent()),l(c,e,s,r,n,{showJs:!0,hideGutter:!0})}}},{package:c.package,snippetMode:!0,aspectRatio:c.blocksAspectRatio});var c}).then(function(){return s(a.codeCardClass,a)}).then(function(){return function(s){if(s.tutorial)return r(s.snippetClass,function(e,n){var t=n.blocksSvg;s.snippetReplaceParent&&(e=e.parent());var o=$('<div class="ui segment"/>').append(t);e.replaceWith(o)},{package:s.package,snippetMode:!1,aspectRatio:s.blocksAspectRatio});var c=0;return r(s.snippetClass,function(e,n){var t=n.compileBlocks&&n.compileBlocks.success?$(n.blocksSvg):void 0,o=$('<code class="lang-typescript highlight"/>').text(e.text().trim());s.snippetReplaceParent&&(e=e.parent());var i=n.compileJS&&n.compileJS.success,r=s.hex&&i&&n.compileJS.outfiles[pxtc.BINARY_HEX]?n.compileJS.outfiles[pxtc.BINARY_HEX]:void 0,a=(x.appTarget.nickname||x.appTarget.id)+"-"+(s.hexName||"")+"-"+c+++".hex";l(s,e,o,t,n,{showEdit:s.showEdit,run:s.simulator&&i,hexname:a,hex:r})},{package:s.package,aspectRatio:s.blocksAspectRatio})}(a)}).then(function(){return r((i=a).blocksClass,function(e,n){var t=n.blocksSvg;i.snippetReplaceParent&&(e=e.parent());var o=$('<div class="ui segment"/>').append(t);e.replaceWith(o)},{package:i.package,snippetMode:!0,aspectRatio:i.blocksAspectRatio});var i}).then(function(){return(i=a).blocksXmlClass?function n(t,o,i){var r=$("."+t).first();return r[0]?(i.emPixels||(i.emPixels=14),x.runner.compileBlocksAsync(r.text(),i).then(function(e){try{o(r,e)}catch(e){console.error("error while rendering "+r.html()),r.append($("<div/>").addClass("ui segment warning").text(e.message))}return r.removeClass(t),Promise.delay(1,n(t,o,i))})):Promise.resolve()}(i.blocksXmlClass,function(e,n){var t=n.blocksSvg;i.snippetReplaceParent&&(e=e.parent());var o=$('<div class="ui segment"/>').append(t);e.replaceWith(o)},{package:i.package,snippetMode:!0,aspectRatio:i.blocksAspectRatio}):Promise.resolve();var i}).then(function(){return(r=a).projectClass?function e(){var n=$("."+r.projectClass).first(),t=n[0];if(!t)return Promise.resolve();n.removeClass(r.projectClass);var o=x.Cloud.parseScriptId(t.innerText);if(o){if(r.snippetReplaceParent){t=t.parentElement;var i=document.createElement("div");t.parentElement.insertBefore(i,t),t.parentElement.removeChild(t),t=i}return x.runner.renderProjectAsync(t,o).then(function(){return e()})}return e()}():Promise.resolve();var r})}}()}(pxt||(pxt={})),function(x){!function(l){var d,e,i=function(){function e(e,n){this.ksPkg=e,this.topPkg=n,this.files={}}return e.prototype.getKsPkg=function(){return this.ksPkg},e.prototype.getPkgId=function(){return this.ksPkg?this.ksPkg.id:this.id},e.prototype.isTopLevel=function(){return this.ksPkg&&0==this.ksPkg.level},e.prototype.setFiles=function(e){this.files=e},e.prototype.getAllFiles=function(){return x.Util.mapMap(this.files,function(e,n){return n})},e}(),s=function(){function e(){this.githubPackageCache={}}return e.prototype.readFile=function(e,n){var t=c(e);return x.U.lookup(t.files,n)},e.prototype.writeFile=function(e,n,t){if(n!=x.CONFIG_NAME)throw x.Util.oops("trying to write "+e+" / "+n)},e.prototype.getHexInfoAsync=function(e){return x.hex.getHexInfoAsync(this,e)},e.prototype.cacheStoreAsync=function(e,n){return Promise.resolve()},e.prototype.cacheGetAsync=function(e){return Promise.resolve(null)},e.prototype.downloadPackageAsync=function(o){var i=this,r=o.verProtocol(),a=void 0;"github"==r&&(a=this.githubPackageCache[o._verspec]);var s=c(o);return(a?Promise.resolve(a):o.commonDownloadAsync()).then(function(e){if(e)return"github"!=r||a||(i.githubPackageCache[o._verspec]=x.Util.clone(e)),s.setFiles(e),Promise.resolve();if("empty"==r)return s.setFiles(p()),Promise.resolve();if("docs"==r){var n=p(),t=JSON.parse(n[x.CONFIG_NAME]);return o.verArgument().split(",").forEach(function(e){var n=/^([a-zA-Z0-9_-]+)(=(.+))?$/.exec(e);n?t.dependencies[n[1]]=n[3]||"*":console.warn("unknown package syntax "+e)}),t.yotta||(t.yotta={}),t.yotta.ignoreConflicts=!0,n[x.CONFIG_NAME]=JSON.stringify(t,null,4),s.setFiles(n),Promise.resolve()}return Promise.reject("Cannot download "+o.version()+"; unknown protocol")})},e}();function c(e){var n=e._editorPkg;if(n)return n;var t=null;e!=l.mainPkg&&(t=c(l.mainPkg));var o=new i(e,t);return e==l.mainPkg&&(o.topPkg=o),e._editorPkg=o}function p(){var e=x.appTarget.tsprj,n=x.U.clone(e.files);return n[x.CONFIG_NAME]=JSON.stringify(e.config,null,4)+"\n",n["main.blocks"]="",n}function n(){x.setAppTarget(window.pxtTargetBundle),x.Util.assert(!!x.appTarget);var e=/PXT_LANG=(.*?)(?:;|$)/.exec(document.cookie),n=/(live)?(force)?lang=([a-z]{2,}(-[A-Z]+)?)/i.exec(window.location.href),t=n?n[3]:e&&e[1]||x.appTarget.appTheme.defaultLocale||navigator.userLanguage||navigator.language,o=!x.appTarget.appTheme.disableLiveTranslations||n&&!!n[1],i=!!n&&!!n[2],r=x.appTarget.versions;$&&$.fn&&$.fn.embed&&$.fn.embed.settings&&$.fn.embed.settings.sources&&$.fn.embed.settings.sources.youtube&&($.fn.embed.settings.sources.youtube.url="//www.youtube.com/embed/{id}?rel=0");var a=x.webConfig;return x.Util.updateLocalizationAsync(x.appTarget.id,!0,a.commitCdnUrl,t,r?r.pxtCrowdinBranch:"",r?r.targetCrowdinBranch:"",o,i).then(function(){l.mainPkg=new x.MainPackage(new s)})}function o(e){console.error(e)}function t(e,t){var n=l.mainPkg.host();return l.mainPkg=new x.MainPackage(n),l.mainPkg._verspec=e?/\w+:\w+/.test(e)?e:"pub:"+e:"empty:tsprj",n.downloadPackageAsync(l.mainPkg).then(function(){return n.readFile(l.mainPkg,x.CONFIG_NAME)}).then(function(e){return e?l.mainPkg.installAllAsync().then(function(){if(t){var e=c(l.mainPkg);e.files["main.ts"]=t;var n=JSON.parse(e.files[x.CONFIG_NAME]);n.name=window.location.href.split("/").pop().split(/[?#]/)[0],e.files[x.CONFIG_NAME]=JSON.stringify(n,null,4),l.mainPkg.config.name=n.name,-1==l.mainPkg.config.files.indexOf("main.blocks")&&l.mainPkg.config.files.push("main.blocks")}}).catch(function(e){o(lf("Cannot load package: {0}",e.message))}):Promise.resolve()})}function r(e){var n=l.mainPkg.getTargetOptions();return n.isNative=!!e,n.hasHex=!!e,l.mainPkg.getCompileOptionsAsync(n)}function a(e,t){return r().then(function(e){t&&t(e);var n=pxtc.compile(e);return n.diagnostics&&0<n.diagnostics.length&&n.diagnostics.forEach(function(e){console.error(e.messageText)}),n})}function u(e,n){if(l.languageMode=e,n!=l.editorLocale){var t=/^live-/;return l.editorLocale=n,x.Util.updateLocalizationAsync(x.appTarget.id,!0,x.webConfig.commitCdnUrl,l.editorLocale.replace(t,""),x.appTarget.versions.pxtCrowdinBranch,x.appTarget.versions.targetCrowdinBranch,t.test(l.editorLocale))}return Promise.resolve()}function m(e){var n=e.data;if(n)switch(n.type){case"fileloaded":var t=n,o=t.name;u(/\.ts$/i.test(o)?d.TypeScript:d.Blocks,t.locale).done();break;case"popout":var i=/#(doc|md):([^&?:]+)/i.exec(window.location.href);if(i){var r=x.webConfig.docsUrl||"/--docs",a="doc"==i[1]?""+i[2]:r+"?md="+i[2];window.open(a,"_blank"),window.parent&&window.parent.postMessage({type:"popoutcomplete"},"*")}break;case"localtoken":var s=n;s&&s.localToken&&(x.Cloud.localToken=s.localToken,y.forEach(function(e){return e()}),y=[])}}function f(){var e=Promise.resolve();if(x.appTarget.appTheme&&x.appTarget.appTheme.extendFieldEditors){var n={};e=e.then(function(){return x.BrowserUtils.loadBlocklyAsync()}).then(function(){return x.BrowserUtils.loadScriptAsync("fieldeditors.js")}).then(function(){return x.editor.initFieldExtensionsAsync(n)}).then(function(e){e.fieldEditors&&e.fieldEditors.forEach(function(e){x.blocks.registerFieldEditor(e.selector,e.editor,e.validator)})})}return e}function g(n,t,o){return void 0===o&&(o="blocks"),x.Cloud.privateGetTextAsync(t+"/text").then(function(e){return JSON.parse(e)}).then(function(e){return h(n,e,t,o)})}function h(e,n,t,o){void 0===t&&(t=null),void 0===o&&(o="blocks");var i=JSON.parse(n[x.CONFIG_NAME])||{},r="# "+i.name+" "+(i.version?i.version:"")+"\n\n";r+=t?"* "+(x.appTarget.appTheme.shareUrl||"https://makecode.com/")+t+"\n\n":"* "+x.appTarget.appTheme.homeUrl+"\n\n";var a="README.md";n[a]&&(r+=n[a].replace(/^#+/,"$0#")+"\n"),i.files.filter(function(e){return e!=x.CONFIG_NAME&&e!=a}).forEach(function(e){r+="\n## "+e+"\n",/\.ts$/.test(e)?r+="```typescript\n"+n[e]+"\n```\n":/\.blocks?$/.test(e)?r+="```blocksxml\n"+n[e]+"\n```\n":r+="```"+e.substr(e.indexOf("."))+"\n"+n[e]+"\n```\n"}),i&&i.dependencies&&(r+="\n## Packages\n\n"+Object.keys(i.dependencies).map(function(e){return"* "+e+", "+i.dependencies[e]}).join("\n")+"\n\n```package\n"+Object.keys(i.dependencies).map(function(e){return e+"="+i.dependencies[e]}).join("\n")+"\n```\n");return k(e,r,{print:!0})}l.initFooter=function(e,n){if(e){var t=x.appTarget.appTheme,o=$("body"),i=$(e),r=$("<a/>").attr("href",t.homeUrl).attr("target","_blank");i.append(r),t.organizationLogo?r.append($("<img/>").attr("src",x.Util.toDataUri(t.organizationLogo))):r.append(lf("powered by {0}",t.title)),o.mouseenter(function(e){return i.fadeOut()}),o.mouseleave(function(e){return i.fadeIn()})}},l.showError=o,l.generateHexFileAsync=function(n){return t(n.id).then(function(){return a(0,function(e){n.code&&(e.fileSystem["main.ts"]=n.code)})}).then(function(e){return e.diagnostics&&0<e.diagnostics.length&&console.error("Diagnostics",e.diagnostics),e.outfiles[pxtc.BINARY_HEX]})},l.simulateAsync=function(s,c){return t(c.id).then(function(){return a(0,function(e){c.code&&(e.fileSystem["main.ts"]=c.code)})}).then(function(e){e.diagnostics&&0<e.diagnostics.length&&console.error("Diagnostics",e.diagnostics);var n=e.outfiles[pxtc.BINARY_JS];if(n){var t=new pxsim.SimulatorDriver(s,{}),o=e.usedArguments,i=x.appTarget.simulator.boardDefinition,r=pxtc.computeUsedParts(e,!0),a={boardDefinition:i,parts:r,fnArgs:o,cdnUrl:x.webConfig.commitCdnUrl,localizedStrings:x.Util.getLocalizedStrings(),highContrast:c.highContrast,light:c.light};x.appTarget.simulator&&(a.aspectRatio=r.length&&x.appTarget.simulator.partsAspectRatio?x.appTarget.simulator.partsAspectRatio:x.appTarget.simulator.aspectRatio),t.run(n,a)}})},(e=d=l.LanguageMode||(l.LanguageMode={}))[e.Blocks=0]="Blocks",e[e.TypeScript=1]="TypeScript",l.languageMode=d.Blocks,l.editorLocale="en",l.setEditorContextAsync=u,l.startRenderServer=function(){x.tickEvent("renderer.ready");var o=[],i=void 0;f().done(function(){window.addEventListener("message",function(e){var n=e.data;"renderblocks"==n.type&&(o.push(n),function n(){if(!i){var t=o.shift();t&&(x.tickEvent("renderer.job"),i=l.decompileToBlocksAsync(t.code,t.options).then(function(e){return e.blocksSvg?x.blocks.layout.blocklyToSvgAsync(e.blocksSvg,0,0,e.blocksSvg.viewBox.baseVal.width,e.blocksSvg.viewBox.baseVal.height):void 0}).then(function(e){window.parent.postMessage({source:"makecode",type:"renderblocks",id:t.id,width:e?e.width:void 0,height:e?e.height:void 0,svg:e?e.svg:void 0,uri:e?e.xml:void 0,css:e?e.css:void 0},"*"),i=void 0,n()}))}}())},!1),window.parent.postMessage({source:"makecode",type:"renderready"},"*")})},l.startDocsServer=function(s,c){function n(r,a){x.debug("rendering "+r),$(c).hide(),$(s).show(),Promise.delay(100).then(function(){switch(r){case"project":return h(c,JSON.parse(a)).then(function(){return pxsim.print(1e3)});case"projectid":return g(c,JSON.parse(a)).then(function(){return pxsim.print(1e3)});case"doc":return n=c,i=(i=a).replace(/^\//,""),x.Cloud.downloadMarkdownAsync(i,l.editorLocale,x.Util.localizeLive).then(function(e){return k(n,e,{path:i})});case"tutorial":return $("body").addClass("tutorial"),$(s).hide(),b(c,a);case"book":return t=c,e=(e=a).replace(/^\//,""),x.tickEvent("book",{id:e}),x.log("rendering book from "+e),$("#loading").find(".loader").addClass("text").text(lf("Compiling your book (this may take a minute)")),Promise.delay(100).then(function(){return x.Cloud.downloadMarkdownAsync(e,l.editorLocale,x.Util.localizeLive)}).then(function(e){o=x.docs.buildTOC(e),x.log("TOC: "+JSON.stringify(o,null,2));var t=[];return x.docs.visitTOC(o,function(n){/^\//.test(n.path)&&!/^\/pkg\//.test(n.path)&&t.push(x.Cloud.downloadMarkdownAsync(n.path,l.editorLocale,x.Util.localizeLive).then(function(e){n.markdown=e},function(e){n.markdown="_"+n.path+" failed to load._"}))}),Promise.all(t)}).then(function(e){var n=o[0].name;return x.docs.visitTOC(o,function(e){e.markdown&&(n+="\n\n"+e.markdown)}),k(t,n)});default:return k(c,a)}var t,e,o,n,i}).catch(function(e){$(c).html('\n                    <img style="height:4em;" src="'+x.appTarget.appTheme.docsLogo+'" />\n                    <h1>'+lf("Oops")+"</h1>\n                    <h3>"+lf("We could not load the documentation, please check your internet connection.")+'</h3>\n                    <button class="ui button primary" id="tryagain">'+lf("Try Again")+"</button>"),$(c).find("#tryagain").click(function(){n(r,a)}),window.parent&&window.parent.postMessage({type:"docfailed",docType:r,src:a},"*")}).finally(function(){$(s).hide(),$(c).show()}).done(function(){})}function e(){var e=/^#(doc|md|tutorial|book|project|projectid):([^&?:]+)(:([^&?:]+):([^&?:]+))?/i.exec(window.location.hash);e&&(e[4]?u(/^blocks$/.test(e[4])?d.Blocks:d.TypeScript,e[5]):Promise.resolve()).then(function(){return n(e[1],decodeURIComponent(e[2]))})}x.tickEvent("docrenderer.ready"),f().done(function(){window.addEventListener("message",m,!1),window.addEventListener("hashchange",function(){e()},!1),parent.postMessage({type:"sidedocready"},"*"),setTimeout(function(){return e()},1)})},l.renderProjectAsync=g,l.renderProjectFilesAsync=h;var v='\n<aside id=button class=box>\n   <a class="ui primary button" href="@ARGS@">@BODY@</a>\n</aside>\n\n<aside id=vimeo>\n<div class="ui two column stackable grid container">\n<div class="column">\n    <div class="ui embed mdvid" data-source="vimeo" data-id="@ARGS@" data-placeholder="/thumbnail/1024/vimeo/@ARGS@" data-icon="video play">\n    </div>\n</div></div>\n</aside>\n\n<aside id=youtube>\n<div class="ui two column stackable grid container">\n<div class="column">\n    <div class="ui embed mdvid" data-source="youtube" data-id="@ARGS@" data-placeholder="https://img.youtube.com/vi/@ARGS@/0.jpg">\n    </div>\n</div></div>\n</aside>\n\n<aside id=section>\n    \x3c!-- section @ARGS@ --\x3e\n</aside>\n\n<aside id=hide class=box>\n    <div style=\'display:none\'>\n        @BODY@\n    </div>\n</aside>\n\n<aside id=avatar class=box>\n    <div class=\'avatar @ARGS@\'>\n        <div class=\'avatar-image\'></div>\n        <div class=\'ui compact message\'>\n            @BODY@\n        </div>\n    </div>\n</aside>\n\n<aside id=hint class=box>\n    <div class="ui icon green message">\n        <div class="content">\n            <div class="header">Hint</div>\n            @BODY@\n        </div>\n    </div>\n</aside>\n\n\x3c!-- wrapped around ordinary content --\x3e\n<aside id=main-container class=box>\n    <div class="ui text">\n        @BODY@\n    </div>\n</aside>\n\n\x3c!-- used for \'column\' box - they are collected and wrapped in \'column-container\' --\x3e\n<aside id=column class=aside>\n    <div class=\'column\'>\n        @BODY@\n    </div>\n</aside>\n<aside id=column-container class=box>\n    <div class="ui three column stackable grid text">\n        @BODY@\n    </div>\n</aside>\n@breadcrumb@\n@body@';function k(e,n,t){void 0===t&&(t={});(t.path||"").split("/");var o=x.docs.renderMarkdown({template:v,markdown:n,theme:x.appTarget.appTheme}),i=t.blocksAspectRatio||window.innerHeight<window.innerWidth?1.62:1/1.62;$(e).html(o),$(e).find("a").attr("target","_blank");var r={blocksAspectRatio:i,snippetClass:"lang-blocks",signatureClass:"lang-sig",blocksClass:"lang-block",blocksXmlClass:"lang-blocksxml",simulatorClass:"lang-sim",linksClass:"lang-cards",namespacesClass:"lang-namespaces",codeCardClass:"lang-codecard",packageClass:"lang-package",projectClass:"lang-project",snippetReplaceParent:!0,simulator:!0,hex:!0,tutorial:!!t.tutorial,showJavaScript:l.languageMode==d.TypeScript,hexName:x.appTarget.id};return t.print&&(r.showEdit=!1,r.simulator=!1),x.runner.renderAsync(r).then(function(){$(e).find('a[href^="/"]').removeAttr("target").each(function(e,n){$(n).attr("href","#doc:"+$(n).attr("href").replace(/^\//,""))}),$(e).find(".ui.embed").embed()})}function b(a,s){s=s.replace(/^\//,"");var e=Promise.resolve();return x.Cloud.isLocalHost()&&(e=function(){if(x.Cloud.localToken)return Promise.resolve();return new Promise(function(e,n){y.push(e)})}()),e.then(function(){return x.Cloud.downloadMarkdownAsync(s,l.editorLocale,x.Util.localizeLive)}).then(function(e){var i=e.split(/^##[^#].*$/gim),t=!0;if(i.length<=1&&(i=e.split(/^###[^#].*$/gim),t=!1),0==i[0].indexOf("# Not found"))throw x.log("Tutorial not found: "+s),new Error("Tutorial not found: "+s);var o=[];if(e.replace(t?/^##[^#](.*)$/gim:/^###[^#](.*)$/gim,function(e,n){var t={fullscreen:/@(fullscreen|unplugged)/.test(n),unplugged:/@unplugged/.test(n)};return o.push(t),""}),i.length<1)return Promise.resolve();i[0];i=i.slice(1,i.length);var r={};return Promise.resolve().then(function(){return k(a,e,{tutorial:!0})}).then(function(){var e=i.join();e=e.replace(/((?!.)\s)+/g,"\n");for(var n,t=/```(sim|block|blocks|filterblocks)\s*\n([\s\S]*?)\n```/gim,o="";null!=(n=t.exec(e));)o+=n[2]+"\n";return""!=o?x.runner.decompileToBlocksAsync(o,{emPixels:14,layout:x.blocks.BlockLayout.Flow,useViewWidth:!0,package:void 0}).then(function(e){var n=e.compileBlocks.outfiles["main.blocks"];if(n)for(var t=x.blocks.loadWorkspaceXml(n).getAllBlocks(),o=0;o<t.length;++o){var i=t[o];r[i.type]=1}}).catch(function(){throw x.log("Failed to decompile tutorial: "+s),new Error("Failed to decompile tutorial: "+s)}):Promise.resolve()}).then(function(){var e=a.innerHTML.split(t?/<h2.*?>(.*?)<\/h2>/gi:/<h3.*?>(.*?)<\/h3>/gi);e.shift();for(var n=0;n<e.length;n+=2)a.innerHTML=e[n+1],o[n/2].titleContent=(e[n]||"").replace(/@(fullscreen|unplugged)/g,"").trim(),o[n/2].headerContent="<p>"+a.firstElementChild.innerHTML+"</p>",o[n/2].ariaLabel=a.firstElementChild.textContent,o[n/2].content=e[n+1],o[n/2].hasHint=1<a.childElementCount;a.innerHTML="",window.parent.postMessage({type:"tutorial",tutorial:s,subtype:"loaded",stepInfo:o,toolboxSubset:r},"*")})}).catch(function(e){x.log("Failed to load tutorial: "+s),x.log(e.message),window.parent.postMessage({type:"tutorial",tutorial:s,subtype:"error"},"*")})}l.renderMarkdownAsync=k,l.renderTutorialAsync=b,l.decompileToBlocksAsync=function(n,i){return t(i&&i.packageId?"pub:"+i.packageId:i&&i.package?"docs:"+i.package:null,n).then(function(){return r(!!x.appTarget.compile&&x.appTarget.compile.hasHex)}).then(function(e){n&&(e.fileSystem["main.ts"]=n),e.ast=!0;var t=pxtc.compile(e);if(t.diagnostics&&0<t.diagnostics.length&&t.diagnostics.forEach(function(e){return console.error(e.messageText)}),!t.success)return Promise.resolve({package:l.mainPkg,compileJS:t});var o=pxtc.getApiInfo(e,t.ast);return ts.pxtc.localizeApisAsync(o,l.mainPkg).then(function(){var e=pxtc.getBlocksInfo(o);x.blocks.initializeAndInject(e);var n=pxtc.decompiler.decompileToBlocks(e,t.ast.getSourceFile("main.ts"),{snippetMode:i&&i.snippetMode});return n.diagnostics&&0<n.diagnostics.length&&n.diagnostics.forEach(function(e){return console.error(e.messageText)}),n.success?(x.debug(n.outfiles["main.blocks"]),{package:l.mainPkg,compileJS:t,compileBlocks:n,blocksSvg:x.blocks.render(n.outfiles["main.blocks"],i)}):{package:l.mainPkg,compileJS:t,compileBlocks:n}})})},l.compileBlocksAsync=function(o,i){return t(i&&i.packageId?"pub:"+i.packageId:i&&i.package?"docs:"+i.package:null,"").then(function(){return r(!!x.appTarget.compile&&x.appTarget.compile.hasHex)}).then(function(e){e.ast=!0;var n=pxtc.compile(e),t=pxtc.getApiInfo(e,n.ast);return ts.pxtc.localizeApisAsync(t,l.mainPkg).then(function(){var e=pxtc.getBlocksInfo(t);return x.blocks.initializeAndInject(e),{package:l.mainPkg,blocksSvg:x.blocks.render(o,i)}})})};var w,y=[];l.initCallbacks=[],l.init=function(){n().done(function(){for(var e=0;e<l.initCallbacks.length;++e)l.initCallbacks[e]()})},(w=window.ksRunnerWhenLoaded)&&w()}(x.runner||(x.runner={}))}(pxt||(pxt={}));