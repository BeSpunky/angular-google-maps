/** To avoid using lodash in the library, these are simplified versions of a few of lodash's utils. */

/**
 * Breaks a string like 'The_thing91 isBLACK83andWhite a BLACK' to words and composes it as either camelCase ('theThing91391IsBlackAndWhiteABlack') or CamelCase 'TheThing91391IsBlackAndWhiteABlack'.
 * @internal
 * @export
 * @param {string} phrase The phrase to convert to camel case.
 * @param {boolean} upperFirst (Optional) `true` to convert the first letter to uppercase (creating CamelCase); otherwise `false` (creating camelCase). Default is `false`.
 * @returns The camel case representation of the phrase
 */
export function camelCase(phrase: string, upperFirst: boolean = false)
{
                 // Extract an array of all word parts
    return phrase.match(/[a-z0-9]+|[A-Z][a-z0-9]+|[A-Z0-9]+/g)
                 // Convert every word to lowercase with a first uppercase
                 .map(word => word.toLowerCase().replace(/^./, first => first.toUpperCase()))
                 // Stick all words together
                 .join('')
                 // Convert only the first letter to lowercase
                 .replace(/^./, first => upperFirst ? first.toUpperCase() : first.toLowerCase());
}