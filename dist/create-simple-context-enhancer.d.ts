import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { SimpleContextEnhancerOption } from "./simple-context-enhancer-option";
declare function createSimpleContextEnhancer<X extends React.Context<any>, Xp = {}>(context: X, option: SimpleContextEnhancerOption<X, Xp>): <C>(componentType: C extends React.ComponentType<any> ? C : React.ComponentType<any>) => React.NamedExoticComponent<React.PropsWithRef<C extends React.ComponentType<any> ? Pick<React.ComponentProps<C>, Exclude<keyof React.ComponentProps<C>, keyof Xp>> : {}>> & {
    readonly type: {
        (props: C extends React.ComponentType<any> ? Pick<React.ComponentProps<C>, Exclude<keyof React.ComponentProps<C>, keyof Xp>> : {}): JSX.Element;
        injectedPropType: Xp;
        whyDidYouRender: boolean;
    };
} & hoistNonReactStatics.NonReactStatics<{
    (props: C extends React.ComponentType<any> ? Pick<React.ComponentProps<C>, Exclude<keyof React.ComponentProps<C>, keyof Xp>> : {}): JSX.Element;
    injectedPropType: Xp;
    whyDidYouRender: boolean;
}, {}>;
export { createSimpleContextEnhancer, };
//# sourceMappingURL=create-simple-context-enhancer.d.ts.map