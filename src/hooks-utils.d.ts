export function usePrevious<T>(
    value : T,
    initialValue? : T
) : T;

export function useComponentMountEffects(
    didMount? : Function,
    willUnmount? : Function
) : [boolean, boolean];

/**
 *  Original by sophiebits and sokra.
 *  https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *  https://github.com/facebook/react/issues/14099#issuecomment-440172008
 *
 *  Use this hook ONLY for setting component callback props.
 */
export function useEventCallback<T extends (...args : any[]) => any>(
    callback : T
) : T;

export function useResizeObserver(
    target : Element,
    onRegionChanged : (
        entry : ResizeObserverEntry
    ) => void,
    option? : {
        ResizeObserver : typeof ResizeObserver;
    }
) : void;
