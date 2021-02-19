!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):((e="undefined"!=typeof globalThis?globalThis:e||self).AlpineMagicHelpers=e.AlpineMagicHelpers||{},e.AlpineMagicHelpers.index=t())}(this,(function(){"use strict";var e=function(){if(!window.Alpine)throw new Error("[Magic Helpers] Alpine is required for the magic helpers to function correctly.");if(!window.Alpine.version||!function(e,t){for(var n=e.split("."),r=t.split("."),o=0;o<n.length;o++)if(!r[o]||parseInt(r[o])<parseInt(n[o]))return!1;return!0}("2.5.0",window.Alpine.version))throw new Error("Invalid Alpine version. Please use Alpine version 2.5.0 or above")},t=function(e,t,n){t.getAttribute("x-bind:data-last-refresh")||t.setAttribute("x-bind:data-last-refresh","Date.now()");return new Proxy(e,function e(r){return void 0===r&&(r=null),{get:function(n,o){var i;if(null!==n[o]&&"object"==typeof n[o]){var a=r?r+"."+o:o;return new Proxy(n[o],e(a))}return"function"==typeof n[o]&&t.__x?n[o].bind(t.__x.$data):null===r&&!n[o]&&null!=t&&null!=(i=t.__x)&&i.$data[o]?t.__x.$data[o]:n[o]},set:function(e,o,i){if(!t.__x)throw new Error("Error communicating with observed component");var a=r?r+"."+o:o;return n.call(t,t.__x.$data,a,i),!0}}}())},n=function(e,t){e.getAttribute("x-bind:data-last-refresh")||e.setAttribute("x-bind:data-last-refresh","Date.now()"),new MutationObserver((function(n){for(var r=0;r<n.length;r++){var o=n[r].target.closest("[x-data]");if(!o||o.isSameNode(e))return void t()}})).observe(e,{attributes:!0,childList:!0,subtree:!0})},r=function(e,t,n){return(t=t.toString().match(/[^.[\]]+/g)||[]).slice(0,-1).reduce((function(e,n,r){return Object(e[n])!==e[n]&&(e[n]=Math.abs(t[r+1])>>0==+t[r+1]?[]:{}),e[n]}),e)[t[t.length-1]]=n,e},o=function(e,t){var n=e.__x?e.__x.getUnobservedData():function(e,t,n){void 0===n&&(n={});if("function"==typeof e)return e.call(t);return new Function(["$data"].concat(Object.keys(n)),"var __alpine_result; with($data) { __alpine_result = "+e+" }; return __alpine_result").apply(void 0,[t].concat(Object.values(n)))}(e.getAttribute("x-data"),e);return t?(t=Array.isArray(t)?t:[t]).reduce((function(e,t){return e[t]=n[t],e}),{}):n};function i(e,t,n){return e.__x?n():(window.requestAnimationFrame((function(){return t.__x.updateElements(t)})),r={get:function(e,t){return new Proxy((function(){return""}),r)}},new Proxy((function(){return""}),r));var r}var a={start:function(){e(),Alpine.addMagicProperty("parent",(function(e){if(void 0!==e.$parent)return e.$parent;var a=e.parentNode.closest("[x-data]");if(!a)throw new Error("Parent component not found");return i(a,e,(function(){return e.$parent=t(o(a),a,r),n(a,(function(){e.$parent=t(a.__x.getUnobservedData(),a,r),e.__x.updateElements(e)})),e.$parent}))})),Alpine.addMagicProperty("component",(function(e){return function(a){var s=this;if(void 0!==this[a])return this[a];var u=document.querySelector('[x-data][x-id="'+a+'"], [x-data]#'+a);if(!u)throw new Error("Component not found");return i(u,e,(function(){return s[a]=t(o(u),u,r),n(u,(function(){s[a]=t(u.__x.getUnobservedData(),u,r),e.__x.updateElements(e)})),s[a]}))}}))}},s=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){s(e),a.start()};var u=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}},c=Object.prototype.toString;function l(e){return"[object Array]"===c.call(e)}function f(e){return void 0===e}function p(e){return null!==e&&"object"==typeof e}function d(e){if("[object Object]"!==c.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function h(e){return"[object Function]"===c.call(e)}function v(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),l(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var g={isArray:l,isArrayBuffer:function(e){return"[object ArrayBuffer]"===c.call(e)},isBuffer:function(e){return null!==e&&!f(e)&&null!==e.constructor&&!f(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:p,isPlainObject:d,isUndefined:f,isDate:function(e){return"[object Date]"===c.call(e)},isFile:function(e){return"[object File]"===c.call(e)},isBlob:function(e){return"[object Blob]"===c.call(e)},isFunction:h,isStream:function(e){return p(e)&&h(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:v,merge:function e(){var t={};function n(n,r){d(t[r])&&d(n)?t[r]=e(t[r],n):d(n)?t[r]=e({},n):l(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)v(arguments[r],n);return t},extend:function(e,t,n){return v(t,(function(t,r){e[r]=n&&"function"==typeof t?u(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}};function m(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var y=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(g.isURLSearchParams(t))r=t.toString();else{var o=[];g.forEach(t,(function(e,t){null!=e&&(g.isArray(e)?t+="[]":e=[e],g.forEach(e,(function(e){g.isDate(e)?e=e.toISOString():g.isObject(e)&&(e=JSON.stringify(e)),o.push(m(t)+"="+m(e))})))})),r=o.join("&")}if(r){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e};function b(){this.handlers=[]}b.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},b.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},b.prototype.forEach=function(e){g.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var w=b,x=function(e,t,n){return g.forEach(n,(function(n){e=n(e,t)})),e},A=function(e){return!(!e||!e.__CANCEL__)},_=function(e,t){g.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))},O=function(e,t,n,r,o){return function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}(new Error(e),t,n,r,o)},j=g.isStandardBrowserEnv()?{write:function(e,t,n,r,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),g.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),g.isString(r)&&a.push("path="+r),g.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},E=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],S=g.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=g.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0},L=function(e){return new Promise((function(t,n){var r=e.data,o=e.headers;g.isFormData(r)&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var a=e.auth.username||"",s=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(a+":"+s)}var u,c,l=(u=e.baseURL,c=e.url,u&&!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(u,c):c);if(i.open(e.method.toUpperCase(),y(l,e.params,e.paramsSerializer),!0),i.timeout=e.timeout,i.onreadystatechange=function(){if(i&&4===i.readyState&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var r,o,a,s,u,c="getAllResponseHeaders"in i?(r=i.getAllResponseHeaders(),u={},r?(g.forEach(r.split("\n"),(function(e){if(s=e.indexOf(":"),o=g.trim(e.substr(0,s)).toLowerCase(),a=g.trim(e.substr(s+1)),o){if(u[o]&&E.indexOf(o)>=0)return;u[o]="set-cookie"===o?(u[o]?u[o]:[]).concat([a]):u[o]?u[o]+", "+a:a}})),u):u):null,l={data:e.responseType&&"text"!==e.responseType?i.response:i.responseText,status:i.status,statusText:i.statusText,headers:c,config:e,request:i};!function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(O("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}(t,n,l),i=null}},i.onabort=function(){i&&(n(O("Request aborted",e,"ECONNABORTED",i)),i=null)},i.onerror=function(){n(O("Network Error",e,null,i)),i=null},i.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(O(t,e,"ECONNABORTED",i)),i=null},g.isStandardBrowserEnv()){var f=(e.withCredentials||S(l))&&e.xsrfCookieName?j.read(e.xsrfCookieName):void 0;f&&(o[e.xsrfHeaderName]=f)}if("setRequestHeader"in i&&g.forEach(o,(function(e,t){void 0===r&&"content-type"===t.toLowerCase()?delete o[t]:i.setRequestHeader(t,e)})),g.isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),e.responseType)try{i.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&i.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){i&&(i.abort(),n(e),i=null)})),r||(r=null),i.send(r)}))},P={"Content-Type":"application/x-www-form-urlencoded"};function C(e,t){!g.isUndefined(e)&&g.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var T,k={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(T=L),T),transformRequest:[function(e,t){return _(t,"Accept"),_(t,"Content-Type"),g.isFormData(e)||g.isArrayBuffer(e)||g.isBuffer(e)||g.isStream(e)||g.isFile(e)||g.isBlob(e)?e:g.isArrayBufferView(e)?e.buffer:g.isURLSearchParams(e)?(C(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):g.isObject(e)?(C(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};k.headers={common:{Accept:"application/json, text/plain, */*"}},g.forEach(["delete","get","head"],(function(e){k.headers[e]={}})),g.forEach(["post","put","patch"],(function(e){k.headers[e]=g.merge(P)}));var M=k;function N(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var D=function(e){return N(e),e.headers=e.headers||{},e.data=x(e.data,e.headers,e.transformRequest),e.headers=g.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),g.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||M.adapter)(e).then((function(t){return N(e),t.data=x(t.data,t.headers,e.transformResponse),t}),(function(t){return A(t)||(N(e),t&&t.response&&(t.response.data=x(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},R=function(e,t){t=t||{};var n={},r=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function s(e,t){return g.isPlainObject(e)&&g.isPlainObject(t)?g.merge(e,t):g.isPlainObject(t)?g.merge({},t):g.isArray(t)?t.slice():t}function u(r){g.isUndefined(t[r])?g.isUndefined(e[r])||(n[r]=s(void 0,e[r])):n[r]=s(e[r],t[r])}g.forEach(r,(function(e){g.isUndefined(t[e])||(n[e]=s(void 0,t[e]))})),g.forEach(o,u),g.forEach(i,(function(r){g.isUndefined(t[r])?g.isUndefined(e[r])||(n[r]=s(void 0,e[r])):n[r]=s(void 0,t[r])})),g.forEach(a,(function(r){r in t?n[r]=s(e[r],t[r]):r in e&&(n[r]=s(void 0,e[r]))}));var c=r.concat(o).concat(i).concat(a),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return g.forEach(l,u),n};function I(e){this.defaults=e,this.interceptors={request:new w,response:new w}}I.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=R(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[D,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},I.prototype.getUri=function(e){return e=R(this.defaults,e),y(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},g.forEach(["delete","get","head","options"],(function(e){I.prototype[e]=function(t,n){return this.request(R(n||{},{method:e,url:t,data:(n||{}).data}))}})),g.forEach(["post","put","patch"],(function(e){I.prototype[e]=function(t,n,r){return this.request(R(r||{},{method:e,url:t,data:n}))}}));var B=I;function U(e){this.message=e}U.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},U.prototype.__CANCEL__=!0;var q=U;function $(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new q(e),t(n.reason))}))}$.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},$.source=function(){var e;return{token:new $((function(t){e=t})),cancel:e}};var H=$;function F(e){var t=new B(e),n=u(B.prototype.request,t);return g.extend(n,B.prototype,t),g.extend(n,t),n}var X=F(M);X.Axios=B,X.create=function(e){return F(R(X.defaults,e))},X.Cancel=q,X.CancelToken=H,X.isCancel=A,X.all=function(e){return Promise.all(e)},X.spread=function(e){return function(t){return e.apply(null,t)}},X.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError};var Y=X,z=X;Y.default=z;var J=Y,V={start:function(){e(),Alpine.addMagicProperty("fetch",(function(){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return"string"==typeof t[0]&&t[0].length?J.get(t[0]).then((function(e){return Object.prototype.hasOwnProperty.call(e,"data")?e.data:e})):"object"==typeof t[0]?J(t[0]):t[0]}}))}},W=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){V.start(),W(e)};var K={start:function(){e(),Alpine.addMagicProperty("interval",(function(){return function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if("function"!=typeof n[0])return n[0];var o=n[1],i=0,a=!1;"object"==typeof n[1]&&(Object.prototype.hasOwnProperty.call(n[1],"timer")&&(o=n[1].timer),Object.prototype.hasOwnProperty.call(n[1],"delay")&&(i=n[1].delay),Object.prototype.hasOwnProperty.call(n[1],"forceInterval")&&(a=n[1].forceInterval));var s=function(){var t=!Object.prototype.hasOwnProperty.call(e,"autoIntervalTest")||e.autoIntervalTest;setTimeout((function(){e.autoIntervalLoop&&(t&&n[0].call(e),a?e.autoIntervalLoop():requestAnimationFrame(e.autoIntervalLoop))}),o)};this.autoIntervalLoop=s,setTimeout((function(){e.autoIntervalLoop&&(a?e.autoIntervalLoop():requestAnimationFrame(e.autoIntervalLoop))}),i),this.$watch("autoIntervalTest",(function(t){t?(e.autoIntervalLoop=s,a?e.autoIntervalLoop():requestAnimationFrame(e.autoIntervalLoop)):(clearTimeout(e.autoIntervalLoop),e.autoIntervalLoop=null)}))}}))}},G=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){K.start(),G(e)};var Q={start:function(){e(),Alpine.addMagicProperty("range",(function(){return function(e,t,n){void 0===n&&(n=1),void 0===t&&(t=e,e=e?1:0);var r=e>t;if(r){var o=[t,e];e=o[0],t=o[1]}var i=Array.from({length:(t-e)/n+1},(function(t,r){return e+r*n}));return r?i.reverse():i}}))}},Z=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){Q.start(),Z(e)};var ee={start:function(){e(),Alpine.addMagicProperty("refresh",(function(e){return e.__x?function(t){return void 0===t&&(t=e),t.__x.updateElements(t)}:function(){}}))}},te=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){ee.start(),te(e)};var ne=new(function(){function e(){var e=this;this.values={breakpoints:{xs:0,sm:640,md:768,lg:1024,xl:1280,"2xl":1536}},document.addEventListener("readystatechange",(function(){if("interactive"===document.readyState&&window.AlpineMagicHelpersConfig)for(var t in window.AlpineMagicHelpersConfig)e.values[t]=window.AlpineMagicHelpersConfig[t]}))}return e.prototype.get=function(e){return this.values[e]?this.values[e]:null},e}()),re=[],oe={start:function(){var e;window.addEventListener("resize",(function(){clearTimeout(e),e=setTimeout((function(){re.forEach((function(e){return e&&e.__x&&e.__x.updateElements(e)}))}),150)})),Alpine.addMagicProperty("screen",(function(e){return re.includes(e)||re.push(e),function(e){var t=window.innerWidth;if(Number.isInteger(e))return e<=t;var n=ne.get("breakpoints");if(void 0===n[e])throw Error("Undefined $screen property: "+e);return n[e]<=t}}))}},ie=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){oe.start(),ie(e)};var ae="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function se(e){var t={exports:{}};return e(t,t.exports),t.exports}se((function(e,t){e.exports={polyfill:function(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style)||!0===e.__forceSmoothScrollPolyfill__){var n,r=e.HTMLElement||e.Element,o={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:r.prototype.scroll||s,scrollIntoView:r.prototype.scrollIntoView},i=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,a=(n=e.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(n)?1:0);e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==u(arguments[0])?h.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):o.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(u(arguments[0])?o.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},r.prototype.scroll=r.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==u(arguments[0])){var e=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},r.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==u(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},r.prototype.scrollIntoView=function(){if(!0!==u(arguments[0])){var n=p(this),r=n.getBoundingClientRect(),i=this.getBoundingClientRect();n!==t.body?(h.call(this,n,n.scrollLeft+i.left-r.left,n.scrollTop+i.top-r.top),"fixed"!==e.getComputedStyle(n).position&&e.scrollBy({left:r.left,top:r.top,behavior:"smooth"})):e.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else o.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function s(e,t){this.scrollLeft=e,this.scrollTop=t}function u(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function c(e,t){return"Y"===t?e.clientHeight+a<e.scrollHeight:"X"===t?e.clientWidth+a<e.scrollWidth:void 0}function l(t,n){var r=e.getComputedStyle(t,null)["overflow"+n];return"auto"===r||"scroll"===r}function f(e){var t=c(e,"Y")&&l(e,"Y"),n=c(e,"X")&&l(e,"X");return t||n}function p(e){for(;e!==t.body&&!1===f(e);)e=e.parentNode||e.host;return e}function d(t){var n,r,o,a,s=(i()-t.startTime)/468;a=s=s>1?1:s,n=.5*(1-Math.cos(Math.PI*a)),r=t.startX+(t.x-t.startX)*n,o=t.startY+(t.y-t.startY)*n,t.method.call(t.scrollable,r,o),r===t.x&&o===t.y||e.requestAnimationFrame(d.bind(e,t))}function h(n,r,a){var u,c,l,f,p=i();n===t.body?(u=e,c=e.scrollX||e.pageXOffset,l=e.scrollY||e.pageYOffset,f=o.scroll):(u=n,c=n.scrollLeft,l=n.scrollTop,f=s),d({scrollable:u,method:f,startTime:p,startX:c,startY:l,x:r,y:a})}}}})).polyfill();var ue={start:function(){Alpine.addMagicProperty("scroll",(function(){return function(e,t){void 0===t&&(t={});var n=e,r=t.offset?parseInt(t.offset,10):0;if(delete t.offset,"string"==typeof e&&/^[0-9]+?/g.test(e)&&(e=parseInt(e,10)),"string"==typeof e&&(e=document.querySelector(e)),e instanceof Element&&(e=Math.floor(e.getBoundingClientRect().top+window.pageYOffset)),Number.isInteger(e)&&(e={top:e-r,behavior:"smooth"}),"object"!=typeof e)throw Error("Unsupported $scroll target: ",n);Object.assign(e,t),window.scroll(e)}}))}},ce=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){ue.start(),ce(e)};var le={start:function(){var t=this;e(),Alpine.addMagicProperty("truncate",(function(){return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return"string"!=typeof n[0]?n[0]:n[1]?"object"!=typeof n[1]?t.appendEllipsis(n[0].slice(0,n[1]),n):Object.prototype.hasOwnProperty.call(n[1],"words")&&n[1].words?t.appendEllipsis(n[0].split(" ").splice(0,n[1].words).join(" "),n):Object.prototype.hasOwnProperty.call(n[1],"characters")&&n[1].characters?t.appendEllipsis(n[0].slice(0,n[1].characters),n):n[0]:n[0]}}))},appendEllipsis:function(e,t){if(t[0].length<=e.length)return e;var n="…";return void 0!==t[2]&&(n=t[2]),Object.prototype.hasOwnProperty.call(t[1],"ellipsis")&&(n=t[1].ellipsis),e+n}},fe=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){le.start(),fe(e)};var pe=se((function(e,t){!function(t,n){var r=function(e){var t=["N","E","A","D"];function n(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,n){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:n,enumerable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function s(e,t,n){s.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:n,enumerable:!0})}function u(e,t,n){var r=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,r),e}function c(e){var t=typeof e;return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e){var t=0;if(0===e.length)return t;for(var n=0;n<e.length;n++){t=(t<<5)-t+e.charCodeAt(n),t&=t}return t}function f(e){var t=0,n=c(e);if("array"===n)return e.forEach((function(e){t+=f(e)})),t+l("[type: array, hash: "+t+"]");if("object"===n){for(var r in e)if(e.hasOwnProperty(r)){var o="[ type: object, key: "+r+", value hash: "+f(e[r])+"]";t+=l(o)}return t}return t+l("[ type: "+n+" ; value: "+e+"]")}function p(e,t,n,r,u,l,d,h){n=n||[],d=d||[];var v=(u=u||[]).slice(0);if(null!=l){if(r){if("function"==typeof r&&r(v,l))return;if("object"==typeof r){if(r.prefilter&&r.prefilter(v,l))return;if(r.normalize){var g=r.normalize(v,l,e,t);g&&(e=g[0],t=g[1])}}}v.push(l)}"regexp"===c(e)&&"regexp"===c(t)&&(e=e.toString(),t=t.toString());var m,y,b,w,x=typeof e,A=typeof t,_="undefined"!==x||d&&d.length>0&&d[d.length-1].lhs&&Object.getOwnPropertyDescriptor(d[d.length-1].lhs,l),O="undefined"!==A||d&&d.length>0&&d[d.length-1].rhs&&Object.getOwnPropertyDescriptor(d[d.length-1].rhs,l);if(!_&&O)n.push(new i(v,t));else if(!O&&_)n.push(new a(v,e));else if(c(e)!==c(t))n.push(new o(v,e,t));else if("date"===c(e)&&e-t!=0)n.push(new o(v,e,t));else if("object"===x&&null!==e&&null!==t){for(m=d.length-1;m>-1;--m)if(d[m].lhs===e){w=!0;break}if(w)e!==t&&n.push(new o(v,e,t));else{if(d.push({lhs:e,rhs:t}),Array.isArray(e)){for(h&&(e.sort((function(e,t){return f(e)-f(t)})),t.sort((function(e,t){return f(e)-f(t)}))),m=t.length-1,y=e.length-1;m>y;)n.push(new s(v,m,new i(void 0,t[m--])));for(;y>m;)n.push(new s(v,y,new a(void 0,e[y--])));for(;m>=0;--m)p(e[m],t[m],n,r,v,m,d,h)}else{var j=Object.keys(e),E=Object.keys(t);for(m=0;m<j.length;++m)b=j[m],(w=E.indexOf(b))>=0?(p(e[b],t[b],n,r,v,b,d,h),E[w]=null):p(e[b],void 0,n,r,v,b,d,h);for(m=0;m<E.length;++m)(b=E[m])&&p(void 0,t[b],n,r,v,b,d,h)}d.length=d.length-1}}else e!==t&&("number"===x&&isNaN(e)&&isNaN(t)||n.push(new o(v,e,t)))}function d(e,t,n,r,o){var i=[];if(p(e,t,i,r,null,null,null,o),n)for(var a=0;a<i.length;++a)n(i[a]);return i}function h(e,t,n,r,o,i,a){return p(e,t,n,r,o,i,a,!0)}function v(e,t,n,r){var o=d(e,t,r?function(e){e&&r.push(e)}:void 0,n);return r||(o.length?o:void 0)}function g(e,t,n,r){var o=d(e,t,r?function(e){e&&r.push(e)}:void 0,n,!0);return r||(o.length?o:void 0)}function m(e,t,n){if(n.path&&n.path.length){var r,o=e[t],i=n.path.length-1;for(r=0;r<i;r++)o=o[n.path[r]];switch(n.kind){case"A":m(o[n.path[r]],n.index,n.item);break;case"D":delete o[n.path[r]];break;case"E":case"N":o[n.path[r]]=n.rhs}}else switch(n.kind){case"A":m(e[t],n.index,n.item);break;case"D":e=u(e,t);break;case"E":case"N":e[t]=n.rhs}return e}function y(e,n,r){if(void 0===r&&n&&~t.indexOf(n.kind)&&(r=n),e&&r&&r.kind){for(var o=e,i=-1,a=r.path?r.path.length-1:0;++i<a;)void 0===o[r.path[i]]&&(o[r.path[i]]=void 0!==r.path[i+1]&&"number"==typeof r.path[i+1]?[]:{}),o=o[r.path[i]];switch(r.kind){case"A":r.path&&void 0===o[r.path[i]]&&(o[r.path[i]]=[]),m(r.path?o[r.path[i]]:o,r.index,r.item);break;case"D":delete o[r.path[i]];break;case"E":case"N":o[r.path[i]]=r.rhs}}}function b(e,t,n){if(n.path&&n.path.length){var r,o=e[t],i=n.path.length-1;for(r=0;r<i;r++)o=o[n.path[r]];switch(n.kind){case"A":b(o[n.path[r]],n.index,n.item);break;case"D":case"E":o[n.path[r]]=n.lhs;break;case"N":delete o[n.path[r]]}}else switch(n.kind){case"A":b(e[t],n.index,n.item);break;case"D":case"E":e[t]=n.lhs;break;case"N":e=u(e,t)}return e}function w(e,t,n){if(e&&t&&n&&n.kind){var r,o,i=e;for(o=n.path.length-1,r=0;r<o;r++)void 0===i[n.path[r]]&&(i[n.path[r]]={}),i=i[n.path[r]];switch(n.kind){case"A":b(i[n.path[r]],n.index,n.item);break;case"D":case"E":i[n.path[r]]=n.lhs;break;case"N":delete i[n.path[r]]}}}function x(e,t,n){e&&t&&d(e,t,(function(r){n&&!n(e,t,r)||y(e,t,r)}))}n(o,r),n(i,r),n(a,r),n(s,r),Object.defineProperties(v,{diff:{value:v,enumerable:!0},orderIndependentDiff:{value:g,enumerable:!0},observableDiff:{value:d,enumerable:!0},orderIndependentObservableDiff:{value:h,enumerable:!0},orderIndepHash:{value:f,enumerable:!0},applyDiff:{value:x,enumerable:!0},applyChange:{value:y,enumerable:!0},revertChange:{value:w,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof $conflict},enumerable:!0}}),v.DeepDiff=v,e&&(e.DeepDiff=v);return v}(t);e.exports=r}(ae)})),de=new WeakMap,he={start:function(){var t=this;e(),Alpine.addMagicProperty("track",(function(e){return function(r){var i;r=null!=(i=r)?i:Object.keys(o(e)),r=Array.isArray(r)?r:[r];var a=JSON.stringify(o(e,r));n(e,(function(){de.has(e.__x)||t.store(e.__x,{props:r,previous:a});var n=o(e,de.get(e.__x).props),i=JSON.parse(de.get(e.__x).previous),s=pe.DeepDiff.diff(i,n,!0);s&&s.length&&(s=s.filter((function(t){return de.get(e.__x).props.some((function(e){return t.path.join(".").startsWith(e)}))})),de.get(e.__x).previous=JSON.stringify(n),de.get(e.__x).changes.push(s),e.__x.updateElements(e))}))}})),Alpine.addMagicProperty("undo",(function(e,n){return function(){e!==n&&(e=t.syncClone(e,n));var r=de.get(e.__x).changes.pop(),i=JSON.parse(de.get(e.__x).previous);if(r&&r.forEach((function(t){pe.DeepDiff.revertChange(i,o(e,de.get(e.__x).props),t)})),Object.keys(i).length){var a={};Object.entries(i).forEach((function(e){a[e[0]]=e[1]})),e.__x.$data=Object.assign(e.__x.$data,a)}de.get(e.__x).previous=JSON.stringify(o(e,de.get(e.__x).props))}})),Alpine.addMagicProperty("history",(function(e,n){return n.__x?(e!==n&&(e=t.syncClone(e,n)),de.has(e.__x)?de.get(e.__x):[]):[]}))},store:function(e,t){return de.set(e,Object.assign({changes:[],get length(){return this.changes.length}},t)),de.get(e)},syncClone:function(e,t){return this.store(t.__x,{props:de.get(e.__x).props,previous:de.get(e.__x).previous,changes:de.get(e.__x).changes}),t}},ve=window.deferLoadingAlpine||function(e){return e()};return window.deferLoadingAlpine=function(e){ve(e),he.start()},{AlpineComponentMagicMethod:a,AlpineFetchMagicMethod:V,AlpineIntervalMagicMethod:K,AlpineRangeMagicMethod:Q,AlpineRefreshMagicMethod:ee,AlpineScreenMagicMethod:oe,AlpineScrollMagicMethod:ue,AlpineTruncateMagicMethod:le,AlpineUndoMagicMethod:he}}));