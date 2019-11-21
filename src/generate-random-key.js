/**
 *  @param {number} length
 */
function generateRandomKey(length)
{
    var chars = "abcdef0123456789";
    var keyChars = [];
    var i;

    for(i = length; i > 0; ) {
        --i;

        keyChars.splice(keyChars.length, 0, chars[Math.floor(Math.random() * (chars.length - 1))]);
    }

    return keyChars.join("");
};

module.exports = {
    generateRandomKey : generateRandomKey,
};
