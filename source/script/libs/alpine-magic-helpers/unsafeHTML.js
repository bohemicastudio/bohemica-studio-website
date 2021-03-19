(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.AlpineMagicHelpers = global.AlpineMagicHelpers || {}, global.AlpineMagicHelpers.unsafeHTML = factory()));
}(this, (function () { 'use strict';

    var checkForAlpine = function checkForAlpine() {
      if (!window.Alpine) {
        throw new Error('[Magic Helpers] Alpine is required for the magic helpers to function correctly.');
      }

      if (!window.Alpine.version || !isValidVersion('2.5.0', window.Alpine.version)) {
        throw new Error('Invalid Alpine version. Please use Alpine version 2.5.0 or above');
      }
    };

    function isValidVersion(required, current) {
      var requiredArray = required.split('.');
      var currentArray = current.split('.');

      for (var i = 0; i < requiredArray.length; i++) {
        if (!currentArray[i] || parseInt(currentArray[i]) < parseInt(requiredArray[i])) {
          return false;
        }
      }

      return true;
    }
    function parseHtmlAttribute(_ref) {
      var name = _ref.name,
          value = _ref.value;
      var xAttrRE = /^x-([a-zA-Z-]*)\b/;
      var typeMatch = name.match(xAttrRE);
      var valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
      var modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map(function (i) {
          return i.replace('.', '');
        }),
        expression: value
      };
    }

    var DIRECTIVE = 'x-unsafe-html';

    var nodeScriptClone = function nodeScriptClone(node) {
      var script = document.createElement('script');
      script.text = node.innerHTML;

      for (var i = 0; i < node.attributes.length; i++) {
        var attr = node.attributes[i];
        script.setAttribute(attr.name, attr.value);
      }

      return script;
    };

    var nodeScriptReplace = function nodeScriptReplace(node) {
      if (node.tagName && node.tagName.toLowerCase() === 'script') {
        node.parentNode.replaceChild(nodeScriptClone(node), node);
      } else {
        for (var i = 0; i < node.childNodes.length; i++) {
          nodeScriptReplace(node.childNodes[i]);
        }
      }

      return node;
    };

    var AlpineUnsafeHTMLCustomDirective = {
      start: function start() {
        checkForAlpine();
        Alpine.onBeforeComponentInitialized(function (component) {
          var legacyResolveBoundAttributes = component.resolveBoundAttributes;

          component.resolveBoundAttributes = function (el, initialUpdate, extraVars) {
            if (initialUpdate === void 0) {
              initialUpdate = false;
            }

            var attrs = Array.from(el.attributes).filter(function (attr) {
              return attr.name === DIRECTIVE;
            }).map(parseHtmlAttribute);
            attrs.forEach(function (_ref) {
              var expression = _ref.expression;
              el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
              nodeScriptReplace(el);
            });
            return legacyResolveBoundAttributes.bind(component)(el, initialUpdate, extraVars);
          };
        });
      }
    };

    var alpine = window.deferLoadingAlpine || function (alpine) {
      return alpine();
    };

    window.deferLoadingAlpine = function (callback) {
      AlpineUnsafeHTMLCustomDirective.start();
      alpine(callback);
    };

    return AlpineUnsafeHTMLCustomDirective;

})));
