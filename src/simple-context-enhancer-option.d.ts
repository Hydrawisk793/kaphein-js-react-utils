import React from "react";

interface SimpleContextEnhancerOption<X extends React.Context<any>, P = {}>
{
    mapContextValueToProps : (contextValue : React.ComponentProps<X["Provider"]>["value"]) => P;

    contextDisplayName? : string;
}

export {
    SimpleContextEnhancerOption,
};
