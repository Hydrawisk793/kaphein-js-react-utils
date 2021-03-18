var React = require("react");
var useEffect = React.useEffect;
var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isFunction = kapheinJsTypeTrait.isFunction;
var kapheinJsCollection = require("kaphein-js-collection").forOf;
var forOf = kapheinJsCollection.forOf;

module.exports = (function ()
{
    /**
     *  @param {React.MutableRefObject<Element>} targetRef
     *  @param {MutationObserverInit} observerOption
     *  @param {(
            mutation : MutationRecord
        ) => void} onChanged
     *  @param {{
            MutationObserver : typeof MutationObserver;
        }} [option]
     */
    function useMutationObserver(targetRef, observerOption, onChanged)
    {
        var option = arguments[3];
        if(!option)
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
     *  @param {(
            entry : ResizeObserverEntry
        ) => void} onRegionChanged
     *  @param {{
            ResizeObserver : typeof ResizeObserver;
        }} [option]
     */
    function useResizeObserver(targetRef, onRegionChanged)
    {
        var option = arguments[2];
        if(!option)
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
        useMutationObserver : useMutationObserver,
        useResizeObserver : useResizeObserver
    };
})();
