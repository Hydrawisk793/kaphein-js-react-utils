import React from "react";

export declare type ReactContextValueType<
    X extends React.Context<any>
> = React.ComponentProps<X["Provider"]>["value"];
