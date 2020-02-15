"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSimpleContextEnhancer = createSimpleContextEnhancer;

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _kapheinJs = require("kaphein-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createSimpleContextEnhancer(context, option) {
  var mapContextValueToProps = (0, _kapheinJs.memoize)(option.mapContextValueToProps);
  var Ctxt = context;
  return function enhanceComponent(componentType) {
    function I(props) {
      return _react["default"].createElement(Ctxt.Consumer, null, function (contextValue) {
        return _react["default"].createElement(componentType, Object.assign({}, props, mapContextValueToProps(contextValue)));
      });
    }

    ;
    I.injectedPropType = {};
    I.whyDidYouRender = true;

    var F = _react["default"].memo(I);

    F.displayName = "WithContext<".concat(option.contextDisplayName, ">(").concat(componentType.displayName || componentType.name, ")");
    return (0, _hoistNonReactStatics["default"])(F, I);
  };
}