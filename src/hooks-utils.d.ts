export function usePrevious<T>(
    value : T,
    initialValue? : T
) : T;

export function useComponentMountEffects(
    didMount? : Function,
    willUnmount? : Function
) : [boolean, boolean];
