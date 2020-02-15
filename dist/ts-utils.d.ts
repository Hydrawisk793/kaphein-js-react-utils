import React from "react";

declare type ReactContextValueType<X extends React.Context<any>> = React.ComponentProps<X["Provider"]>["value"];

export {
    ReactContextValueType,
};
