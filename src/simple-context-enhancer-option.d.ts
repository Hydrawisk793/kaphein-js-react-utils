import React from "react";

export declare interface SimpleContextEnhancerOption<
    X extends React.Context<any>, P = {}
>
{
    mapContextValueToProps : (
        contextValue : React.ComponentProps<X["Provider"]>["value"]
    ) => P;

    contextDisplayName? : string;
}
