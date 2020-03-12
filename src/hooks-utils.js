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

    const didMountRef = useRef(onDidMount);
    const willUnmountRef = useRef(onWillUnmount);

    useLayoutEffect(
        () =>
        {
            if(!didMount) {
                setDidMount(true);
                if(isFunction(didMountRef.current)) {
                    didMountRef.current();
                }
            }

            if(didMount) {
                return () =>
                {
                    if(didMount && !willUnmount) {
                        setWillUnmount(true);
                        if(isFunction(willUnmountRef.current())) {
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            willUnmountRef.current();
                        }
                    }
                };
            }
        },
        [
            didMount,
            willUnmount,
        ]
    );

    return [didMount, willUnmount];
}
