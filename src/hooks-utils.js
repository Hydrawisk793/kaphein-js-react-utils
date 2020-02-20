import { useRef, useEffect } from "react";

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
