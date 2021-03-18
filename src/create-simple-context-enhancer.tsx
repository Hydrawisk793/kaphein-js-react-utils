import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { memoize } from "kaphein-js";

import { ReactContextValueType } from "./ts-utils";
import { SimpleContextEnhancerOption } from "./simple-context-enhancer-option";

export function createSimpleContextEnhancer<X extends React.Context<any> = React.Context<any>, Xp = {}>(
    context : X,
    option : SimpleContextEnhancerOption<X, Xp>
)
{
    var mapContextValueToProps : typeof option.mapContextValueToProps = memoize(option.mapContextValueToProps);
    var Ctxt : X = context;

    return function enhanceComponent<C>(
        componentType : (C extends React.ComponentType<any> ? C : React.ComponentType<any>)
    )
    {
        function I(props : (C extends React.ComponentType<any> ? Omit<React.ComponentProps<C>, keyof Xp> : {}))
        {
            return (
                <Ctxt.Consumer>
                    {
                        function (contextValue : ReactContextValueType<X>)
                        {
                            return React.createElement(
                                componentType,
                                Object.assign({}, props, mapContextValueToProps(contextValue))
                            );
                        }
                    }
                </Ctxt.Consumer>
            );
        }
        I.injectedPropType = {} as Xp;

        var F = React.memo(I);
        F.displayName = `WithContext<${ option.contextDisplayName }>(${ componentType.displayName || componentType.name })`;

        return hoistNonReactStatics(F, I);
    };
}
