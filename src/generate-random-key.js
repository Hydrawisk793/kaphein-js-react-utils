import { generateRandomHexString } from "kaphein-js";

export const {
    generateRandomKey,
} = (function ()
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
