var React = require("react");
var isString = require("../kaphein-js/utils/type-trait").isString;
var isCallable = require("../kaphein-js/utils/type-trait").isCallable;

/**
 *  @typedef {import("../component-event").ComponentEvent} ComponentEvent
 */

/**
 *  @template P, S, SS, E
 *  @param {React.Component<P, S, SS>} component
 *  @param {string} handlerName
 *  @param {E extends ComponentEvent ? E : ComponentEvent} args
 */
function raiseEvent(component, handlerName, args)
{
    var handler;

    if(!(component instanceof React.Component)) {
        throw new TypeError("'component' must be an instance of React.Component.");
    }

    if(!isString(handlerName)) {
        throw new TypeError("'handlerName' must be a string.");
    }

    handler = component.props[handlerName];
    if(isCallable(handler)) {
        handler(args);
    }
}

module.exports = {
    raiseEvent : raiseEvent,
};
