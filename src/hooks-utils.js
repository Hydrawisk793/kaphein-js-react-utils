var React = require("react");
var useRef = React.useRef;
var useCallback = React.useCallback;
var useEffect = React.useEffect;
var useLayoutEffect = React.useLayoutEffect;
var kapheinJs = require("kaphein-js");
var isFunction = kapheinJs.isFunction;
var forOf = kapheinJs.forOf;
var deepEquals = kapheinJs.deepEquals;

module.exports = (function ()
{
    /**
     *  @typedef {import("kaphein-js").EqualComparer<any>} AnyEqualComparer
     */

    /**
     *  @template T
     *  @param {T} value
     *  @param {T} [initialValue]
     */
    function usePrevious(value)
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
    function useLatestRef(value)
    {
        var ref = useRef(value);

        useEffect(
            function ()
            {
                ref.current = value;
            },
            [
                value
            ]
        );

        return ref;
    }

    function useIsMountedRef()
    {
        var ref = useRef(false);

        useEffect(
            function ()
            {
                ref.current = true;

                return function ()
                {
                    ref.current = false;
                };
            },
            []
        );

        return ref;
    }

    var emptyDeps = [];

    /**
     *  Inspired by apollo-client (https://github.com/apollographql/apollo-client/blob/master/src/react/hooks/utils/useDeepMemo.ts)
     *
     *  @template V
     *  @param {() => V} factory
     *  @param {any[]} [deps]
     *  @param {AnyEqualComparer} [comparer]
     */
    function useDeepMemo(factory)
    {
        if("function" !== typeof factory)
        {
            throw new TypeError("'factory' must be a function that returns a value.");
        }

        var deps = arguments[1] || emptyDeps;
        /** @type {AnyEqualComparer} */var comparer = arguments[2];
        if("function" !== typeof comparer)
        {
            comparer = deepEquals;
        }

        var memoRef = useRef(/** @type {{ deps : any[], value : V }} */(null));
        if(!memoRef.current || !comparer(deps, memoRef.current.deps))
        {
            memoRef.current = {
                deps : deps,
                value : factory()
            };
        }

        return memoRef.current.value;
    }

    /**
     *  @param {Function} callback
     */
    function useComponentDidMount(callback)
    {
        var callbackRef = useRef(callback);
        callbackRef.current = callback;

        useLayoutEffect(
            function ()
            {
                if(callbackRef.current)
                {
                    (0, callbackRef.current)();
                }
            },
            []
        );
    }

    /**
     *  @param {Function} callback
     */
    function useComponentWillUnmount(callback)
    {
        var callbackRef = useRef(callback);
        callbackRef.current = callback;

        useLayoutEffect(
            function ()
            {
                return function ()
                {
                    if(callbackRef.current)
                    {
                        (0, callbackRef.current)();
                    }
                };
            },
            []
        );
    }

    /**
     *  @param {Function} [onDidMount]
     *  @param {Function} [onWillUnmount]
     */
    function useComponentMountEffects()
    {
        var onDidMount = arguments[0];
        var onWillUnmount = arguments[1];

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
    function useEventCallback(callback)
    {
        var callbackRef = useRef(callback);

        useLayoutEffect(
            function ()
            {
                callbackRef.current = callback;
            }
        );

        return useCallback(
            function (...args)
            {
                // Unbounds the this reference of the callback.
                return (callbackRef.current ? (0, callbackRef.current)(...args) : void 0);
            },
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
    function useMutationObserver(targetRef, observerOption, onChanged)
    {
        var option = arguments[3];
        if("undefined" === typeof option)
        {
            option = {};
        }
        /** @type {window["MutationObserver"] */var MutationObserver = (
            ("undefined" === typeof window || !("MutationObserver" in window))
                ? option.MutationObserver
                : window.MutationObserver
        );

        useEffect(
            function ()
            {
                if(targetRef.current)
                {
                    /** @type {MutationObserver} */var observer = null;
                    if(MutationObserver)
                    {
                        observer = new MutationObserver(
                            function (mutations)
                            {
                                forOf(mutations, function (mutation)
                                {
                                    if(mutation.target === targetRef.current)
                                    {
                                        if(isFunction(onChanged))
                                        {
                                            onChanged(mutation);
                                        }
                                    }
                                });
                            }
                        );
                        observer.observe(targetRef.current, observerOption);
                    }

                    return function ()
                    {
                        if(observer)
                        {
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
    function useResizeObserver(targetRef, onRegionChanged)
    {
        var option = arguments[2];
        if("undefined" === typeof option)
        {
            option = {};
        }
        /** @type {window["ResizeObserver"]} */var ResizeObserver = (
            ("undefined" === typeof window || !("ResizeObserver" in window))
                ? option.ResizeObserver
                : window.ResizeObserver
        );

        useEffect(
            function ()
            {
                if(targetRef.current)
                {
                    /** @type {ResizeObserver} */var observer = null;
                    if(ResizeObserver)
                    {
                        observer = new ResizeObserver(
                            function (entries)
                            {
                                forOf(entries, function (entry)
                                {
                                    if(entry.target === targetRef.current)
                                    {
                                        if(isFunction(onRegionChanged))
                                        {
                                            onRegionChanged(entry);
                                        }
                                    }
                                });
                            }
                        );
                        observer.observe(targetRef.current);
                    }

                    return function ()
                    {
                        if(observer)
                        {
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

    return {
        usePrevious : usePrevious,
        useLatestRef : useLatestRef,
        useIsMountedRef : useIsMountedRef,
        useDeepMemo : useDeepMemo,
        useComponentDidMount : useComponentDidMount,
        useComponentWillUnmount : useComponentWillUnmount,
        useComponentMountEffects : useComponentMountEffects,
        useEventCallback : useEventCallback,
        useMutationObserver : useMutationObserver,
        useResizeObserver : useResizeObserver
    };
})();
