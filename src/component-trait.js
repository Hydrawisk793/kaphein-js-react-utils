/**
 *  @see https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
 */
function isReactClassComponent(klass)
{
    return (
        "function" === typeof klass
        && !!klass.prototype.isReactComponent
    );
};

/**
 *  @see https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
 */
function isReactFunctionComponent(klass)
{
    return (
        "function" === typeof klass
        && String(klass).includes("return React.createElement")
    );
};

/**
 *  @see https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
 */
function isReactComponent(klass)
{
    return isReactClassComponent(klass)
        || isReactFunctionComponent(klass)
    ;
};

module.exports = {
    isReactClassComponent : isReactClassComponent,
    isReactFunctionComponent : isReactFunctionComponent,
    isReactComponent : isReactComponent,
};
