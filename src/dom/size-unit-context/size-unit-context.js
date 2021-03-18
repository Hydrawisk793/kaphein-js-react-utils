var React = require("react");
var createContext = React.createContext;

module.exports = (function ()
{
    var defaultValue = {
        oneVw : 0,
        oneVh : 0,
        oneRem : 0,
    };

    var SizeUnitContext = createContext(defaultValue);
    SizeUnitContext.displayName = "SizeUnitContext";

    return {
        SizeUnitContext,
        defaultValue,
    };
})();
