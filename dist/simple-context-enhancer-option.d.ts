import React from "react";

declare interface SimpleContextEnhancerOption<X extends React.Context<any>, P = {}>
{
    mapContextValueToProps : (contextValue : React.ComponentProps<X["Provider"]>["value"]) => P;

    contextDisplayName? : string;
}

export {
    SimpleContextEnhancerOption,
};
