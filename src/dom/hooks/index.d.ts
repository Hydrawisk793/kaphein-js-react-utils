import { MutableRefObject } from "react";

export function useMutationObserver(
    target : MutableRefObject<Element>,
    observerOption : MutationObserverInit,
    onChanged : (
        mutation : MutationRecord
    ) => void,
    option? : {
        MutationObserver : typeof MutationObserver;
    }
) : void;

export function useResizeObserver(
    target : MutableRefObject<Element>,
    onRegionChanged : (
        entry : ResizeObserverEntry
    ) => void,
    option? : {
        ResizeObserver : typeof ResizeObserver;
    }
) : void;
