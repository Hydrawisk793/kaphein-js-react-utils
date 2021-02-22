var kapheinJs = require("kaphein-js");
var generateRandomHexString = kapheinJs.generateRandomHexString;

module.exports = (function ()
{
    /**
     *  @param {number} length
     */
    function generateRandomKey(length)
    {
        return generateRandomHexString(length);
    }

    return {
        generateRandomKey : generateRandomKey
    };
})();
