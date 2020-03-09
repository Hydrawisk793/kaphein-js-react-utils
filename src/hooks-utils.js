import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { isFunction } from "kaphein-js";

/**
 *  @template T
 *  @param {T} value
 *  @param {T} [initialValue]
 */
export function usePrevious(value)
{
    var prevValueRef = useRef(arguments[1]);

    useEffect(
        function ()
        {
            prevValueRef.current = value;
        },
        [
            value
        ]
    );

    return prevValueRef.current;
}

/**
 *  @param {Function} [onDidMount]
 *  @param {Function} [onWillUnmount]
 */
export function useComponentMountEffects(onDidMount = void 0, onWillUnmount = void 0)
{
    const [didMount, setDidMount] = useState(false);
    const [willUnmount, setWillUnmount] = useState(false);

    useLayoutEffect(
        () =>
        {
            if(!didMount) {
                setDidMount(true);

                if(isFunction(onDidMount)) {
                    onDidMount();
                }
            }
        },
        [
            didMount,
            onDidMount,
        ]
    );

    useLayoutEffect(
        () =>
        () =>
        {
            if(didMount && !willUnmount) {
                setWillUnmount(true);

                if(isFunction(onWillUnmount)) {
                    onWillUnmount();
                }
            }
        },
        [
            didMount,
            willUnmount,
            onWillUnmount,
        ]
    );

    return [didMount, willUnmount];
}
