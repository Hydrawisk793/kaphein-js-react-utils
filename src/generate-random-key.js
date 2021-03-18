module.exports = (function ()
{
    var hexChars = "0123456789abcdef";

    /**
     *  @deprecated
     *  @param {number} length
     */
    function generateRandomKey(length)
    {
        if(!Number.isSafeInteger(length))
        {
            throw new TypeError("'length' must be a safe integer.");
        }

        var maxIndex = hexChars.length - 1;
        var chars = [];
        for(var i = 0; i < length; ++i)
        {
            chars.push(hexChars[Math.floor((Math.random() * maxIndex))]);
        }

        return chars.join("");
    }

    return {
        generateRandomKey : generateRandomKey
    };
})();
