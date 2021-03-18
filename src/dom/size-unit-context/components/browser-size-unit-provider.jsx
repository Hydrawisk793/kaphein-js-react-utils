import React, { memo, useCallback, useRef, useMemo, useState } from "react";
import PropTypes from "prop-types";

import {
    useComponentDidMount,
    useComponentWillUnmount,
} from "../../../hooks";
import {
    useMutationObserver,
} from "../../hooks";
import { SizeUnitContext } from "../size-unit-context";

export const BrowserSizeUnitProvider = (function ()
{
    /**
     *  @typedef {import("./browser-size-unit-provider").BrowserSizeUnitProviderProps} OwnProps
     */

    /**
     *  @typedef {typeof import("../size-unit-context")["defaultValue"]} ContextValue
     */

    const remMutationOption = {
        attributes : true,
        attributeFilter : ["style"],
    };

    /**
     *  @param {OwnProps} props
     */
    function BrowserSizeUnitProvider(props)
    {
        const {
            children,
        } = props;

        const isWindowExist = useRef("undefined" !== typeof window);
        isWindowExist.current = "undefined" !== typeof window;
        const [windowWidth, setWindowWidth] = useState((isWindowExist.current ? window.innerWidth : 0));
        const [windowHeight, setWindowHeight] = useState((isWindowExist.current ? window.innerHeight : 0));
        const [rem, setRem] = useState(0);

        const onWindowResize = useCallback(
            function ()
            {
                setWindowWidth((isWindowExist.current ? window.innerWidth : 0));
                setWindowHeight((isWindowExist.current ? window.innerHeight : 0));
            },
            []
        );

        const contextValue = useMemo(
            function ()
            {
                return /** @type {ContextValue} */({
                    vw : windowWidth * 0.01,
                    vh : windowHeight * 0.01,
                    rem : rem,
                });
            },
            [
                windowWidth,
                windowHeight,
                rem,
            ]
        );

        useComponentDidMount(
            function ()
            {
                if(isWindowExist.current)
                {
                    window.addEventListener("resize", onWindowResize);

                    setRem(Number.parseFloat(getComputedStyle(document.documentElement).fontSize));
                }
            }
        );
        useComponentWillUnmount(
            function ()
            {
                if(isWindowExist.current)
                {
                    window.removeEventListener("resize", onWindowResize);
                }
            }
        );
        useMutationObserver(
            document.documentElement,
            remMutationOption,
            /**
             *  @type {Parameters<typeof useMutationObserver>["2"]}
             */
            function (mutation)
            {
                /** @type {HTMLElement} */const target = mutation.target;
                setRem(Number.parseFloat(target.style.fontSize));
            }
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

    return memo(BrowserSizeUnitProvider);
})();
