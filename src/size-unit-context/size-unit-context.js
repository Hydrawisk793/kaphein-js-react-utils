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
    SizeUnitContext.displayName = "SizeUnitContext";

    return {
        SizeUnitContext,
        defaultValue,
    };
})();
