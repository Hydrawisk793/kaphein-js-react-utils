import React, { useCallback, useRef, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useComponentMountEffects } from "../../hooks-utils";

import { SizeUnitContext } from "../size-unit-context";

export const BrowserSizeUnitProvider = (function ()
{
    /**
     *  @typedef {import("./browser-size-unit-provider").BrowserSizeUnitProviderProps} OwnProps
     */

    /**
     *  @typedef {typeof import("../size-unit-context")["defaultValue"]} ContextValue
     */

    /**
     *  @param {OwnProps} props
     */
    function BrowserSizeUnitProvider(props)
    {
        const {
            children,
        } = props;

        const isWindowExist = useRef("undefined" !== typeof window);
        const [windowWidth, setWindowWidth] = useState((isWindowExist.current ? window.innerWidth : 0));
        const [windowHeight, setWindowHeight] = useState((isWindowExist.current ? window.innerHeight : 0));

        const onWindowResize = useCallback(
            () =>
            {
                setWindowWidth((isWindowExist.current ? window.innerWidth : 0));
                setWindowHeight((isWindowExist.current ? window.innerHeight : 0));
            },
            []
        )
        const didMount = useCallback(
            () =>
            {
                if(isWindowExist.current) {
                    window.addEventListener("resize", onWindowResize);
                }
            },
            [
                onWindowResize,
            ]
        );
        const willUnmount = useCallback(
            () =>
            {
                if(isWindowExist.current) {
                    window.removeEventListener("resize", onWindowResize);
                }
            },
            [
                onWindowResize,
            ]
        );

        useComponentMountEffects(didMount, willUnmount);

        const contextValue = useMemo(
            () =>
            {
                return /** @type {ContextValue} */({
                    vw : windowWidth * 0.01,
                    vh : windowHeight * 0.01,
                    rem : (
                        isWindowExist.current && "undefined" !== typeof window.document
                        ? parseFloat(getComputedStyle(document.documentElement).fontSize)
                        : 0
                    ),
                });
            },
            [
                windowWidth,
                windowHeight,
            ]
        );

        return (
            <SizeUnitContext.Provider
                value={ contextValue }
            >
                { children }
            </SizeUnitContext.Provider>
        );
    }

    BrowserSizeUnitProvider.displayName = "BrowserSizeUnitProvider";

    BrowserSizeUnitProvider.propTypes = {
        children : PropTypes.node,
    };

    BrowserSizeUnitProvider.whyDidYouRender = true;

    return BrowserSizeUnitProvider;
})();
