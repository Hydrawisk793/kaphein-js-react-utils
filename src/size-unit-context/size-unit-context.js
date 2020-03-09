import { createContext } from "react";

export const {
    SizeUnitContext,
    defaultValue,
} = (function ()
{
    const defaultValue = {
        oneVw : 0,
        oneVh : 0,
        oneRem : 0,
    };

    const SizeUnitContext = createContext(defaultValue);
    SizeUnitContext.Provider.displayName = "SizeUnitContext.Provider";
    SizeUnitContext.Consumer.displayName = "SizeUnitContext.Consumer";

    return {
        SizeUnitContext,
        defaultValue,
    };
})();
