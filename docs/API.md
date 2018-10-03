# API

*NOTES*
* These API docs are still being written. However, we have attempted to stick to the Ramda signature as much as possible for our data methods. So, in most cases, the [ramda documentation](https://ramdajs.com/docs/) is a good point of reference.
* A number of our data methods have async support built in. They will automatically upgrade to async methods when an async iteratee is used.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [common methods](#common-methods)
  * [all()](#all)
  * [apply()](#apply)
  * [deferredPromise()](#deferredpromise)
  * [defn()](#defn)
  * [dispatchable()](#dispatchable)
  * [nAry()](#nary)
  * [nArySpread()](#naryspread)
  * [sleep()](#sleep)
- [data methods](#data-methods)
  * [any()](#any)
  * [anyAtIndex()](#anyatindex)
  * [arrayLikeKeys()](#arraylikekeys)
  * [assoc()](#assoc)
  * [assocIndex()](#associndex)
  * [assocPath()](#assocpath)
  * [assocProp()](#assocprop)
  * [every()](#every)
  * [everyAtIndex()](#everyatindex)
  * [find()](#find)
  * [findAtIndex()](#findatindex)
  * [getPath()](#getpath)
  * [getProp()](#getprop)
  * [has()](#has)
  * [hasPath()](#haspath)
  * [hasProp()](#hasprop)
  * [head()](#head)
  * [init()](#init)
  * [is()](#is)
  * [isArguments()](#isarguments)
  * [isArray()](#isarray)
  * [isArrayLike()](#isarraylike)
  * [isBuffer()](#isbuffer)
  * [isEmpty()](#isempty)
  * [isFunction()](#isfunction)
  * [isGenerator()](#isgenerator)
  * [isGeneratorFunction()](#isgeneratorfunction)
  * [isIndex()](#isindex)
  * [isInteger()](#isinteger)
  * [isMap()](#ismap)
  * [isNil()](#isnil)
  * [isNull()](#isnull)
  * [isNumber()](#isnumber)
  * [isObject()](#isobject)
  * [isObjectLike()](#isobjectlike)
  * [isPlainObject()](#isplainobject)
  * [isPromise()](#ispromise)
  * [isPrototype()](#isprototype)
  * [isString()](#isstring)
  * [isSymbol()](#issymbol)
  * [isTransformer()](#istransformer)
  * [isTypedArray()](#istypedarray)
  * [isUndefined()](#isundefined)
  * [last()](#last)
  * [nth()](#nth)
  * [omit()](#omit)
  * [reduce()](#reduce)
  * [slice()](#slice)
  * [tail()](#tail)
  * [walk()](#walk)
  * [walkReduce()](#walkreduce)
  * [walkReduceDepthFirst()](#walkreducedepthfirst)
- [path methods](#path-methods)
  * [findPath()](#findpath)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (METHODS) -->
## common methods

### all()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/all.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Resolves all async values in an array or object</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The array or object whose values should be resolved. If value is not an object or array, the value is simply resolved to itself</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The array or object with its values resolved</p>

<b>Example</b><br />
```js
const nums = [
  1,
  Promise.resolve(2),
  (async () => 3)()
]
await all(nums) //=> [ 1, 2, 3 ]

const keyed = {
  a: 1,
  b: Promise.resolve(2),
  c: (async () => 3)()
}
await all(keyed) //=> { a: 1, b: 2, c: 3 }

await all('abc') //=> 'abc'
await all(123) //=> 123
```
<br /><br />

### apply()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/apply.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Applies function <code>fn</code> to the argument list <code>args</code>. This is useful for<br />
creating a fixed-arity function from a variadic function. <code>fn</code> should be a<br />
bound function if context is significant.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The function which will be called with <code>args</code></p>
<p>`args`: <code>Array</code> - The arguments to call <code>fn</code> with</p>

<b>Returns</b><br />
<p><code>&ast;</code>: result The result, equivalent to <code>fn(...args)</code></p>

<b>Example</b><br />
```js
const nums = [1, 2, 3, -99, 42, 6, 7]
apply(Math.max, nums) //=> 42
```
<br /><br />

### deferredPromise()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/deferredPromise.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Creates a promise with the resolve and reject methods exposed as properties<br />
on the promise.</p>

<b>Params</b><br />
None

<b>Returns</b><br />
<p><code>Promise</code>: The promise with exposed methods</p>

<b>Example</b><br />
```js
const promise = deferredPromise()
// ... do something async then eventually resolve the promise
promise.resolve(someValue)
```
<br /><br />

### defn()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/defn.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>Defines a function that will invoke the named function if it exists on the<br />
last arg. If the method does not, all args are passed through to the default<br />
function.</p>

<b>Params</b><br />
<p>`name`: <code>string</code> - The name of the method to call if it exists</p>
<p>`defaultFn`: <code>Function</code> - The default function to execute if the named one does not exist on the last arg</p>

<b>Returns</b><br />
<p><code>Function</code>: The wrapped function</p>

<b>Example</b><br />
```js
const get = defn('get', (prop, value) => value[prop])
get('a', { a: 'foo' }) //=> 'foo'

const obj = {
  props: {
    a: 'bar'
  }
  get: (prop) => obj.props[prop]
}
get('a', obj) //=> 'bar'
```
<br /><br />

### dispatchable()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/dispatchable.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a function that dispatches with different strategies based on the<br />
object in list position (last argument). If it is an array, executes [fn].<br />
Otherwise, if it has a function with one of the given method names, it will<br />
execute that function (functor case). Otherwise, if it is a transformer,<br />
uses transducer [xf] to return a new transformer (transducer case).<br />
Otherwise, it will default to executing [fn].</p>

<b>Params</b><br />
<p>`methodNames`: <code>Array</code> - properties to check for a custom implementation</p>
<p>`xf`: <code>Function</code> - transducer to initialize if object is transformer</p>
<p>`fn`: <code>Function</code> - default ramda implementation</p>

<b>Returns</b><br />
<p><code>Function</code>: A function that dispatches on object in list position</p>

<br /><br />

### nAry()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/nAry.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Wraps a function of any arity (including nullary) in a function that accepts exactly <code>n</code> parameters. Any extraneous parameters will not be passed to the supplied function.</p>

<b>Params</b><br />
<p>`n`: <code>Number</code> - The desired arity of the new function.</p>
<p>`fn`: <code>Function</code> - The function to wrap.</p>

<b>Returns</b><br />
<p><code>Function</code>: A new function wrapping <code>fn</code>. The new function is guaranteed to be of arity <code>n</code>.</p>

<b>Example</b><br />
```js
const takesTwoArgs = (a, b) => [a, b]

takesTwoArgs.length //=> 2
takesTwoArgs(1, 2) //=> [1, 2]

const takesOneArg = nAry(1, takesTwoArgs)
takesOneArg.length //=> 1
// Only `n` arguments are passed to the wrapped function
takesOneArg(1, 2) //=> [1, undefined]
```
<br /><br />

### nArySpread()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/nArySpread.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Wraps a function of any arity (including nullary) in a function that accepts exactly <code>n</code> parameters. Any extraneous parameters are spread and then reapplied on execution. This is useful when you want to ensure a function's paramter length is exactly <code>n</code> but still passes all arguments through.</p>

<b>Params</b><br />
<p>`n`: <code>Number</code> - The desired arity of the new function.</p>
<p>`fn`: <code>Function</code> - The function to wrap.</p>

<b>Returns</b><br />
<p><code>Function</code>: A new function wrapping <code>fn</code>. The new function is guaranteed to be of parameter length <code>n</code>.</p>

<b>Example</b><br />
```js
const takesNArgs = (...args) => [ ...args ]

takesNArgs.length //=> 0
takesNArgs(1, 2) //=> [1, 2]

const takesTwoArgs = nArySpread(2, takesNArgs)
takesTwoArgs.length //=> 2
// All arguments are passed to the wrapped function
takesTwoArgs(1, 2, 3) //=> [1, 2, 3]

const curriedTakesTwoArgs = curry(takesTwoArgs)
// auto currying works as expected
const takesAtLeastOneMoreArg = curriedTakesTwoArgs(3)
takesAtLeastOneMoreArg(1, 2) // => [3, 1, 2]
```
<br /><br />

### sleep()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/common/sleep.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Sleeps for the given amount of <code>wait</code> milliseconds before resolving the returned <code>Promise</code></p>

<b>Params</b><br />
<p>`wait`: <code>number</code> - The number of milliseconds to wait before resoliving the Promise</p>

<b>Returns</b><br />
<p><code>Promise</code>: Resolves once the given amount of time has ellapsed.</p>

<b>Example</b><br />
```js
await sleep(1000)
// 1000+ milliseconds later
```
<br /><br />

## data methods

### any()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/any.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns <code>true</code> if at least one of elements of the collection match the predicate, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>any</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The predicate function.</p>
<p>`collection`: <code>&ast;</code> - The collection to consider.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: <code>true</code> if the predicate is satisfied by at least one element, <code>false</code> otherwise.</p>

<b>Example</b><br />
```js
const lessThan0 = flip(lt)(0)
const lessThan2 = flip(lt)(2)
any(lessThan0)([1, 2]) //=> false
any(lessThan2)([1, 2]) //=> true
any(lessThan2)({ a: 1, b: 2 }) //=> true

await any(async (value) => lessThan2(value), [1, 2]) //=> true
```
<br /><br />

### anyAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/anyAtIndex.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns <code>true</code> if at least one of elements of the list match the predicate starting at the given index, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>anyAtIndex</code> method of the list argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The predicate function.</p>
<p>`index`: <code>Integer</code> - The index to start at.</p>
<p>`list`: <code>Array</code> - The array to consider.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: <code>true</code> if the predicate is satisfied by at least one element, <code>false</code>         otherwise.</p>

<b>Example</b><br />
```js
const lessThan0 = flip(lt)(0)
const lessThan2 = flip(lt)(2)
anyAtIndex(lessThan0, 0, [3, 2, 1]) //=> false
anyAtIndex(lessThan2, 1, [3, 2, 1]) //=> true

await anyAtIndex(async (value) => lessThan2(value), 0, [1, 2]) //=> true
```
<br /><br />

### arrayLikeKeys()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/arrayLikeKeys.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Creates an array of the enumerable property names of the array-like <code>value</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to query.</p>
<p>`inherited`: <code>boolean</code> - Specify returning inherited property names.</p>

<b>Returns</b><br />
<p><code>Array</code>: Returns the array of property names.</p>

<br /><br />

### assoc()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/assoc.js#L10)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the specified<br />
property with the given value. Note that this copies and flattens prototype<br />
properties onto the new object as well. All non-primitive properties are<br />
copied by reference.</p>
<p>Supports path based property selectors 'foo.bar' and functional selectors<br />
which performs an over on the entire collection and sets each matching<br />
selector to the given value.</p>

<b>Params</b><br />
<p>`selector`: <code>Array</code>|<code>String</code>|<code>Function</code> - The property path to set or functional selector</p>
<p>`value`: <code>&ast;</code> - The new value</p>
<p>`collection`: <code>&ast;</code> - The collection to clone and assign the new value</p>

<b>Returns</b><br />
<p><code>&ast;</code>: A new collection equivalent to the original except for the changed selector path.</p>

<b>Example</b><br />
```js
assoc('c', 3, {a: 1, b: 2});          //=> {a: 1, b: 2, c: 3}
assoc('c.d', 3, {a: 1, b: 2});        //=> {a: 1, b: 2, c: { d: 3 }}
assoc([ 'c', 'd' ], 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: { d: 3 }}
```
<br /><br />

### assocIndex()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/assocIndex.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

<b>Params</b><br />
<p>`index`: <code>number</code> - The index number to set</p>
<p>`val`: <code>&ast;</code> - The new value</p>
<p>`arr`: <code>Array</code> - The array to clone</p>

<b>Returns</b><br />
<p><code>Array</code>: A new array equivalent to the original except for the changed index.</p>

<b>Example</b><br />
```js
assocIndex(1, 'c', ['a', 'b']) //=> ['a', 'c']
```
<br /><br />

### assocPath()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/assocPath.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the nodes required<br />
to create the given path, and placing the specific value at the tail end of<br />
that path. Note that this copies and flattens prototype properties onto the<br />
new object as well. All non-primitive properties are copied by reference.</p>

<b>Params</b><br />
<p>`path`: <code>Array</code> - the path to set</p>
<p>`value`: <code>&ast;</code> - The new value</p>
<p>`collection`: <code>Object</code>|<code>Array</code>|<code>Map</code> - The object, array or map to clone</p>

<b>Returns</b><br />
<p><code>&ast;</code>: A new collection equivalent to the original except along the specified path.</p>

<b>Example</b><br />
```js
assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}

// Any missing or non-object keys in path will be overridden
assocPath(['a', 0, 'c'], 42, {a: 5}); //=> {a: [{c: 42}]}
```
<br /><br />

### assocProp()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/assocProp.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

<b>Params</b><br />
<p>`prop`: <code>String</code> - The property name to set</p>
<p>`val`: <code>&ast;</code> - The new value</p>
<p>`obj`: <code>Object</code>|<code>Map</code> - The object to clone</p>

<b>Returns</b><br />
<p><code>Object</code>: A new object equivalent to the original except for the changed property.</p>

<b>Example</b><br />
```js
assocProp('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
```
<br /><br />

### every()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/every.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns <code>true</code> if all elements of the list match the predicate, <code>false</code> if there are any that don't.</p>
<p>Dispatches to the <code>every</code> method of the second argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The predicate function.</p>
<p>`collection`: <code>&ast;</code> - The collection to consider.</p>

<b>Returns</b><br />
<p><code>boolean</code>: <code>true</code> if the predicate is satisfied by every value, <code>false</code> otherwise.</p>

<b>Example</b><br />
```js
const equals3 = equals(3)
every(equals3, [3, 3, 3, 3]) //=> true
every(equals3, [3, 3, 1, 3]) //=> false
every(equals3, { a: 3, b: 3, c: 3}) //=> true

await every(async (value) => equals3(value), [3, 3, 3]) //=> true
```
<br /><br />

### everyAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/everyAtIndex.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns <code>true</code> if all elements of the list match the predicate starting at the given index, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>everyAtIndex</code> method of the list argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The predicate function.</p>
<p>`index`: <code>Integer</code> - The index to start at.</p>
<p>`list`: <code>Array</code> - The array to consider.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: <code>true</code> if the predicate is satisfied by at least one element, <code>false</code> otherwise.</p>

<b>Example</b><br />
```js
const lessThan0 = flip(lt)(0)
const lessThan2 = flip(lt)(2)
any(lessThan0)([1, 2]) //=> false
any(lessThan2)([1, 2]) //=> true
```
<br /><br />

### find()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/find.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the first element of the collection which matches the predicate, or<br />
<code>undefined</code> if no element matches.</p>
<p>Dispatches to the <code>find</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The predicate function used to determine if the element is the        desired one.</p>
<p>`collection`: <code>&ast;</code> - The collection to consider.</p>

<b>Returns</b><br />
<p><code>Object</code>: The element found, or <code>undefined</code>.</p>

<b>Example</b><br />
```js
const xs = [{a: 1}, {a: 2}, {a: 3}];
find(propEq('a', 2))(xs); //=> {a: 2}
find(propEq('a', 4))(xs); //=> undefined
```
<br /><br />

### findAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/findAtIndex.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the first element of the list which matches the predicate, or<br />
<code>undefined</code> if no element matches starting at the given index.</p>
<p>Dispatches to the <code>findAtIndex</code> method of the last argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The predicate function used to determine if the element is the        desired one.</p>
<p>`index`: <code>Integer</code> - The index to start at.</p>
<p>`list`: <code>Array</code> - The array to consider.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The element found, or <code>undefined</code>.</p>

<b>Example</b><br />
```js
const xs = [{a: 1}, {a: 2}, {a: 3}];
findAtIndex(propEq('a'), 0)(xs) //=> {a: 2}
findAtIndex(propEq('a', 2), 2)(xs) //=> undefined
```
<br /><br />

### getPath()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/getPath.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Retrieve the value at a given path.</p>

<b>Params</b><br />
<p>`path`: <code>Array</code> - The path to use.</p>
<p>`obj`: <code>Object</code> - The object to retrieve the nested property from.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The data at <code>path</code>.</p>

<b>Example</b><br />
```js
getPath(['a', 'b'], {a: {b: 2}}); //=> 2
getPath(['a', 'b'], {c: {b: 2}}); //=> undefined
```
<br /><br />

### getProp()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/getProp.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns a function that when supplied an object returns the indicated<br />
property of that object, if it exists.</p>

<b>Params</b><br />
<p>`p`: <code>String</code> - The property name</p>
<p>`obj`: <code>Object</code> - The object to query</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The value at <code>obj.p</code>.</p>

<b>Example</b><br />
```js
getProp('x', {x: 100}); //=> 100
getProp('x', {});       //=> undefined
```
<br /><br />

### has()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/has.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

<b>Params</b><br />
<p>`selector`: <code>Array</code>|<code>String</code> - The selector to use.</p>
<p>`value`: <code>Object</code> - The value to check the path in.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: Whether the selector exists.</p>

<b>Example</b><br />
```js
has(['a', 'b'], {a: {b: 2}})          // => true
has(['a', 'b'], {a: {b: undefined}})  // => true
has('a.b', {a: {c: 2}})               // => false
has([], {})                           // => true
```
<br /><br />

### hasPath()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/hasPath.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

<b>Params</b><br />
<p>`path`: <code>Array</code> - The path to use.</p>
<p>`obj`: <code>Object</code> - The object to check the path in.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: Whether the path exists.</p>

<b>Example</b><br />
```js
hasPath(['a', 'b'], {a: {b: 2}})          // => true
hasPath(['a', 'b'], {a: {b: undefined}})  // => true
hasPath('a.b', {a: {c: 2}})               // => false
hasPath([], {})                           // => true
```
<br /><br />

### hasProp()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/hasProp.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns whether or not an object has an own property with the specified name</p>
<p>If prop is a function then it is executed against value as a selector.<br />
If prop is undefined then value will be checked for truthiness.</p>

<b>Params</b><br />
<p>`prop`: <code>String</code>|<code>Function</code> - The name of the property to check for.</p>
<p>`value`: <code>Object</code>|<code>Map</code> - The value to query.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: Whether the property exists.</p>

<b>Example</b><br />
```js
hasProp('name', {name: 'philipp'})  //=> true
hasProp('name', {})                 //=> false

hasProp(undefined, {})            //=> true
hasProp(undefined, null)          //=> false

hasProp((value) => value.name, { name: 'eslam'})     //=> true
hasProp((value) => value.birthday, { name: 'raees'}) //=> false
```
<br /><br />

### head()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/head.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns the first element of the given list or string.</p>

<b>Params</b><br />
<p>`list`: <code>Array</code>|<code>String</code> - 

<b>Returns</b><br />
<p><code>&ast;</code>: The first element in the given list</p>

<b>Example</b><br />
```js
head(['fi', 'fo', 'fum']) //=> 'fi'
head([]) //=> undefined

head('abc') //=> 'a'
head('') //=> ''
```
<br /><br />

### init()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/init.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns all but the last element of the given list or string.</p>

<b>Params</b><br />
<p>`list`: <code>&ast;</code> - The list to select from</p>

<b>Returns</b><br />
<p><code>&ast;</code>: A new array or string of all but the last element in the list</p>

<b>Example</b><br />
```js
init([1, 2, 3])  //=> [1, 2]
init([1, 2])     //=> [1]
init([1])        //=> []
init([]);         //=> []

init('abc')  //=> 'ab'
init('ab')   //=> 'a'
init('a')    //=> ''
init('')     //=> ''
```
<br /><br />

### is()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/is.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>See if an object (<code>val</code>) is an instance of the supplied constructor. This function will check up the inheritance chain, if any.</p>

<b>Params</b><br />
<p>`constructor`: <code>Object</code> - A constructor</p>
<p>`value`: <code>&ast;</code> - The value to test</p>

<b>Returns</b><br />
<p><code>boolean</code>: 

<b>Example</b><br />
```js
is(Object, {}); //=> true
is(Number, 1); //=> true
is(Object, 1); //=> false
is(String, 's'); //=> true
is(String, new String('')); //=> true
is(Object, new String('')); //=> true
is(Object, 's'); //=> false
is(Number, {}); //=> false
```
<br /><br />

### isArguments()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isArguments.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is likely an <code>arguments</code> object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is an <code>arguments</code> object, else <code>false</code>.</p>

<b>Example</b><br />
```js
isArguments(function() { return arguments }()) // => true

isArguments([1, 2, 3]) // => false
```
<br /><br />

### isArray()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isArray.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is classified as an <code>Array</code> object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is an array, else <code>false</code>.</p>

<b>Example</b><br />
```js
isArray([1, 2, 3]) // => true

isArray(document.body.children) // => false

isArray('abc') // => false

isArray(noop) // => false
```
<br /><br />

### isArrayLike()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isArrayLike.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is array-like. A value is considered array-like if it's<br />
not a function and has a <code>value.length</code> that's an integer greater than or<br />
equal to <code>0</code> and less than or equal to <code>Number.MAX_SAFE_INTEGER</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is array-like, else <code>false</code>.</p>

<b>Example</b><br />
```js
isArrayLike([1, 2, 3]) // => true

isArrayLike(document.body.children) // => true

isArrayLike('abc') // => true

isArrayLike(Function) // => false
```
<br /><br />

### isBuffer()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isBuffer.js#L19)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is a buffer.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a buffer, else <code>false</code>.</p>

<b>Example</b><br />
```js
isBuffer(new Buffer(2)) // => true

isBuffer(new Uint8Array(2)) // => false
```
<br /><br />

### isEmpty()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isEmpty.js#L11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is an empty object, collection, map, or set.</p>
<p>Objects are considered empty if they have no own enumerable string keyed<br />
properties.</p>
<p>Array-like values such as <code>arguments</code> objects, arrays, buffers, strings, or<br />
jQuery-like collections are considered empty if they have a <code>length</code> of <code>0</code>.<br />
Similarly, maps and sets are considered empty if they have a <code>size</code> of <code>0</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is empty, else <code>false</code>.</p>

<b>Example</b><br />
```js
isEmpty(null) // => true

isEmpty(true) // => true

isEmpty(1) // => true

isEmpty([1, 2, 3]) // => false

isEmpty('abc') // => false

isEmpty({ 'a': 1 })  // => false
```
<br /><br />

### isFunction()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isFunction.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Function</code> object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a function, else <code>false</code>.</p>

<b>Example</b><br />
```js
isFunction(function() {}) // => true

isFunction(/abc/) // => false
```
<br /><br />

### isGenerator()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isGenerator.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks whether the given value is a generator.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - 

<b>Returns</b><br />
<p><code>Boolean</code>: 

<b>Example</b><br />
```js
isGenerator((function*() {})())  //=> true

isGenerator((function() {})())   //=> false

isGenerator({
  next: () => {},
  throw: () => {}
})  //=> true
```
<br /><br />

### isGeneratorFunction()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isGeneratorFunction.js#L18)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks whether a function is generator function.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - 

<b>Returns</b><br />
<p><code>Boolean</code>: 

<b>Example</b><br />
```js
isGeneratorFunction(function*() {})  //=> true
isGeneratorFunction(function() {})   //=> false
```
<br /><br />

### isIndex()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isIndex.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is a valid array-like index.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>
<p>`[length=MAX_SAFE_INTEGER]`: <code>number</code> - The upper bounds of a valid index.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a valid index, else <code>false</code>.</p>

<br /><br />

### isInteger()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isInteger.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Determine if the passed argument is an integer.</p>

<b>Params</b><br />
<p>`n`: <code>&ast;</code> - 

<b>Returns</b><br />
<p><code>Boolean</code>: 

<br /><br />

### isMap()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isMap.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Map</code> object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a map, else <code>false</code>.</p>

<b>Example</b><br />
```js
isMap(new Map) // => true

isMap(new WeakMap) // => false
```
<br /><br />

### isNil()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isNil.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is <code>null</code> or <code>undefined</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is nullish, else <code>false</code>.</p>

<b>Example</b><br />
```js
isNil(null) // => true

isNil(void 0) // => true

isNil(NaN) // => false
```
<br /><br />

### isNull()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isNull.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is <code>null</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is <code>null</code>, else <code>false</code>.</p>

<b>Example</b><br />
```js
isNull(null) // => true

isNull(void 0) // => false
```
<br /><br />

### isNumber()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isNumber.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Number</code> primitive or object.</p>
<p><strong>Note:</strong> To exclude <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code>, which are<br />
classified as numbers, use the <code>Number.isFinite</code> method.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a number, else <code>false</code>.</p>

<b>Example</b><br />
```js
isNumber(3) // => true

isNumber(Number.MIN_VALUE) // => true

isNumber(Infinity) // => true

isNumber('3') // => false
```
<br /><br />

### isObject()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isObject.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is the<br />
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types">language type</a><br />
of <code>Object</code>. (e.g. arrays, functions, objects, regexes, <code>new Number(0)</code>, and <code>new String('')</code>)</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is an object, else <code>false</code>.</p>

<b>Example</b><br />
```js
isObject({}) // => true

isObject([1, 2, 3]) // => true

isObject(Function) // => true

isObject(null) // => false
```
<br /><br />

### isObjectLike()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isObjectLike.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is object-like. A value is object-like if it's not <code>null</code><br />
and has a <code>typeof</code> result of &quot;object&quot;.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is object-like, else <code>false</code>.</p>

<b>Example</b><br />
```js
isObjectLike({}) // => true

isObjectLike([1, 2, 3]) // => true

isObjectLike(Function) // => false

isObjectLike(null) // => false
```
<br /><br />

### isPlainObject()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isPlainObject.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is a plain object, that is, an object created by the<br />
<code>Object</code> constructor or one with a <code>[[Prototype]]</code> of <code>null</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a plain object, else <code>false</code>.</p>

<b>Example</b><br />
```js
function Foo() {
  this.a = 1
}

isPlainObject(new Foo) // => false

isPlainObject([1, 2, 3]) // => false

isPlainObject({ 'x': 0, 'y': 0 }) // => true

isPlainObject(Object.create(null)) // => true
```
<br /><br />

### isPromise()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isPromise.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks whether the given value is a Promise.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a Promise, else <code>false</code>.</p>

<b>Example</b><br />
```js
isPromise(new Promise(() => {})) //=> true

isPromise({}) //=> false

isPromise({ then: () => {} }) //=> true
```
<br /><br />

### isPrototype()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isPrototype.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is likely a prototype object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a prototype, else <code>false</code>.</p>

<br /><br />

### isString()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isString.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>String</code> primitive or object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a string, else <code>false</code>.</p>

<b>Example</b><br />
```js
isString('abc') // => true

isString(1) // => false
```
<br /><br />

### isSymbol()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isSymbol.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Symbol</code> primitive or object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a symbol, else <code>false</code>.</p>

<b>Example</b><br />
```js
isSymbol(Symbol.iterator) // => true

isSymbol('abc') // => false
```
<br /><br />

### isTransformer()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isTransformer.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Symbol</code> primitive or object.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a transformer, else <code>false</code>.</p>

<b>Example</b><br />
```js
isTransformer({
  ['@@transducer/step']: () => {}
}) // => true

isTransformer('abc') // => false
```
<br /><br />

### isTypedArray()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isTypedArray.js#L11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is classified as a typed array.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a typed array, else <code>false</code>.</p>

<b>Example</b><br />
```js
isTypedArray(new Uint8Array) // => true

isTypedArray([]) // => false
```
<br /><br />

### isUndefined()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/isUndefined.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.3.0
<p>Checks if <code>value</code> is <code>undefined</code>.</p>

<b>Params</b><br />
<p>`value`: <code>&ast;</code> - The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is <code>undefined</code>, else <code>false</code>.</p>

<b>Example</b><br />
```js
isUndefined(void 0) // => true

isUndefined(null) // => false
```
<br /><br />

### last()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/last.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the last element of the given list or string.</p>

<b>Params</b><br />
<p>`list`: <code>&ast;</code> - The list to get the last element from</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The last element of the given list or string</p>

<b>Example</b><br />
```js
last(['fi', 'fo', 'fum']) //=> 'fum'
last([]) //=> undefined

last('abc') //=> 'c'
last(''); //=> ''
```
<br /><br />

### nth()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/nth.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns the nth element of the given list or string. If n is negative the<br />
element at index length + n is returned.</p>

<b>Params</b><br />
<p>`offset`: <code>number</code> - The offset from the 0 index to select from. If negative it will be subtracted from length</p>
<p>`collection`: <code>&ast;</code> - The collection to select from</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The value at the nth index</p>

<b>Example</b><br />
```js
const list = ['foo', 'bar', 'baz', 'quux']
nth(1, list) //=> 'bar'
nth(-1, list) //=> 'quux'
nth(-99, list) //=> undefined

nth(2, 'abc') //=> 'c'
nth(3, 'abc') //=> ''
```
<br /><br />

### omit()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/omit.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a partial copy of an object omitting the keys specified.</p>

<b>Params</b><br />
<p>`names`: <code>Array</code> - an array of String property names to omit from the new object</p>
<p>`obj`: <code>Object</code> - The object to copy from</p>

<b>Returns</b><br />
<p><code>Object</code>: A new object with properties from <code>names</code> not on it.</p>

<b>Example</b><br />
```js
omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) //=> {b: 2, c: 3}
```
<br /><br />

### reduce()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/reduce.js#L45)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0
<p>Returns a single item by iterating through the list, successively calling<br />
the iterator function and passing it an accumulator value and the current<br />
value from the array, and then passing the result to the next call.</p>
<p>The iterator function receives two values: <em>(acc, value)</em>. It may use<br />
<a href="#reduced"><code>reduced</code></a> to shortcut the iteration.</p>
<p>The arguments' order of <a href="#reduceRight"><code>reduceRight</code></a>'s iterator function<br />
is <em>(value, acc)</em>.</p>
<p>Note: <code>reduce</code> does not skip deleted or unassigned indices (sparse<br />
arrays), unlike the native <code>Array.prototype.reduce</code> method. For more details<br />
on this behavior, see:<br />
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description</p>
<p>Dispatches to the <code>reduce</code> method of the third argument, if present. When<br />
doing so, it is up to the user to handle the <a href="#reduced"><code>reduced</code></a><br />
shortcuting, as this is not implemented by <code>reduce</code>.</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The iterator function. Receives two values, the accumulator and the current element from the array.</p>
<p>`acc`: <code>&ast;</code> - The accumulator value.</p>
<p>`list`: <code>Array</code> - The list to iterate over.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The final, accumulated value.</p>

<b>Example</b><br />
```js
reduce(subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
//          -               -10
//         / \              / \
//        -   4           -6   4
//       / \              / \
//      -   3   ==>     -3   3
//     / \              / \
//    -   2           -1   2
//   / \              / \
//  0   1            0   1
```
<br /><br />

### slice()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/slice.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Creates a slice of <code>array</code> from <code>start</code> up to, but not including, <code>end</code>.</p>
<p><strong>Note:</strong> This method is used instead of<br />
<a href="https://mdn.io/Array/slice"><code>Array#slice</code></a> to ensure dense arrays are<br />
returned.</p>

<b>Params</b><br />
<p>`[start=0]`: <code>number</code> - The start position. A negative index will be treated as an offset from the end.</p>
<p>`[end=array.length]`: <code>number</code> - The end position. A negative index will be treated as an offset from the end.</p>
<p>`array`: <code>Array</code> - The array to slice.</p>

<b>Returns</b><br />
<p><code>Array</code>: Returns the slice of <code>array</code>.</p>

<b>Example</b><br />
```js
const array = [1, 2, 3, 4]

slice(2, Infinity, array)
// => [3, 4]
```
<br /><br />

### tail()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/tail.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns all but the first element of the given list or string (or object<br />
with a <code>tail</code> method).</p>
<p>Dispatches to the <code>slice</code> method of the first argument, if present.</p>

<b>Params</b><br />
<p>`collection`: <code>&ast;</code> - The collection to get the tail of</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The tail of the given collection</p>

<b>Example</b><br />
```js
tail([1, 2, 3]);  //=> [2, 3]
tail([1, 2]);     //=> [2]
tail([1]);        //=> []
tail([]);         //=> []

tail('abc');  //=> 'bc'
tail('ab');   //=> 'b'
tail('a');    //=> ''
tail('');     //=> ''
```
<br /><br />

### walk()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/walk.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Walk using the given walkee and iteratee functions.</p>

<b>Params</b><br />
<p>`walkee`: <code>Function</code> - The function responsible for returning the next value in the walk</p>
<p>`iteratee`: <code>Function</code> - The iterator function.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The final value returned by the walk</p>

<b>Example</b><br />
```js
const depthFirstWalkee = (value, iteratee, recur) => {
  if (isObject(value)) {
    forEachObjIndexed((child) => {
      recur(child, iteratee)
    }, value)
  }
  iteratee(value, data)
}
let result = []
walk(
  depthFirstWalkee,
  (value) => result.push(value),
  {
    a: {
      b: 'b'
    }
  }
)
console.log(result)
//=> [
  'b',
  { b: 'b' },
  { a: { b: 'b' } }
]
```
<br /><br />

### walkReduce()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/walkReduce.js#L24)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Walk reduce using the given reducer function</p>

<b>Params</b><br />
<p>`fn`: <code>Function</code> - The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.</p>
<p>`accum`: <code>&ast;</code> - The accumulator value.</p>
<p>`collection`: <code>&ast;</code> - The collection to walk.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The final, accumulated value.</p>

<b>Example</b><br />
```js
walkReduce(
  (accum, value, keys) => {
    if (!isObject(value)) {
      return accum + toString(value)
    }
    return accum
  },
  '',
  {
    a: {
      b: 'b',
      c: {
        d: 'd'
      }
    },
    e: [ 'e', 'f' ]
  }
)
//=> 'bdef'
```
<br /><br />

### walkReduceDepthFirst()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/data/walkReduceDepthFirst.js#L24)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Walk depth first and reduce using the given reducer function</p>

<b>Params</b><br />
<p>`iteratee`: <code>Function</code> - The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.</p>
<p>`accum`: <code>&ast;</code> - The accumulator value.</p>
<p>`collection`: <code>&ast;</code> - The collection to walk.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The final, accumulated value.</p>

<b>Example</b><br />
```js
walkReduceDepthFirst(
  (accum, value, keys) => {
    accum.push(keys)
    return accum
  },
  [],
  {
    a: {
      b: {
        c: 'c'
      },
      d: 'd',
    },
    e: [ 'e', 'f' ]
  }
)
//=> [
  [ 'a', 'b', 'c' ],
  [ 'a', 'b' ],
  [ 'a', 'd' ],
  [ 'a' ],
  [ 'e', 0 ],
  [ 'e', 1 ],
  [ 'e' ],
  []
]
```
<br /><br />

## path methods

### findPath()

[source](https://github.com/serverless/utils/tree/v0.0.5/src/path/findPath.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Finds the first path in the given args.</p>

<b>Params</b><br />
<p>`values`: ...<code>String</code> - The values to check.</p>

<b>Returns</b><br />
<p><code>String</code>: The first value found that is a path.</p>

<b>Example</b><br />
```js
findPath(null, 0, '/foo', '/bar') // => '/foo'
```
<br /><br />


<!-- AUTO-GENERATED-CONTENT:END -->
