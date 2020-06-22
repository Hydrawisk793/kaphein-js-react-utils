import {
    useRef,
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
    var prevValueRef = useRef((arguments.lenght > 1 ? arguments[1] : value));

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
 *  @template T
 *  @param {T} value
 */
export function useLatestRef(value)
{
    var ref = useRef(value);
    ref.current = value;

    return ref;
}

/**
 *  @param {Function} callback
 */
export function useComponentDidMount(callback)
{
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useLayoutEffect(
        () =>
        {
            if(callbackRef.current) {
                (0, callbackRef.current)();
            }
        },
        []
    );
}

/**
 *  @param {Function} callback
 */
export function useComponentWillUnmount(callback)
{
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useLayoutEffect(
        () =>
        () =>
        {
            if(callbackRef.current) {
                (0, callbackRef.current)();
            }
        },
        []
    );
}

/**
 *  @param {Function} [onDidMount]
 *  @param {Function} [onWillUnmount]
 */
export function useComponentMountEffects(onDidMount = void 0, onWillUnmount = void 0)
{
    useComponentDidMount(onDidMount);
    useComponentWillUnmount(onWillUnmount);
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
    const callbackRef = useRef(callback);

    useLayoutEffect(
        () =>
        {
            callbackRef.current = callback;
        }
    );

    return useCallback(
        // Unbounds the this reference of the callback.
        (...args) => (callbackRef.current ? (0, callbackRef.current)(...args) : void 0),
        []
    );
}

/**
 *  @param {React.MutableRefObject<Element>} targetRef
 *  @param {MutationObserverInit} observerOption
 *  @param {(mutation : MutationRecord) => void} onChanged
 *  @param {{
        MutationObserver : typeof MutationObserver;
    }} [option]
 */
export function useMutationObserver(targetRef, observerOption, onChanged, option = {})
{
    /** @type {window["MutationObserver"] */const MutationObserver = (
        ("undefined" === typeof window || !("MutationObserver" in window))
        ? option.MutationObserver
        : window.MutationObserver
    );

    useEffect(
        function ()
        {
            if(targetRef.current) {
                /** @type {MutationObserver} */let observer = null;
                if(MutationObserver) {
                    observer = new MutationObserver(
                        function (mutations)
                        {
                            for(let mutation of mutations) {
                                if(mutation.target === targetRef.current) {
                                    if(isFunction(onChanged)) {
                                        onChanged(mutation);
                                    }
                                }
                            }
                        }
                    );
                    observer.observe(targetRef.current, observerOption);
                }

                return function ()
                {
                    if(observer) {
                        observer.disconnect();
                    }
                }
            }
        },
        [
            MutationObserver,
            observerOption,
            targetRef,
            onChanged,
        ]
    );
}

/**
 *  @param {React.MutableRefObject<Element>} targetRef
 *  @param {(entry : ResizeObserverEntry) => void} onRegionChanged
 *  @param {{
        ResizeObserver : typeof ResizeObserver;
    }} [option]
 */
export function useResizeObserver(targetRef, onRegionChanged, option = {})
{
    /** @type {window["ResizeObserver"]} */const ResizeObserver = (
        ("undefined" === typeof window || !("ResizeObserver" in window))
        ? option.ResizeObserver
        : window.ResizeObserver
    );

    useEffect(
        function ()
        {
            if(targetRef.current) {
                /** @type {ResizeObserver} */let observer = null;
                if(ResizeObserver) {
                    observer = new ResizeObserver(
                        function (entries)
                        {
                            for(let entry of entries) {
                                if(entry.target === targetRef.current) {
                                    if(isFunction(onRegionChanged)) {
                                        onRegionChanged(entry);
                                    }
                                }
                            }
                        }
                    );
                    observer.observe(targetRef.current);
                }

                return function ()
                {
                    if(observer) {
                        observer.disconnect();
                    }
                }
            }
        },
        [
            ResizeObserver,
            targetRef,
            onRegionChanged,
        ]
    );
}
