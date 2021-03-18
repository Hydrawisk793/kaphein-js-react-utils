var React = require("react");
var useRef = React.useRef;
var useCallback = React.useCallback;
var useEffect = React.useEffect;
var useLayoutEffect = React.useLayoutEffect;
var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isArray = kapheinJsTypeTrait.isArray;
var isFunction = kapheinJsTypeTrait.isFunction;
var kapheinJsObjectUtils = require("kaphein-js-object-utils");
var shallowEquals = kapheinJsObjectUtils.shallowEquals;

module.exports = (function ()
{
    /**
     *  @typedef {import("kaphein-js-collection").EqualComparer<any>} AnyEqualComparer
     */

    var _slice = Array.prototype.slice;

    var _isArray = Array.isArray || isArray;

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

    var _emptyDeps = [];

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
        if(!isFunction(factory))
        {
            throw new TypeError("'factory' must be a function that returns a value.");
        }

        var deps = arguments[1];
        if(!_isArray(deps) || deps.length < 1)
        {
            deps = _emptyDeps;
        }

        /** @type {AnyEqualComparer} */var comparer = arguments[2];
        if(!isFunction(comparer))
        {
            comparer = shallowEquals;
        }

        var memoRef = useRef(/** @type {{ deps : any[], value : V }} */(null));
        if(!memoRef.current || !_compareDeps(deps, memoRef.current.deps, comparer))
        {
            memoRef.current = {
                deps : deps,
                value : factory()
            };
        }

        return memoRef.current.value;
    }

    /**
     *  @param {any[]} oldDeps
     *  @param {any[]} newDeps
     *  @param {AnyEqualComparer} comparer
     */
    function _compareDeps(oldDeps, newDeps, comparer)
    {
        var result = oldDeps === newDeps;
        if(!result)
        {
            var isArr = _isArray(newDeps);
            result = _isArray(oldDeps) === isArr;
            if(result && isArr)
            {
                var len = newDeps.length;
                result = oldDeps.length === len;
                if(result)
                {
                    var i;
                    for(i = 0; result && i < len; ++i)
                    {
                        result = comparer(oldDeps[i], newDeps[i]);
                    }
                }
            }
        }

        return result;
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
            function ()
            {
                var args = _slice.call(arguments);

                return (
                    callbackRef.current
                        ? callbackRef.current.apply(void 0, args)
                        : void 0
                );
            },
            []
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
    };
})();
