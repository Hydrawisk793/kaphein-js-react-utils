import { Context } from "react";
import { ReactContextValueType } from "../ts-utils";

export const SizeUnitContext : Context<{
    vw : number;
    vh : number;
    rem : number;
}>;

export const defaultValue : ReactContextValueType<typeof SizeUnitContext>;
