!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.kapheinJsReactUtils=t():e.kapheinJsReactUtils=t()}(window,function(){return r={},o.m=n=[function(e,t){e.exports=require("kaphein-js")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),Object.defineProperty(t,"generateRandomKey",{"enumerable":!0,"get":function(){return r.generateRandomKey}}),Object.defineProperty(t,"createSimpleContextEnhancer",{"enumerable":!0,"get":function(){return o.createSimpleContextEnhancer}});var r=n(2),o=n(3)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),t.generateRandomKey=void 0;var r=n(0),o={"generateRandomKey":function(e){return(0,r.generateRandomHexString)(e)}}.generateRandomKey;t.generateRandomKey=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),t.createSimpleContextEnhancer=function(e,r){var o=(0,c.memoize)(r.mapContextValueToProps),u=e;return function(n){function e(t){return i.default.createElement(u.Consumer,null,function(e){return i.default.createElement(n,Object.assign({},t,o(e)))})}e.injectedPropType={},e.whyDidYouRender=!0;var t=i.default.memo(e);return t.displayName="WithContext<"+r.contextDisplayName+">("+(n.displayName||n.name)+")",(0,a.default)(t,e)}};var i=r(n(4)),a=r(n(5)),c=n(0);function r(e){return e&&e.__esModule?e:{"default":e}}},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("hoist-non-react-statics")}],o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{"enumerable":!0,"get":n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{"value":"Module"}),Object.defineProperty(e,"__esModule",{"value":!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{"enumerable":!0,"value":t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1);function o(e){if(r[e])return r[e].exports;var t=r[e]={"i":e,"l":!1,"exports":{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}var n,r});