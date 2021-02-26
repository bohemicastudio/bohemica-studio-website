!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function n(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function r(e){var t=n(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function o(e){return e instanceof n(e).Element||e instanceof Element}function i(e){return e instanceof n(e).HTMLElement||e instanceof HTMLElement}function a(e){return"undefined"!=typeof ShadowRoot&&(e instanceof n(e).ShadowRoot||e instanceof ShadowRoot)}function s(e){return e?(e.nodeName||"").toLowerCase():null}function f(e){return((o(e)?e.ownerDocument:e.document)||window.document).documentElement}function c(e){return t(f(e)).left+r(e).scrollLeft}function p(e){return n(e).getComputedStyle(e)}function l(e){var t=p(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function u(e,o,a){void 0===a&&(a=!1);var p,u,d=f(o),m=t(e),h=i(o),v={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(h||!h&&!a)&&(("body"!==s(o)||l(d))&&(v=(p=o)!==n(p)&&i(p)?{scrollLeft:(u=p).scrollLeft,scrollTop:u.scrollTop}:r(p)),i(o)?((b=t(o)).x+=o.clientLeft,b.y+=o.clientTop):d&&(b.x=c(d))),{x:m.left+v.scrollLeft-b.x,y:m.top+v.scrollTop-b.y,width:m.width,height:m.height}}function d(e){var n=t(e),r=e.offsetWidth,o=e.offsetHeight;return Math.abs(n.width-r)<=.5&&(r=n.width),Math.abs(n.height-o)<=.5&&(o=n.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:o}}function m(e){return"html"===s(e)?e:e.assignedSlot||e.parentNode||(a(e)?e.host:null)||f(e)}function h(e){return["html","body","#document"].indexOf(s(e))>=0?e.ownerDocument.body:i(e)&&l(e)?e:h(m(e))}function v(e,t){var r;void 0===t&&(t=[]);var o=h(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=n(o),s=i?[a].concat(a.visualViewport||[],l(o)?o:[]):o,f=t.concat(s);return i?f:f.concat(v(m(s)))}function b(e){return["table","td","th"].indexOf(s(e))>=0}function g(e){return i(e)&&"fixed"!==p(e).position?e.offsetParent:null}function y(e){for(var t=n(e),r=g(e);r&&b(r)&&"static"===p(r).position;)r=g(r);return r&&("html"===s(r)||"body"===s(r)&&"static"===p(r).position)?t:r||function(e){for(var t=navigator.userAgent.toLowerCase().includes("firefox"),n=m(e);i(n)&&["html","body"].indexOf(s(n))<0;){var r=p(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||["transform","perspective"].includes(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var w="top",x="bottom",O="right",j="left",E="auto",S=[w,x,O,j],P="start",k="end",D="viewport",L="popper",M=S.reduce((function(e,t){return e.concat([t+"-"+P,t+"-"+k])}),[]),q=[].concat(S,[E]).reduce((function(e,t){return e.concat([t,t+"-"+P,t+"-"+k])}),[]),A=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function T(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function W(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return[].concat(n).reduce((function(e,t){return e.replace(/%s/,t)}),e)}var B='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',H=["name","enabled","phase","fn","effect","requires","options"];function C(e){return e.split("-")[0]}var R=Math.max,I=Math.min,V=Math.round;function N(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&a(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function U(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _(e,o){return o===D?U(function(e){var t=n(e),r=f(e),o=t.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,p=0;return o&&(i=o.width,a=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=o.offsetLeft,p=o.offsetTop)),{width:i,height:a,x:s+c(e),y:p}}(e)):i(o)?function(e){var n=t(e);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(o):U(function(e){var t,n=f(e),o=r(e),i=null==(t=e.ownerDocument)?void 0:t.body,a=R(n.scrollWidth,n.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),s=R(n.scrollHeight,n.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),l=-o.scrollLeft+c(e),u=-o.scrollTop;return"rtl"===p(i||n).direction&&(l+=R(n.clientWidth,i?i.clientWidth:0)-a),{width:a,height:s,x:l,y:u}}(f(e)))}function F(e,t,n){var r="clippingParents"===t?function(e){var t=v(m(e)),n=["absolute","fixed"].indexOf(p(e).position)>=0&&i(e)?y(e):e;return o(n)?t.filter((function(e){return o(e)&&N(e,n)&&"body"!==s(e)})):[]}(e):[].concat(t),a=[].concat(r,[n]),f=a[0],c=a.reduce((function(t,n){var r=_(e,n);return t.top=R(r.top,t.top),t.right=I(r.right,t.right),t.bottom=I(r.bottom,t.bottom),t.left=R(r.left,t.left),t}),_(e,f));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function z(e){return e.split("-")[1]}function G(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?C(o):null,a=o?z(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case w:t={x:s,y:n.y-r.height};break;case x:t={x:s,y:n.y+n.height};break;case O:t={x:n.x+n.width,y:f};break;case j:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?G(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case P:t[c]=t[c]-(n[p]/2-r[p]/2);break;case k:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function J(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function K(e,n){void 0===n&&(n={});var r=n,i=r.placement,a=void 0===i?e.placement:i,s=r.boundary,c=void 0===s?"clippingParents":s,p=r.rootBoundary,l=void 0===p?D:p,u=r.elementContext,d=void 0===u?L:u,m=r.altBoundary,h=void 0!==m&&m,v=r.padding,b=void 0===v?0:v,g=Y("number"!=typeof b?b:J(b,S)),y=d===L?"reference":L,j=e.elements.reference,E=e.rects.popper,P=e.elements[h?y:d],k=F(o(P)?P:P.contextElement||f(e.elements.popper),c,l),M=t(j),q=X({reference:M,element:E,strategy:"absolute",placement:a}),A=U(Object.assign({},E,q)),T=d===L?A:M,W={top:k.top-T.top+g.top,bottom:T.bottom-k.bottom+g.bottom,left:k.left-T.left+g.left,right:T.right-k.right+g.right},B=e.modifiersData.offset;if(d===L&&B){var H=B[a];Object.keys(W).forEach((function(e){var t=[O,x].indexOf(e)>=0?1:-1,n=[w,x].indexOf(e)>=0?"y":"x";W[e]+=H[n]*t}))}return W}var Q="Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",Z={placement:"bottom",modifiers:[],strategy:"absolute"};function $(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function ee(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,i=t.defaultOptions,a=void 0===i?Z:i;return function(e,t,n){void 0===n&&(n=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Z,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,m={state:f,setOptions:function(n){h(),f.options=Object.assign({},a,f.options,n),f.scrollParents={reference:o(e)?v(e):e.contextElement?v(e.contextElement):[],popper:v(t)};var i=function(e){var t=T(e);return A.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,f.options.modifiers)));(f.orderedModifiers=i.filter((function(e){return e.enabled})),function(e){e.forEach((function(t){Object.keys(t).forEach((function(n){switch(n){case"name":"string"!=typeof t.name&&console.error(W(B,String(t.name),'"name"','"string"','"'+String(t.name)+'"'));break;case"enabled":"boolean"!=typeof t.enabled&&console.error(W(B,t.name,'"enabled"','"boolean"','"'+String(t.enabled)+'"'));case"phase":A.indexOf(t.phase)<0&&console.error(W(B,t.name,'"phase"',"either "+A.join(", "),'"'+String(t.phase)+'"'));break;case"fn":"function"!=typeof t.fn&&console.error(W(B,t.name,'"fn"','"function"','"'+String(t.fn)+'"'));break;case"effect":"function"!=typeof t.effect&&console.error(W(B,t.name,'"effect"','"function"','"'+String(t.fn)+'"'));break;case"requires":Array.isArray(t.requires)||console.error(W(B,t.name,'"requires"','"array"','"'+String(t.requires)+'"'));break;case"requiresIfExists":Array.isArray(t.requiresIfExists)||console.error(W(B,t.name,'"requiresIfExists"','"array"','"'+String(t.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+t.name+'" modifier, valid properties are '+H.map((function(e){return'"'+e+'"'})).join(", ")+'; but "'+n+'" was provided.')}t.requires&&t.requires.forEach((function(n){null==e.find((function(e){return e.name===n}))&&console.error(W('Popper: modifier "%s" requires "%s", but "%s" modifier is not available',String(t.name),n,n))}))}))}))}((s=[].concat(i,f.options.modifiers),l=function(e){return e.name},u=new Set,s.filter((function(e){var t=l(e);if(!u.has(t))return u.add(t),!0})))),C(f.options.placement)===E)&&(f.orderedModifiers.find((function(e){return"flip"===e.name}))||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" ")));var s,l,u,d=p(t);return[d.marginTop,d.marginRight,d.marginBottom,d.marginLeft].some((function(e){return parseFloat(e)}))&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" ")),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:m,options:r}),a=function(){};c.push(i||a)}})),m.update()},forceUpdate:function(){if(!l){var e=f.elements,t=e.reference,n=e.popper;if($(t,n)){f.rects={reference:u(t,y(n),"fixed"===f.options.strategy),popper:d(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0,o=0;o<f.orderedModifiers.length;o++){if((r+=1)>100){console.error("Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.");break}if(!0!==f.reset){var i=f.orderedModifiers[o],a=i.fn,s=i.options,c=void 0===s?{}:s,p=i.name;"function"==typeof a&&(f=a({state:f,options:c,name:p,instance:m})||f)}else f.reset=!1,o=-1}}else console.error(Q)}},update:(i=function(){return new Promise((function(e){m.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){h(),l=!0}};if(!$(e,t))return console.error(Q),m;function h(){c.forEach((function(e){return e()})),c=[]}return m.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),m}}var te={passive:!0};var ne={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=n(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,te)})),f&&c.addEventListener("resize",r.update,te),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,te)})),f&&c.removeEventListener("resize",r.update,te)}},data:{}};var re={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},oe={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ie(e){var t,r=e.popper,o=e.popperRect,i=e.placement,a=e.offsets,s=e.position,c=e.gpuAcceleration,l=e.adaptive,u=e.roundOffsets,d=!0===u?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:V(V(t*r)/r)||0,y:V(V(n*r)/r)||0}}(a):"function"==typeof u?u(a):a,m=d.x,h=void 0===m?0:m,v=d.y,b=void 0===v?0:v,g=a.hasOwnProperty("x"),E=a.hasOwnProperty("y"),S=j,P=w,k=window;if(l){var D=y(r),L="clientHeight",M="clientWidth";D===n(r)&&"static"!==p(D=f(r)).position&&(L="scrollHeight",M="scrollWidth"),i===w&&(P=x,b-=D[L]-o.height,b*=c?1:-1),i===j&&(S=O,h-=D[M]-o.width,h*=c?1:-1)}var q,A=Object.assign({position:s},l&&oe);return c?Object.assign({},A,((q={})[P]=E?"0":"",q[S]=g?"0":"",q.transform=(k.devicePixelRatio||1)<2?"translate("+h+"px, "+b+"px)":"translate3d("+h+"px, "+b+"px, 0)",q)):Object.assign({},A,((t={})[P]=E?b+"px":"",t[S]=g?h+"px":"",t.transform="",t))}var ae={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c=p(t.elements.popper).transitionProperty||"";a&&["transform","top","right","bottom","left"].some((function(e){return c.indexOf(e)>=0}))&&console.warn(["Popper: Detected CSS transitions on at least one of the following",'CSS properties: "transform", "top", "right", "bottom", "left".',"\n\n",'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.","\n\n","We recommend using the popper element as a wrapper around an inner","element that can have any CSS property transitioned for animations."].join(" "));var l={placement:C(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ie(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ie(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var se={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];i(o)&&s(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});i(r)&&s(r)&&(Object.assign(r.style,a),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]};var fe={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=q.reduce((function(e,n){return e[n]=function(e,t,n){var r=C(e),o=[j,w].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[j,O].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},ce={left:"right",right:"left",bottom:"top",top:"bottom"};function pe(e){return e.replace(/left|right|bottom|top/g,(function(e){return ce[e]}))}var le={start:"end",end:"start"};function ue(e){return e.replace(/start|end/g,(function(e){return le[e]}))}function de(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?q:f,p=z(r),l=p?s?M:M.filter((function(e){return z(e)===p})):S,u=l.filter((function(e){return c.indexOf(e)>=0}));0===u.length&&(u=l,console.error(["Popper: The `allowedAutoPlacements` option did not allow any","placements. Ensure the `placement` option matches the variation","of the allowed placements.",'For example, "auto" cannot be used to allow "bottom-start".','Use "auto-start" instead.'].join(" ")));var d=u.reduce((function(t,n){return t[n]=K(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[C(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var me={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,l=n.rootBoundary,u=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,b=C(v),g=f||(b===v||!m?[pe(v)]:function(e){if(C(e)===E)return[];var t=pe(e);return[ue(e),t,ue(t)]}(v)),y=[v].concat(g).reduce((function(e,n){return e.concat(C(n)===E?de(t,{placement:n,boundary:p,rootBoundary:l,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),S=t.rects.reference,k=t.rects.popper,D=new Map,L=!0,M=y[0],q=0;q<y.length;q++){var A=y[q],T=C(A),W=z(A)===P,B=[w,x].indexOf(T)>=0,H=B?"width":"height",R=K(t,{placement:A,boundary:p,rootBoundary:l,altBoundary:u,padding:c}),I=B?W?O:j:W?x:w;S[H]>k[H]&&(I=pe(I));var V=pe(I),N=[];if(i&&N.push(R[T]<=0),s&&N.push(R[I]<=0,R[V]<=0),N.every((function(e){return e}))){M=A,L=!1;break}D.set(A,N)}if(L)for(var U=function(e){var t=y.find((function(t){var n=D.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return M=t,"break"},_=m?3:1;_>0;_--){if("break"===U(_))break}t.placement!==M&&(t.modifiersData[r]._skip=!0,t.placement=M,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function he(e,t,n){return R(e,I(t,n))}var ve={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,c=n.rootBoundary,p=n.altBoundary,l=n.padding,u=n.tether,m=void 0===u||u,h=n.tetherOffset,v=void 0===h?0:h,b=K(t,{boundary:f,rootBoundary:c,padding:l,altBoundary:p}),g=C(t.placement),E=z(t.placement),S=!E,k=G(g),D="x"===k?"y":"x",L=t.modifiersData.popperOffsets,M=t.rects.reference,q=t.rects.popper,A="function"==typeof v?v(Object.assign({},t.rects,{placement:t.placement})):v,T={x:0,y:0};if(L){if(i||s){var W="y"===k?w:j,B="y"===k?x:O,H="y"===k?"height":"width",V=L[k],N=L[k]+b[W],U=L[k]-b[B],_=m?-q[H]/2:0,F=E===P?M[H]:q[H],X=E===P?-q[H]:-M[H],Y=t.elements.arrow,J=m&&Y?d(Y):{width:0,height:0},Q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},Z=Q[W],$=Q[B],ee=he(0,M[H],J[H]),te=S?M[H]/2-_-ee-Z-A:F-ee-Z-A,ne=S?-M[H]/2+_+ee+$+A:X+ee+$+A,re=t.elements.arrow&&y(t.elements.arrow),oe=re?"y"===k?re.clientTop||0:re.clientLeft||0:0,ie=t.modifiersData.offset?t.modifiersData.offset[t.placement][k]:0,ae=L[k]+te-ie-oe,se=L[k]+ne-ie;if(i){var fe=he(m?I(N,ae):N,V,m?R(U,se):U);L[k]=fe,T[k]=fe-V}if(s){var ce="x"===k?w:j,pe="x"===k?x:O,le=L[D],ue=le+b[ce],de=le-b[pe],me=he(m?I(ue,ae):ue,le,m?R(de,se):de);L[D]=me,T[D]=me-le}}t.modifiersData[r]=T}},requiresIfExists:["offset"]};var be={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=C(n.placement),f=G(s),c=[j,O].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:J(e,S))}(o.padding,n),l=d(i),u="y"===f?w:j,m="y"===f?x:O,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],v=a[f]-n.rects.reference[f],b=y(i),g=b?"y"===f?b.clientHeight||0:b.clientWidth||0:0,E=h/2-v/2,P=p[u],k=g-l[c]-p[m],D=g/2-l[c]/2+E,L=he(P,D,k),M=f;n.modifiersData[r]=((t={})[M]=L,t.centerOffset=L-D,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&(i(r)||console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).',"To use an SVG arrow, wrap it in an HTMLElement that will be used as","the arrow."].join(" ")),N(t.elements.popper,r)?t.elements.arrow=r:console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper',"element."].join(" ")))},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ge(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[w,O,x,j].some((function(t){return e[t]>=0}))}var we={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=K(t,{elementContext:"reference"}),s=K(t,{altBoundary:!0}),f=ge(a,r),c=ge(s,o,i),p=ye(f),l=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":l})}},xe=ee({defaultModifiers:[ne,re,ae,se]}),Oe=[ne,re,ae,se,fe,me,ve,be,we],je=ee({defaultModifiers:Oe});e.applyStyles=se,e.arrow=be,e.computeStyles=ae,e.createPopper=je,e.createPopperLite=xe,e.defaultModifiers=Oe,e.detectOverflow=K,e.eventListeners=ne,e.flip=me,e.hide=we,e.offset=fe,e.popperGenerator=ee,e.popperOffsets=re,e.preventOverflow=ve,Object.defineProperty(e,"__esModule",{value:!0})}));