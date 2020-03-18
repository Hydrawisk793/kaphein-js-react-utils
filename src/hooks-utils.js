import {
    useRef,
    useState,
    useCallback,
    useEffect,
    useLayoutEffect,
} from "react";
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

/**
 *  Original by sophiebits and sokra.
 *  https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *  https://github.com/facebook/react/issues/14099#issuecomment-440172008
 *
 *  @template {(...args : any[]) => any} T
 *  @param {T} callback
 *  @returns {T}
 */
export function useEventCallback(callback)
{
    const ref = useRef(/** @type {typeof callback} */(null));

    useLayoutEffect(
        () =>
        {
            ref.current = callback;
        }
    );

    return useCallback(
        // Unbounds the this reference of the callback.
        (...args) => (0, ref.current)(...args),
        []
    );
}
