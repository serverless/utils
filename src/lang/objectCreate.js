/**
 * Creates a new object, using an existing object as the prototype of the newly created object.
 *
 * See [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) for more information
 *
 * @function
 * @since v0.0.18
 * @category lang
 * @param {object} proto The object which should be the prototype of the newly-created object.
 * @param {object} propertiesObject If specified and not undefined, an object whose enumerable own properties (that is, those properties defined upon itself and not enumerable properties along its prototype chain) specify property descriptors to be added to the newly-created object, with the corresponding property names.
 * @returns {object} A new object with the specified prototype object and properties.
 * @example
 *
 * const person = {
 *   isHuman: false,
 *   printIntroduction: function () {
 *     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
 *   }
 * }
 *
 * const me = objectCreate(person)
 *
 * me.name = 'Matthew' // 'name' is a property set on 'me', but not on 'person'
 * me.isHuman = true // inherited properties can be overwritten
 *
 * me.printIntroduction()
 * //=> 'My name is Matthew. Am I human? true'
 */
const objectCreate = Object.create

export default objectCreate
