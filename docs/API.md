# API

*NOTES*
* These API docs are still being written. However, we have attempted to stick to the Ramda signature as much as possible for our data methods. So, in most cases, the [ramda documentation](https://ramdajs.com/docs/) is a good point of reference.
* A number of our data methods have async support built in. They will automatically upgrade to async methods when an async iteratee is used.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [base](#base)
  * [arrayConcat()](#arrayconcat)
  * [arrayFlatten()](#arrayflatten)
  * [arrayLikeIterator()](#arraylikeiterator)
  * [arrayLikeKeys()](#arraylikekeys)
  * [arrayLikeSlice()](#arraylikeslice)
  * [indexEndOffset()](#indexendoffset)
  * [isArguments()](#isarguments)
  * [isArray()](#isarray)
  * [isArrayBuffer()](#isarraybuffer)
  * [isArrayLike()](#isarraylike)
  * [isBoolean()](#isboolean)
  * [isBuffer()](#isbuffer)
  * [isDate()](#isdate)
  * [isElement()](#iselement)
  * [isError()](#iserror)
  * [isFunction()](#isfunction)
  * [isGenerator()](#isgenerator)
  * [isGeneratorFunction()](#isgeneratorfunction)
  * [isIndex()](#isindex)
  * [isInfinity()](#isinfinity)
  * [isInteger()](#isinteger)
  * [isIterable()](#isiterable)
  * [isMap()](#ismap)
  * [isNaN()](#isnan)
  * [isNativeObject()](#isnativeobject)
  * [isNil()](#isnil)
  * [isNull()](#isnull)
  * [isNumber()](#isnumber)
  * [isObject()](#isobject)
  * [isObjectLike()](#isobjectlike)
  * [isPlainObject()](#isplainobject)
  * [isPromise()](#ispromise)
  * [isPrototype()](#isprototype)
  * [isRegExp()](#isregexp)
  * [isSet()](#isset)
  * [isString()](#isstring)
  * [isSymbol()](#issymbol)
  * [isTransformer()](#istransformer)
  * [isTypedArray()](#istypedarray)
  * [isUndefined()](#isundefined)
  * [isWeakMap()](#isweakmap)
  * [isWeakSet()](#isweakset)
  * [objectIterator()](#objectiterator)
  * [objectKeys()](#objectkeys)
  * [toFinite()](#tofinite)
  * [toInteger()](#tointeger)
  * [toNumber()](#tonumber)
  * [toObject()](#toobject)
  * [toString()](#tostring)
- [common](#common)
  * [all()](#all)
  * [allWith()](#allwith)
  * [apply()](#apply)
  * [complement()](#complement)
  * [compose()](#compose)
  * [deferredPromise()](#deferredpromise)
  * [defn()](#defn)
  * [dispatchable()](#dispatchable)
  * [identity()](#identity)
  * [isOp()](#isop)
  * [isResolved()](#isresolved)
  * [iterate()](#iterate)
  * [iterateRight()](#iterateright)
  * [iterator()](#iterator)
  * [nAry()](#nary)
  * [nArySpread()](#naryspread)
  * [nth()](#nth)
  * [pipe()](#pipe)
  * [resolve()](#resolve)
  * [resolveToGeneratorWith()](#resolvetogeneratorwith)
  * [resolveWith()](#resolvewith)
  * [sleep()](#sleep)
- [constants](#constants)
  * [MAX_SAFE_INTEGER](#max_safe_integer)
  * [SYMBOL_ITERATOR](#symbol_iterator)
- [data](#data)
  * [any()](#any)
  * [anyAtIndex()](#anyatindex)
  * [append()](#append)
  * [assign()](#assign)
  * [assoc()](#assoc)
  * [assocIndex()](#associndex)
  * [assocPath()](#assocpath)
  * [assocProp()](#assocprop)
  * [compact()](#compact)
  * [concat()](#concat)
  * [every()](#every)
  * [everyAtIndex()](#everyatindex)
  * [filter()](#filter)
  * [filterAtIndex()](#filteratindex)
  * [find()](#find)
  * [findAtIndex()](#findatindex)
  * [findKdx()](#findkdx)
  * [flatten()](#flatten)
  * [forEach()](#foreach)
  * [forEachIndexed()](#foreachindexed)
  * [forEachObjIndexed()](#foreachobjindexed)
  * [get()](#get)
  * [getParent()](#getparent)
  * [getParentPath()](#getparentpath)
  * [getPath()](#getpath)
  * [getProp()](#getprop)
  * [has()](#has)
  * [hasPath()](#haspath)
  * [hasProp()](#hasprop)
  * [head()](#head)
  * [init()](#init)
  * [is()](#is)
  * [join()](#join)
  * [keys()](#keys)
  * [last()](#last)
  * [length()](#length)
  * [map()](#map)
  * [mapIndexed()](#mapindexed)
  * [mapObjIndexed()](#mapobjindexed)
  * [omit()](#omit)
  * [pick()](#pick)
  * [prepend()](#prepend)
  * [reduce()](#reduce)
  * [reduceIndexed()](#reduceindexed)
  * [reduceObjIndexed()](#reduceobjindexed)
  * [reduceRight()](#reduceright)
  * [reject()](#reject)
  * [set()](#set)
  * [shallowEquals()](#shallowequals)
  * [slice()](#slice)
  * [tail()](#tail)
  * [union()](#union)
  * [values()](#values)
  * [walk()](#walk)
  * [walkReduce()](#walkreduce)
  * [walkReduceDepthFirst()](#walkreducedepthfirst)
  * [walkReducePath()](#walkreducepath)
- [fetch](#fetch)
  * [fetch()](#fetch)
- [ip](#ip)
  * [isIp()](#isip)
  * [lookupIp()](#lookupip)
- [lang](#lang)
  * [getProperty()](#getproperty)
  * [mix()](#mix)
- [logic](#logic)
  * [and()](#and)
  * [isEmpty()](#isempty)
  * [not()](#not)
  * [or()](#or)
- [path](#path)
  * [findPath()](#findpath)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (METHODS) -->
## base

### arrayConcat()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/arrayConcat.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Concat an array with two or more arrays. This method does not change the existing arrays, but instead returns a new array.</p>

**Params**
<p><code>array</code>: <code>Array</code> - The array concat with the given values</p>
<p><code>values</code>: <code>...&ast;</code> - The values to concat to the array</p>

**Returns**
<br /><p><code>Array</code> - A new array with the values concatenated</p>

**Example**
```js
arrayConcat(['a', 'b', 'c'], [1, 2, 3])
//=> ['a', 'b', 'c', 1, 2, 3]

arrayConcat([1, 2, 3], [4, 5, 6], [7, 8, 9])
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9]

arrayConcat(['a', 'b', 'c'], 1, [2, 3])
//=> ['a', 'b', 'c', 1, 2, 3]
```
<br /><br />

### arrayFlatten()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/arrayFlatten.js#L25)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Returns a new array by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.</p>

**Params**
<p><code>array</code>: <code>Array</code> - The array to consider.</p>

**Returns**
<br /><p><code>Array</code> - The flattened list.</p>

**Example**
```js
arrayFlatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```
<br /><br />

### arrayLikeIterator()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/arrayLikeIterator.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.11
<p>Returns iterator for an array like value.</p>

**Params**
<p><code>arrayLike</code>: <code>&ast;</code> - The array like value to create an iterator for.</p>
<p><code>index</code>: <code>&ast;</code> - The index to start at.</p>

**Returns**
<br /><p><code>Iterator</code> - A new iterator for the given array like value</p>

**Example**
```js
arrayLikeIterator(['write', 'more'])
//=> {
//   next: () => ({
//     value: *,
//     done: boolean,
//     kdx: integer,
//     index: integer
//   }),
//   previous: () => ({
//     value: *,
//     done: boolean,
//     kdx: integer,
//     index: integer
//   })
// }
arrayLikeIterator('tests')
//=> {
//   next: () => ({
//     value: *,
//     done: boolean,
//     kdx: integer,
//     index: integer
//   })
//   previous: () => ({
//     value: *,
//     done: boolean,
//     kdx: integer,
//     index: integer
//   })
// }
```
<br /><br />

### arrayLikeKeys()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/arrayLikeKeys.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Creates an array of the enumerable property names of the array-like <code>value</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to query.</p>
<p><code>inherited</code>: <code>boolean</code> - Specify returning inherited property names.</p>

**Returns**
<br /><p><code>Array</code> - Returns the array of property names.</p>

<br /><br />

### arrayLikeSlice()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/arrayLikeSlice.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.</p>

**Params**
<p><code>arrayLike</code>: <code>Array</code> - The array like value to slice values from</p>
<p><code>start</code>: <code>number</code> - [=0] Zero-based index at which to begin extraction. A negative index will be treated as an offset from the end.</p>
<p><code>end</code>: <code>number</code> - [=array.length] Zero-based index before which to end extraction. `arrayLikeSlice` extracts up to but not including end.</p>

**Returns**
<br /><p><code>Array</code> - A new array with the extraced values</p>

**Example**
```js
arrayLikeSlice(['a', 'b', 'c'], 0, 2)
//=> ['a', 'b']
```
<br /><br />

### indexEndOffset()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/indexEndOffset.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Generate a start index with an offset where if the start is less than 0 it will return an offset from the length of <code>length + start</code></p>

**Params**
<p><code>start</code>: <code>number</code> - The start index</p>
<p><code>length</code>: <code>number</code> - The length of the list</p>

**Returns**
<br /><p><code>number</code> - A starting index</p>

**Example**
```js
indexEndOffset(0, 2)
// => 0

indexEndOffset(3, 2)
// => 2

indexEndOffset(-1, 3)
// => 2
```
<br /><br />

### isArguments()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isArguments.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is likely an <code>arguments</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is an `arguments` object, else `false`.</p>

**Example**
```js
isArguments(function() { return arguments }()) // => true

isArguments([1, 2, 3]) // => false
```
<br /><br />

### isArray()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isArray.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Checks if <code>value</code> is classified as an <code>Array</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is an array, else `false`.</p>

**Example**
```js
isArray([1, 2, 3]) // => true

isArray(document.body.children) // => false

isArray('abc') // => false

isArray(noop) // => false
```
<br /><br />

### isArrayBuffer()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isArrayBuffer.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as an <code>ArrayBuffer</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is an array buffer, else `false`.</p>

**Example**
```js
isArrayBuffer(new ArrayBuffer(2))
// => true

isArrayBuffer(new Array(2))
// => false
```
<br /><br />

### isArrayLike()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isArrayLike.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is array-like. A value is considered array-like if it's<br />
not a function and has a <code>value.length</code> that's an integer greater than or<br />
equal to <code>0</code> and less than or equal to <code>Number.MAX_SAFE_INTEGER</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is array-like, else `false`.</p>

**Example**
```js
isArrayLike([1, 2, 3]) // => true

isArrayLike(document.body.children) // => true

isArrayLike('abc') // => true

isArrayLike(Function) // => false
```
<br /><br />

### isBoolean()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isBoolean.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as a boolean primitive or object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a boolean, else `false`.</p>

**Example**
```js
isBoolean(false)
// => true

isBoolean(null)
// => false
```
<br /><br />

### isBuffer()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isBuffer.js#L19)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is a buffer.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a buffer, else `false`.</p>

**Example**
```js
isBuffer(new Buffer(2)) // => true

isBuffer(new Uint8Array(2)) // => false
```
<br /><br />

### isDate()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isDate.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as a <code>Date</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a date object, else `false`.</p>

**Example**
```js
isDate(new Date)
// => true

isDate('Mon April 23 2012')
// => false
```
<br /><br />

### isElement()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isElement.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is likely a DOM element.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a DOM element, else `false`.</p>

**Example**
```js
isElement(document.body)
// => true

isElement('<body>')
// => false
```
<br /><br />

### isError()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isError.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is an <code>Error</code>, <code>EvalError</code>, <code>RangeError</code>, <code>ReferenceError</code>, <code>SyntaxError</code>, <code>TypeError</code>, or <code>URIError</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is an error object, else `false`.</p>

**Example**
```js
isError(new Error)
// => true

isError(Error)
// => false
```
<br /><br />

### isFunction()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isFunction.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Function</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a function, else `false`.</p>

**Example**
```js
isFunction(function() {}) // => true

isFunction(/abc/) // => false
```
<br /><br />

### isGenerator()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isGenerator.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks whether the given value is a generator.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a generator, else `false`.</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isGeneratorFunction.js#L18)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks whether a function is generator function.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a generator function, else `false`.</p>

**Example**
```js
isGeneratorFunction(function*() {})  //=> true
isGeneratorFunction(function() {})   //=> false
```
<br /><br />

### isIndex()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isIndex.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is a valid array-like index.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>
<p><code>length</code>: <code>number</code> - [=MAX_SAFE_INTEGER] The upper bounds of a valid index.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a valid index, else `false`.</p>

**Example**
```js
isIndex(0)
//=> true

isIndex(1)
//=> true

isIndex(-1)
//=> false
```
<br /><br />

### isInfinity()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isInfinity.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Checks if <code>value</code> is <code>Infinity</code> or <code>-Infinity</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is `Infinity` or `-Infinity`, else `false`.</p>

**Example**
```js
isInfinity(Infinity)
// => true

isInfinity(-Infinity)
// => true

isInfinity(new Number(Infinity))
// => true

isInfinity(undefined)
// => false

isInfinity(123)
// => false
```
<br /><br />

### isInteger()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isInteger.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Determine if the passed argument is an integer.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>Boolean</code> - Returns `true` if `value` is an integer, else `false`.</p>

**Example**
```js
isInteger(3) // => true

isInteger(new Number(3)) // => true

isInteger(3.2) // => false

isInteger(Number.MIN_VALUE) // => false

isInteger(Infinity) // => false

isInteger(NaN) // => false

isInteger('3') // => false
```
<br /><br />

### isIterable()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isIterable.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> implements the iterator symbol or is iterable</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is iterable, else `false`.</p>

**Example**
```js
isIterable('abc')
//=> true

isIterable(new Map())
//=> true

isIterable({})
//=> false

isIterable([])
//=> true
```
<br /><br />

### isMap()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isMap.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Map</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a map, else `false`.</p>

**Example**
```js
isMap(new Map) // => true

isMap(new WeakMap) // => false
```
<br /><br />

### isNaN()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isNaN.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Checks if <code>value</code> is <code>NaN</code>.</p>
<p><strong>Note:</strong> This method is based on <a href="https://mdn.io/Number/isNaN"><code>Number.isNaN</code></a> and is not the same as global <a href="https://mdn.io/isNaN"><code>isNaN</code></a> which returns <code>true</code> for <code>undefined</code> and other non-number values.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is `NaN`, else `false`.</p>

**Example**
```js
isNaN(NaN)
// => true

isNaN(new Number(NaN))
// => true

isNaN(undefined)
// => false
```
<br /><br />

### isNativeObject()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isNativeObject.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is native JavaScript object instance.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a native JS object instance</p>

**Example**
```js
isNativeObject(new WeakSet())
// => true

isNativeObject({})
// => false

class MyObject {}
isNativeObject(new MyObject())
// => false
```
<br /><br />

### isNil()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isNil.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is <code>null</code> or <code>undefined</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is nullish, else `false`.</p>

**Example**
```js
isNil(null) // => true

isNil(void 0) // => true

isNil(NaN) // => false
```
<br /><br />

### isNull()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isNull.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is <code>null</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is `null`, else `false`.</p>

**Example**
```js
isNull(null) // => true

isNull(void 0) // => false
```
<br /><br />

### isNumber()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isNumber.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Number</code> primitive or object.</p>
<p><strong>Note:</strong> To exclude <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code>, which are<br />
classified as numbers, use the <code>Number.isFinite</code> method.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a number, else `false`.</p>

**Example**
```js
isNumber(3) // => true

isNumber(Number.MIN_VALUE) // => true

isNumber(Infinity) // => true

isNumber('3') // => false
```
<br /><br />

### isObject()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isObject.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Checks if <code>value</code> is the<br />
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types">language type</a><br />
of <code>Object</code>. (e.g. arrays, functions, objects, regexes, <code>new Number(0)</code>, and <code>new String('')</code>)</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is an object, else `false`.</p>

**Example**
```js
isObject({}) // => true

isObject([1, 2, 3]) // => true

isObject(Function) // => true

isObject(null) // => false
```
<br /><br />

### isObjectLike()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isObjectLike.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is object-like. A value is object-like if it's not <code>null</code> and has a <code>typeof</code> result of &quot;object&quot;.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is object-like, else `false`.</p>

**Example**
```js
isObjectLike({}) // => true

isObjectLike([1, 2, 3]) // => true

isObjectLike(Function) // => false

isObjectLike(null) // => false
```
<br /><br />

### isPlainObject()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isPlainObject.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is a plain object, that is, an object created by the<br />
<code>Object</code> constructor or one with a <code>[[Prototype]]</code> of <code>null</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a plain object, else `false`.</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isPromise.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks whether the given value is a Promise.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a Promise, else `false`.</p>

**Example**
```js
isPromise(new Promise(() => {})) //=> true

isPromise({}) //=> false

isPromise({ then: () => {} }) //=> true
```
<br /><br />

### isPrototype()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isPrototype.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is likely a prototype object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a prototype, else `false`.</p>

<br /><br />

### isRegExp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isRegExp.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as a <code>RegExp</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a regexp, else `false`.</p>

**Example**
```js
isRegExp(/abc/)
// => true

isRegExp('/abc/')
// => false
```
<br /><br />

### isSet()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isSet.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as a <code>Set</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a set, else `false`.</p>

**Example**
```js
isSet(new Set())
// => true

isSet(new WeakSet())
// => false
```
<br /><br />

### isString()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isString.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Checks if <code>value</code> is classified as a <code>String</code> primitive or object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a string, else `false`.</p>

**Example**
```js
isString('abc') // => true

isString(1) // => false
```
<br /><br />

### isSymbol()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isSymbol.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Checks if <code>value</code> is classified as a <code>Symbol</code> primitive or object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a symbol, else `false`.</p>

**Example**
```js
isSymbol(Symbol.iterator)
// => true
isSymbol(Symbol('abc'))
// => true
isSymbol(Symbol.for('abc'))
// => true

isSymbol('abc')
// => false
```
<br /><br />

### isTransformer()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isTransformer.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Symbol</code> primitive or object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a transformer, else `false`.</p>

**Example**
```js
isTransformer({
  ['@@transducer/step']: () => {}
}) // => true

isTransformer('abc') // => false
```
<br /><br />

### isTypedArray()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isTypedArray.js#L11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is classified as a typed array.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a typed array, else `false`.</p>

**Example**
```js
isTypedArray(new Uint8Array()) // => true

isTypedArray([]) // => false
```
<br /><br />

### isUndefined()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isUndefined.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Checks if <code>value</code> is <code>undefined</code>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is `undefined`, else `false`.</p>

**Example**
```js
isUndefined(void 0) // => true

isUndefined(null) // => false
```
<br /><br />

### isWeakMap()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isWeakMap.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as a <code>WeakMap</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a weak map, else `false`.</p>

**Example**
```js
isWeakMap(new WeakMap())
// => true

isWeakMap(new Map())
// => false
```
<br /><br />

### isWeakSet()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/isWeakSet.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Checks if <code>value</code> is classified as a <code>WeakSet</code> object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is a weak set, else `false`.</p>

**Example**
```js
isWeakSet(new WeakSet())
// => true

isWeakSet(new Set())
// => false
```
<br /><br />

### objectIterator()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/objectIterator.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.11
<p>Returns iterator for an object's keys and values.</p>
<p>Note, iterates over object's own keys and symbols</p>

**Params**
<p><code>object</code>: <code>&ast;</code> - The array object to create an iterator for.</p>

**Returns**
<br /><p><code>Iterator</code> - A new iterator for the given object&#39;s keys and values</p>

**Example**
```js
objectIterator({
  write: 'more',
  tests: 'asap',
  [Symbol('like')]: 'now'
})
//=> {
//   next: () => ({
//     value: *,
//     done: boolean,
//     kdx: string,
//     key: string
//   })
// }

iter.next()
//=> { value: 'more', key: 'write', kdx: 'write', done: false }
iter.next()
//=> { value: 'asap', key: 'tests', kdx: 'tests', done: false }
iter.next()
//=> { value: 'now', key: Symbol('like'), kdx: Symbol('like'), done: false }
iter.next()
//=> { done: true }
```
<br /><br />

### objectKeys()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/objectKeys.js#L26)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.11
<p>Returns a list containing the names of all the enumerable own properties of the supplied object.<br />
Note that the order of the output array is not guaranteed to be consistent across different JS platforms.</p>

**Params**
<p><code>obj</code>: <code>Object</code> - The object to extract properties from</p>

**Returns**
<br /><p><code>Array</code> - An array of the object&#39;s own properties.</p>

**Example**
```js
objectKeys({a: 1, b: 2, c: 3}) //=> ['a', 'b', 'c']
```
<br /><br />

### toFinite()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/toFinite.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.7
<p>Converts <code>value</code> to a finite number.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to convert.</p>

**Returns**
<br /><p><code>number</code> - Returns the converted number.</p>

**Example**
```js
toFinite(3.2)
// => 3.2

toFinite(Number.MIN_VALUE)
// => 5e-324

toFinite(Infinity)
// => 1.7976931348623157e+308

toFinite('3.2')
// => 3.2
```
<br /><br />

### toInteger()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/toInteger.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.7
<p>Converts <code>value</code> to an integer.</p>
<p><strong>Note:</strong> This method is loosely based on<br />
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger"><code>ToInteger</code></a>.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to convert.</p>

**Returns**
<br /><p><code>number</code> - Returns the converted integer.</p>

**Example**
```js
toInteger(3.2)
// => 3

toInteger(Number.MIN_VALUE)
// => 0

toInteger(Infinity)
// => 1.7976931348623157e+308

toInteger('3.2')
// => 3
```
<br /><br />

### toNumber()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/toNumber.js#L24)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.7
<p>Converts <code>value</code> to a number.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to process.</p>

**Returns**
<br /><p><code>number</code> - Returns the number.</p>

**Example**
```js
toNumber(3.2)
// => 3.2

toNumber(Number.MIN_VALUE)
// => 5e-324

toNumber(Infinity)
// => Infinity

toNumber('3.2')
// => 3.2
```
<br /><br />

### toObject()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/toObject.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.9
<p>Converts <code>value</code> to a plain object flattening inherited enumerable string keyed properties of <code>value</code> to own properties of the plain object.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to convert.</p>

**Returns**
<br /><p><code>Object</code> - Returns the converted plain object.</p>

**Example**
```js
function Foo() {
  this.b = 2
}

Foo.prototype.c = 3

assign({ 'a': 1 }, new Foo)
// => { 'a': 1, 'b': 2 }

assign({ 'a': 1 }, toObject(new Foo))
// => { 'a': 1, 'b': 2, 'c': 3 }
```
<br /><br />

### toString()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/base/toString.js#L12)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.6
<p>Converts <code>value</code> to a string. An empty string is returned for <code>null</code>  and <code>undefined</code> values. The sign of <code>-0</code> is preserved.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to convert.</p>

**Returns**
<br /><p><code>string</code> - Returns the converted string.</p>

**Example**
```js
toString(null)
// => ''

toString(-0)
// => '-0'

toString([1, 2, 3])
// => '1,2,3'
```
<br /><br />

## common

### all()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/all.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Resolves all async values in an array or object</p>
<p>Auto curried for placeholder support.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The array or object whose values should be resolved. If value is not an object or array, the value is simply resolved to itself</p>

**Returns**
<br /><p><code>&ast;</code> - The array or object with its values resolved</p>

**Example**
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

### allWith()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/allWith.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Resolves all async values in an array or object and executes the given with the result</p>
<p>Auto curried for placeholder support.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to execute at the end of the resolution</p>
<p><code>value</code>: <code>&ast;</code> - The array or object whose values should be resolved. If value is not an object or array, the value is simply resolved to itself</p>

**Returns**
<br /><p><code>&ast;</code> - The array or object with its values resolved</p>

**Example**
```js
const nums = [
  1,
  Promise.resolve(2),
  (async () => 3)()
]
await allWith(
  (resolvedNums) => 'foo', // [ 1, 2, 3 ]
  nums
) // => 'foo'

const keyed = {
  a: 1,
  b: Promise.resolve(2),
  c: (async () => 3)()
}

await allWith(
  (resolvedNums) => 'foo', // { a: 1, b: 2, c: 3 }
  keyed
) // => 'foo'

allWith(
  (resolvedNums) => 'foo', // [ 1, 2, 3 ]
  [ 1, 2, 3 ]
) // => 'foo'
```
<br /><br />

### apply()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/apply.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Applies function <code>fn</code> to the argument list <code>args</code>. This is useful for creating a fixed-arity function from a variadic function. <code>fn</code> should be a bound function if context is significant.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function which will be called with `args`</p>
<p><code>args</code>: <code>Array</code> - The arguments to call `fn` with</p>

**Returns**
<br /><p><code>&ast;</code> - The result, equivalent to `fn(...args)`</p>

**Example**
```js
const nums = [1, 2, 3, -99, 42, 6, 7]
apply(Math.max, nums) //=> 42
```
<br /><br />

### complement()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/complement.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>returns a new function that logically nots the returned value and returns that as the result.</p>
<p>Auto-curried for placeholder support</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to complement</p>

**Returns**
<br /><p><code>Function</code> - The complemented function</p>

**Example**
```js
const isEven = (value) => value % 2 === 0
const isOdd = complement(isEven)
isOdd(1) //=> true
```
<br /><br />

### compose()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/compose.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Performs right-to-left function composition. The rightmost function may have any arity; the remaining functions must be unary.</p>
<p><strong>Note:</strong> The result of compose is not automatically curried.</p>

**Params**
<p><code>functions</code>: <code>...Function</code> - The functions to compose</p>

**Returns**
<br /><p><code>Function</code> - </p>

**Example**
```js
const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
const yellGreeting = compose(toUpper, classyGreeting)
yellGreeting('James', 'Bond')
//=> "THE NAME'S BOND, JAMES BOND"

compose(Math.abs, add(1), multiply(2))(-4) //=> 7
```
<br /><br />

### deferredPromise()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/deferredPromise.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Creates a promise with the resolve and reject methods exposed as properties<br />
on the promise.</p>

**Params**
None

**Returns**
<br /><p><code>Promise</code> - The promise with exposed methods</p>

**Example**
```js
const promise = deferredPromise()
// ... do something async then eventually resolve the promise
promise.resolve(someValue)
```
<br /><br />

### defn()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/defn.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Defines a function that will invoke the named function if it exists on the last arg. If the method does not, all args are passed through to the default function.</p>

**Params**
<p><code>name</code>: <code>string</code> - The name of the method to call if it exists</p>
<p><code>fn</code>: <code>Function</code> - The default function to execute if the named one does not exist on the last arg</p>

**Returns**
<br /><p><code>Function</code> - The wrapped function</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/dispatchable.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a function that dispatches with different strategies based on the object in list position (last argument). If it is an array, executes [fn].</p>
<p>Otherwise, it will default to executing [fn].</p>

**Params**
<p><code>name</code>: <code>string</code> - The name of the method to call if it exists</p>
<p><code>fn</code>: <code>Function</code> - The default function to execute if the named one does not exist on the last arg</p>

**Returns**
<br /><p><code>Function</code> - A function that dispatches on object in list position</p>

**Example**
```js
const get = dispatchable('get', (prop, value) => value[prop])
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

### identity()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/identity.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>A function that does nothing but return the parameter supplied to it. Good as a default or placeholder function.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to return.</p>

**Returns**
<br /><p><code>&ast;</code> - The input value.</p>

**Example**
```js
identity(1)
//=> 1

const obj = {}
identity(obj) === obj
//=> true

identity()
//=> undefined
```
<br /><br />

### isOp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/isOp.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>Determines if the value is an op.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - </p>

**Returns**
<br /><p><code>boolean</code> - </p>

**Example**
```js
isOp({
  ['@@redux-saga/IO']: 'op'
})
//=> true
```
<br /><br />

### isResolved()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/isResolved.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>Determines if the value is a resolvable value.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - </p>

**Returns**
<br /><p><code>boolean</code> - </p>

**Example**
```js
isResolved({
  ['@@redux-saga/IO']: 'op'
})
//=> false

isResolved((function* () {})())
//=> false

isResolved(new Promise(() => {})))
//=> false

isResolved({ resolve: () => 'foo' })
//=> false

isResolved(null)
//=> true

isResolved(undefined)
//=> true

isResolved('abc')
//=> true
```
<br /><br />

### iterate()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/iterate.js#L40)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.11
<p>This method iterates over the given collection or iterator in <strong>series</strong>. If the <code>iteratee</code> method returns <code>{ done: true }</code> then the iteration will complete.</p>
<p>This method automatically upgrades to async. If the <code>iteratee</code> returns a Promise or a generator, this method will return a Promise or a generator. Values are iterated in order and if the iteratee returns a resolvable value the iteration will wait until that value resolves before continuing with the iteration.</p>
<p>This method also supports async iterators. If an unresolved value is received from the iterator instead of an object with <code>value</code> and <code>done</code> properties, the iteration will wait for the value to resolve before continuing to the next iteration. This will also cause the method to upgrade to async and return a Promise.</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The iteratee Function</p>
<p><code>collection</code>: <code>&ast;</code> - The collection or iterator to iterate over</p>

**Returns**
<br /><p><code>&ast;</code> - The final value returned when the iteratee returns done or `undefined`</p>

**Example**
```js
iterate((value, kdx) => {
  if (value === 'b') {
    return { done: true, value: kdx }
  }
  return { done: false }
}, ['a', 'b', 'c'])
//=> 1

iterate(async (value, kdx) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (value === 'b') {
      return resolve({ done: true, value: kdx })
    }
    return resolve({ done: false })
  }, 0)
}), ['a', 'b', 'c'])
//=> 1
```
<br /><br />

### iterateRight()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/iterateRight.js#L41)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.11
<p>This method iterates over the given collection or iterator in <strong>series</strong>. If the <code>iteratee</code> method returns <code>{ done: true }</code> then the iteration will complete.</p>
<p>This method automatically upgrades to async. If the <code>iteratee</code> returns a Promise or a generator, this method will return a Promise or a generator. Values are iterated in order and if the iteratee returns a resolvable value the iteration will wait until that value resolves before continuing with the iteration.</p>
<p>This method also supports async iterators. If an unresolved value is received from the iterator instead of an object with <code>value</code> and <code>done</code> properties, the iteration will wait for the value to resolve before continuing to the next iteration. This will also cause the method to upgrade to async and return a Promise.</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The iteratee Function</p>
<p><code>collection</code>: <code>&ast;</code> - The collection or iterator to iterate over</p>

**Returns**
<br /><p><code>&ast;</code> - The final value returned when the iteratee returns done or `undefined`</p>

**Example**
```js
iterateRight((value, kdx) => {
  if (value === 'b') {
    return { done: true, value: kdx }
  }
  return { done: false }
}, ['a', 'b', 'c'])
//=> 1

iterateRight(async (value, kdx) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (value === 'b') {
      return resolve({ done: true, value: kdx })
    }
    return resolve({ done: false })
  }, 0)
}), ['a', 'b', 'c'])
//=> 1
```
<br /><br />

### iterator()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/iterator.js#L11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.11
<p>This method generates an iterator for the given value</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The iteratee Function</p>
<p><code>collection</code>: <code>&ast;</code> - The collection or iterator to iterate over</p>

**Returns**
<br /><p><code>&ast;</code> - The final value returned when the iteratee returns done or `undefined`</p>

**Example**
```js
iterator(['a', 'b', 'c'])
//=> { next: () => { value: string, index: number, kdx: umber, done: boolean }}

iterator('abc')
//=> { next: () => { value: string, index: number, kdx: umber, done: boolean }}

iterator({ a: 1, b: 2, c: 3 })
//=> { next: () => { value: number, key: string, kdx: string, done: boolean }}
```
<br /><br />

### nAry()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/nAry.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Wraps a function of any arity (including nullary) in a function that accepts exactly <code>n</code> parameters. Any extraneous parameters will not be passed to the supplied function.</p>

**Params**
<p><code>n</code>: <code>Number</code> - The desired arity of the new function.</p>
<p><code>fn</code>: <code>Function</code> - The function to wrap.</p>

**Returns**
<br /><p><code>Function</code> - A new function wrapping `fn`. The new function is guaranteed to be of arity `n`.</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/nArySpread.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Wraps a function of any arity (including nullary) in a function that accepts exactly <code>n</code> parameters. Any extraneous parameters are spread and then reapplied on execution. This is useful when you want to ensure a function's paramter length is exactly <code>n</code> but still passes all arguments through.</p>

**Params**
<p><code>n</code>: <code>Number</code> - The desired arity of the new function.</p>
<p><code>fn</code>: <code>Function</code> - The function to wrap.</p>

**Returns**
<br /><p><code>Function</code> - A new function wrapping `fn`. The new function is guaranteed to be of parameter length `n`.</p>

**Example**
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

### nth()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/nth.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns the nth element of the given list or string. If n is negative the<br />
element at index length + n is returned.</p>

**Params**
<p><code>offset</code>: <code>number</code> - The offset from the 0 index to select from. If negative it will be subtracted from length</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to select from</p>

**Returns**
<br /><p><code>&ast;</code> - The value at the nth index</p>

**Example**
```js
const list = ['foo', 'bar', 'baz', 'quux']
nth(1, list) //=> 'bar'
nth(-1, list) //=> 'quux'
nth(-99, list) //=> undefined

nth(2, 'abc') //=> 'c'
nth(3, 'abc') //=> ''
```
<br /><br />

### pipe()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/pipe.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>Performs left-to-right function composition. The leftmost function may have<br />
any arity; the remaining functions must be unary.</p>
<p>In some libraries this function is named <code>sequence</code>.</p>
<p><strong>Note:</strong> The result of pipe is not automatically curried.</p>

**Params**
<p><code>functions</code>: <code>...Function</code> - </p>

**Returns**
<br /><p><code>Function</code> - </p>

**Example**
```js
const f = pipe(Math.pow, negate, inc)

f(3, 4) // -(3^4) + 1
```
<br /><br />

### resolve()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/resolve.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.9
<p>Resolves a value to its valueOf.</p>
<p>Dispatches to the <code>resolve</code> method if it exists. If a resolve method returns a value that is also resolvable, this method will resolve that value as well.</p>

**Params**
<p><code>values</code>: <code>...String</code> - The values to check.</p>

**Returns**
<br /><p><code>String</code> - The first value found that is a path.</p>

**Example**
```js
resolve('foo') // => 'foo'

resolve({
 valueOf: () => 'bar'
}) //=> bar

resolve({
 resolve: () => 'bar'
}) //=> bar

resolve({
  resolve: () => ({
    valueOf: () => 'bar'
  })
}) //=> bar

resolve({
  resolve: () => ({
    resolve: () => 'bar'
  })
}) //=> bar
```
<br /><br />

### resolveToGeneratorWith()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/resolveToGeneratorWith.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>Resolves a value to a generator using the generator to yield values. When the generator is complete the fn method is executed with the final result.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to execute at the end of the generator&#39;s resolution</p>
<p><code>value</code>: <code>&ast;</code> - The value to resolve with the generator</p>

**Returns**
<br /><p><code>Generator</code> - </p>

**Example**
```js
const generator = resolveToGeneratorWith(
  (resolvedValue) => //=> 'foo'
  'foo'
)
generator.next() //=> { done: true } triggers the fn method
```
<br /><br />

### resolveWith()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/resolveWith.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>Resolves a value to the given method.</p>
<p>If the value to be resolved is a promise then this method will return a promise. The fn method will be triggered once the promise resolves.</p>
<p>If the value to be resolved is a generator, this method will return a generator.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to execute at the end of the resolution</p>
<p><code>value</code>: <code>&ast;</code> - The value to resolve with the generator</p>

**Returns**
<br /><p><code>Generator</code> - </p>

**Example**
```js
await resolveWith(
  (resolvedValue) => 'bar' // resolvedValue == 'foo'
  Promise.resolve('foo')
) //=> 'bar'

resolveWith(
  (resolvedValue) => 'bar' // resolvedValue == 'foo'
  'foo'
) //=> 'bar'
```
<br /><br />

### sleep()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/common/sleep.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Sleeps for the given amount of <code>wait</code> milliseconds before resolving the returned <code>Promise</code></p>

**Params**
<p><code>wait</code>: <code>number</code> - The number of milliseconds to wait before resoliving the Promise</p>

**Returns**
<br /><p><code>Promise</code> - Resolves once the given amount of time has ellapsed.</p>

**Example**
```js
await sleep(1000)
// 1000+ milliseconds later
```
<br /><br />

## constants

### MAX_SAFE_INTEGER

[source](https://github.com/serverless/utils/tree/v0.0.14/src/constants/MAX_SAFE_INTEGER.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>This constant represents the maximum safe integer in JavaScript (2^53 - 1).</p>
<p>See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER">MAX_SAFE_INTEGER</a> for more information.</p>

**Type**: `{number}`

<br /><br />

### SYMBOL_ITERATOR

[source](https://github.com/serverless/utils/tree/v0.0.14/src/constants/SYMBOL_ITERATOR.js#L1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.11
<p>The Symbol.iterator well-known symbol specifies the default iterator for an object. Used by for...of.</p>
<p>See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator">Symbol.iterator</a> for more information.</p>

**Type**: `{Symbol}`

<br /><br />

## data

### any()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/any.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns <code>true</code> if at least one of elements of the collection match the predicate, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>any</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to consider.</p>

**Returns**
<br /><p><code>Boolean</code> - `true` if the predicate is satisfied by at least one element, `false` otherwise.</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/anyAtIndex.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns <code>true</code> if at least one of elements of the list match the predicate starting at the given index, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>anyAtIndex</code> method of the list argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function.</p>
<p><code>index</code>: <code>Integer</code> - The index to start at.</p>
<p><code>list</code>: <code>Array</code> - The array to consider.</p>

**Returns**
<br /><p><code>Boolean</code> - `true` if the predicate is satisfied by at least one element, `false`<br />
        otherwise.</p>

**Example**
```js
const lessThan0 = flip(lt)(0)
const lessThan2 = flip(lt)(2)
anyAtIndex(lessThan0, 0, [3, 2, 1]) //=> false
anyAtIndex(lessThan2, 1, [3, 2, 1]) //=> true

await anyAtIndex(async (value) => lessThan2(value), 0, [1, 2]) //=> true
```
<br /><br />

### append()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/append.js#L16)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns a new list containing the contents of the given list, followed by the given value.</p>
<p>This method dispatches to the <code>append</code> method of the <code>arrayLike</code> argument if it exists.</p>
<p>This method will auto upgrade to async and resolve the <code>arrayLike</code> value if the <code>arrayLike</code> value is a Promise.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to add to the end of the new list.</p>
<p><code>arrayLike</code>: <code>Array|string</code> - The array like value of elements to add a new item to.</p>

**Returns**
<br /><p><code>Array|string</code> - A new array or string containing the elements of the old list followed by `value`.</p>

**Example**
```js
append('tests', ['write', 'more']) //=> ['write', 'more', 'tests']
append('tests', []) //=> ['tests']
append(['tests'], ['write', 'more']) //=> ['write', 'more', ['tests']]
append('tests', 'write more ') //=> 'write more tests'
```
<br /><br />

### assign()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/assign.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.9
<p>The assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.</p>
<p>Dispatches to the <code>assign</code> method of the first parameter if it exists.</p>
<p>This method is auto curried to 2 args.</p>

**Params**
<p><code>target</code>: <code>Object</code> - The target object.</p>
<p><code>sources</code>: <code>...Object</code> - The source object(s).</p>

**Returns**
<br /><p><code>Object</code> - The target object</p>

**Example**
```js
const  o1 = { a: 1, b: 1, c: 1 }
const o2 = { b: 2, c: 2 }
const o3 = { c: 3 }

assign({}, o1, o2, o3)  //=> { a: 1, b: 2, c: 3 }
```
<br /><br />

### assoc()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/assoc.js#L28)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the specified property with the given value. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.</p>
<p>Supports path based property selectors 'foo.bar' and functional selectors which performs an over on the entire collection and sets each matching selector to the given value.</p>

**Params**
<p><code>selector</code>: <code>Array | String | Function</code> - The property path to set or functional selector</p>
<p><code>value</code>: <code>&ast;</code> - The new value</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to clone and assign the new value</p>

**Returns**
<br /><p><code>&ast;</code> - A new collection equivalent to the original except for the changed selector path.</p>

**Example**
```js
assoc('c', 3, {a: 1, b: 2})          //=> {a: 1, b: 2, c: 3}
assoc('c.d', 3, {a: 1, b: 2})        //=> {a: 1, b: 2, c: { d: 3 }}
assoc([ 'c', 'd' ], 3, {a: 1, b: 2}) //=> {a: 1, b: 2, c: { d: 3 }}
```
<br /><br />

### assocIndex()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/assocIndex.js#L23)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

**Params**
<p><code>index</code>: <code>number</code> - The index number to set</p>
<p><code>value</code>: <code>&ast;</code> - The new value</p>
<p><code>array</code>: <code>Array</code> - The array to clone</p>

**Returns**
<br /><p><code>Array</code> - A new array equivalent to the original except for the changed index.</p>

**Example**
```js
assocIndex(1, 'c', ['a', 'b']) //=> ['a', 'c']
```
<br /><br />

### assocPath()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/assocPath.js#L29)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the nodes required<br />
to create the given path, and placing the specific value at the tail end of<br />
that path. Note that this copies and flattens prototype properties onto the<br />
new object as well. All non-primitive properties are copied by reference.</p>

**Params**
<p><code>path</code>: <code>Array</code> - The path to set</p>
<p><code>value</code>: <code>&ast;</code> - The new value</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to clone</p>

**Returns**
<br /><p><code>&ast;</code> - A new collection equivalent to the original except along the specified path.</p>

**Example**
```js
assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}) //=> {a: {b: {c: 42}}}

// Any missing or non-object keys in path will be overridden
assocPath(['a', 0, 'c'], 42, {a: 5}) //=> {a: [{c: 42}]}
```
<br /><br />

### assocProp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/assocProp.js#L37)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

**Params**
<p><code>prop</code>: <code>string</code> - The property name to set</p>
<p><code>value</code>: <code>&ast;</code> - The new value</p>
<p><code>object</code>: <code>Object|Map</code> - The object to clone</p>

**Returns**
<br /><p><code>Object</code> - A new object equivalent to the original except for the changed property.</p>

**Example**
```js
assocProp('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
```
<br /><br />

### compact()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/compact.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.10
<p>Creates an array with all undefined values removed.</p>

**Params**
<p><code>array</code>: <code>Array</code> - The array to compact.</p>

**Returns**
<br /><p><code>Array</code> - Returns the new array of filtered values.</p>

**Example**
```js
compact([0, 1, false, 2, null, '', 3, undefined])
// => [0, 1, false, 2, null, '', 3]
```
<br /><br />

### concat()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/concat.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns the result of concatenating the given lists or strings.</p>
<p>Note: <code>concat</code> expects both arguments to be of the same type, unlike the native <code>Array.prototype.concat</code> method. It will throw an error if you <code>concat</code> an Array with a non-Array value.</p>
<p>Dispatches to the <code>concat</code> method of the first argument, if present.</p>
<p>Supports Promises. If a Promise is received for either parameter than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>firstList</code>: <code>Array|string|Promise</code> - The first list</p>
<p><code>secondList</code>: <code>Array|string|Promise</code> - The second list</p>

**Returns**
<br /><p><code>Array|string</code> - A list consisting of the elements of `firstList` followed by the elements of `secondList`.</p>

**Example**
```js
concat('ABC', 'DEF') // 'ABCDEF'
concat([4, 5, 6], [1, 2, 3]) //=> [4, 5, 6, 1, 2, 3]
concat([], []) //=> []
await concat(Promise.resolve([4, 5, 6]), Promise.resolve([1, 2, 3])) //=> [4, 5, 6, 1, 2, 3]
```
<br /><br />

### every()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/every.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns <code>true</code> if all elements of the list match the predicate, <code>false</code> if there are any that don't.</p>
<p>Dispatches to the <code>every</code> method of the second argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to consider.</p>

**Returns**
<br /><p><code>boolean</code> - `true` if the predicate is satisfied by every value, `false` otherwise.</p>

**Example**
```js
const equals3 = equals(3)
every(equals3, [3, 3, 3, 3]) //=> true
every(equals3, [3, 3, 1, 3]) //=> false
every(equals3, { a: 3, b: 3, c: 3}) //=> true

await every(async (value) => equals3(value), [3, 3, 3]) //=> true
```
<br /><br />

### everyAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/everyAtIndex.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns <code>true</code> if all elements of the list match the predicate starting at the given index, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>everyAtIndex</code> method of the list argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function.</p>
<p><code>index</code>: <code>Integer</code> - The index to start at.</p>
<p><code>list</code>: <code>Array</code> - The array to consider.</p>

**Returns**
<br /><p><code>Boolean</code> - `true` if the predicate is satisfied by at least one element, `false`  otherwise.</p>

**Example**
```js
const lessThan0 = flip(lt)(0)
const lessThan2 = flip(lt)(2)
any(lessThan0)([1, 2]) //=> false
any(lessThan2)([1, 2]) //=> true
```
<br /><br />

### filter()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/filter.js#L12)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Takes a predicate and a <code>Filterable</code>, and returns a new filterable of the same type containing the members of the given filterable which satisfy the given predicate. Filterable objects include plain objects or any object that has a filter method such as <code>Array</code>.</p>
<p>Dispatches to the <code>filter</code> method of the second argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to consider.</p>

**Returns**
<br /><p><code>&ast;</code> - The filtered collection</p>

**Example**
```js
const isEven = n => n % 2 === 0;

filter(isEven, [1, 2, 3, 4]) //=> [2, 4]
filter(isEven, {a: 1, b: 2, c: 3, d: 4}) //=> {b: 2, d: 4}

await filter(async (value) => isEven(value), [1, 2, 3, 4]) //=> [2, 4]
```
<br /><br />

### filterAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/filterAtIndex.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Takes a predicate and a <code>Filterable</code>, and returns a new filterable of the same type containing the members of the given filterable which satisfy the given predicate starting from the given index. Filterable objects include plain objects or any object that has a filter method such as <code>Array</code>.</p>
<p>Dispatches to the <code>filter</code> method of the second argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function.</p>
<p><code>index</code>: <code>Integer</code> - The index to start at.</p>
<p><code>list</code>: <code>Array</code> - The array to consider.</p>

**Returns**
<br /><p><code>Array</code> - The filtered list</p>

**Example**
```js
const isEven = n => n % 2 === 0;

filterAtIndex(isEven, 0, [1, 2, 3, 4]) //=> [2, 4]
filterAtIndex(isEven, 2, [1, 2, 3, 4]) //=> [4]

await filter(async (value) => isEven(value), [1, 2, 3, 4]) //=> [2, 4]
```
<br /><br />

### find()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/find.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the first element of the collection which matches the predicate, or<br />
<code>undefined</code> if no element matches.</p>
<p>Dispatches to the <code>find</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function used to determine if the element is the<br />
       desired one.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to consider.</p>

**Returns**
<br /><p><code>Object</code> - The element found, or `undefined`.</p>

**Example**
```js
const xs = [{a: 1}, {a: 2}, {a: 3}];
find(propEq('a', 2))(xs); //=> {a: 2}
find(propEq('a', 4))(xs); //=> undefined
```
<br /><br />

### findAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/findAtIndex.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the first element of the list which matches the predicate, or <code>undefined</code> if no element matches starting at the given index.</p>
<p>Dispatches to the <code>findAtIndex</code> method of the last argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function used to determine if the element is the<br />
       desired one.</p>
<p><code>index</code>: <code>Integer</code> - The index to start at.</p>
<p><code>list</code>: <code>Array</code> - The array to consider.</p>

**Returns**
<br /><p><code>&ast;|Promise</code> - The element found, or `undefined`.</p>

**Example**
```js
const xs = [{a: 1}, {a: 2}, {a: 3}];
findAtIndex(propEq('a'), 0)(xs) //=> {a: 2}
findAtIndex(propEq('a', 2), 2)(xs) //=> undefined
```
<br /><br />

### findKdx()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/findKdx.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.15
<p>Returns the kdx of the first element of the collection which matches the predicate, or <code>undefined</code> if no element matches.</p>
<p>Dispatches to the <code>findkdx</code> method of the <code>collection</code> argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The predicate function used to determine if the element is the desired one.</p>
<p><code>collection</code>: <code>Array</code> - The collection to consider.</p>

**Returns**
<br /><p><code>&ast;|Promise</code> - The element found, or `undefined`.</p>

**Example**
```js
findKdx(
  (value, index) => value[index] == 2,
  [{a: 1}, {a: 2}, {a: 3}]
)
//=> 1

findKdx(
  (value, key) => value[key] == 2,
  { a: 1, b: 2, c: 3 }
)
//=> 'b'
```
<br /><br />

### flatten()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/flatten.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.</p>
<p>This method automatically upgrades to async. If a Promise is given as the list this method will resolve the promise as the list and return a Promise that resolves to the flattened list.</p>

**Params**
<p><code>array</code>: <code>Array|Promise&lt;Array&gt;</code> - The array to consider.</p>

**Returns**
<br /><p><code>Array|Promise&lt;Array&gt;</code> - The flattened array.</p>

**Example**
```js
flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```
<br /><br />

### forEach()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/forEach.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Iterate over a collection calling a provided function <code>fn</code> for each element in the collection .</p>
<p><code>fn</code> receives two arguments: <em>(value, kdx)</em></p>
<p>This method automatically upgrades to async. If an async iterator is given to this method it will return a Promise.</p>
<p>Note: <code>forEach</code> does not skip deleted or unassigned indices (sparse<br />
arrays), unlike the native <code>Array.prototype.forEach</code> method. For more<br />
details on this behavior, see:<br />
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description</p>
<p>Also note that, unlike <code>Array.prototype.forEach</code>, this <code>forEach</code> returns<br />
the original value. In some libraries this function is named <code>each</code>.</p>
<p>Dispatches to the <code>forEach</code> method of the second argument, if present.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The original collection.</p>

**Example**
```js
const printXPlusFive = x => console.log(x + 5);
forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
// logs 6
// logs 7
// logs 8
```
<br /><br />

### forEachIndexed()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/forEachIndexed.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Alias for <a href="#forEach">forEach</a> method</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The original collection.</p>

<br /><br />

### forEachObjIndexed()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/forEachObjIndexed.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since 0.0.3
<p>Alias for <a href="#forEach">forEach</a> method</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The original collection.</p>

<br /><br />

### get()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/get.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Retrieve the value at a given path.</p>
<p>Paths can be defined by a string an array. The path parameter also accepts a function that will be used as a selector against the data.</p>

**Params**
<p><code>path</code>: <code>Array|string|number|Function</code> - The path to use.</p>
<p><code>value</code>: <code>Object</code> - The value to retrieve the nested property from.</p>

**Returns**
<br /><p><code>&ast;</code> - The data at `path`.</p>

**Example**
```js
get(['a', 'b'], {a: {b: 2}})
//=> 2

get(['a', 'b'], {c: {b: 2}})
//=> undefined

get('a', {a: {b: 2}})
//=> { b: 2 }

get('a.b', {a: {b: 2}})
//=> 2

get('a[0]', {a: [ 1, 2 ]})
//=> 1

get('[0]', [ 1, 2 ])
//=> 1
```
<br /><br />

### getParent()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/getParent.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Retrieve the parent value from a given path. The parent value is the value immediately before the last path part.</p>
<p>Paths can be defined by a string an array. The path parameter also accepts a function that will be used as a selector against the data.</p>

**Params**
<p><code>path</code>: <code>Array|string|number|Function</code> - The path to use.</p>
<p><code>value</code>: <code>Object</code> - The value to retrieve the parent property value from.</p>

**Returns**
<br /><p><code>&ast;</code> - The data at `path`.</p>

**Example**
```js
getParent(['a', 'b'], {a: {b: 2}})
//=> {b: 2}

getParent(['a', 'b'], {c: {b: 2}})
//=> undefined

getParent('a', {a: {b: 2}})
//=> {a: {b: 2}}

getParent('a.b', {a: {b: 2}})
//=> {b: 2}

getParent('a[0]', {a: [ 1, 2 ]})
//=> [ 1, 2 ]
```
<br /><br />

### getParentPath()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/getParentPath.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Retrieve the parent value from a given path. The parent value is the value immediately before the last path part.</p>

**Params**
<p><code>path</code>: <code>Array</code> - The path to use.</p>
<p><code>value</code>: <code>&ast;</code> - The value to retrieve the nested property from.</p>

**Returns**
<br /><p><code>&ast;</code> - The data at `path`.</p>

**Example**
```js
getParentPath(['a', 'b'], {a: {b: 2}}); //=> {b: 2}
getParentPath(['a', 'b'], {c: {b: 2}}); //=> undefined
```
<br /><br />

### getPath()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/getPath.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Retrieve the value at a given path.</p>

**Params**
<p><code>path</code>: <code>Array</code> - The path to use.</p>
<p><code>obj</code>: <code>Object</code> - The object to retrieve the nested property from.</p>

**Returns**
<br /><p><code>&ast;</code> - The data at `path`.</p>

**Example**
```js
getPath(['a', 'b'], {a: {b: 2}}); //=> 2
getPath(['a', 'b'], {c: {b: 2}}); //=> undefined
```
<br /><br />

### getProp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/getProp.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns a function that when supplied an object returns the indicated  property of that object, if it exists.</p>

**Params**
<p><code>prop</code>: <code>string|number|Function</code> - The property name or property selector</p>
<p><code>value</code>: <code>Object</code> - The value to query</p>

**Returns**
<br /><p><code>&ast;</code> - The value at the given property</p>

**Example**
```js
getProp('x', {x: 100}) //=> 100
getProp('x', {})       //=> undefined
getProp(undefined, {})  //=> {}
getProp(1, ['foo', 'bar'])  //=> 'bar'
getProp((value) => value[0], ['foo', 'bar'])  //=> 'foo'
getProp('foo', {
  foo: 'bar',
  get(prop) { return this[prop] }
}) //=> 'bar'
```
<br /><br />

### has()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/has.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

**Params**
<p><code>selector</code>: <code>Array|String</code> - The selector to use.</p>
<p><code>value</code>: <code>Object</code> - The value to check the path in.</p>

**Returns**
<br /><p><code>Boolean</code> - Whether the selector exists.</p>

**Example**
```js
has(['a', 'b'], {a: {b: 2}})          // => true
has(['a', 'b'], {a: {b: undefined}})  // => true
has('a.b', {a: {c: 2}})               // => false
has([], {})                           // => true
```
<br /><br />

### hasPath()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/hasPath.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

**Params**
<p><code>path</code>: <code>Array</code> - The path to use.</p>
<p><code>obj</code>: <code>Object</code> - The object to check the path in.</p>

**Returns**
<br /><p><code>Boolean</code> - Whether the path exists.</p>

**Example**
```js
hasPath(['a', 'b'], {a: {b: 2}})          // => true
hasPath(['a', 'b'], {a: {b: undefined}})  // => true
hasPath('a.b', {a: {c: 2}})               // => false
hasPath([], {})                           // => true
```
<br /><br />

### hasProp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/hasProp.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns whether or not an object has an own property with the specified name</p>
<p>If prop is a function then it is executed against value as a selector.<br />
If prop is undefined then value will be checked for truthiness.</p>

**Params**
<p><code>prop</code>: <code>String | Function</code> - The name of the property to check for.</p>
<p><code>value</code>: <code>Object | Map</code> - The value to query.</p>

**Returns**
<br /><p><code>Boolean</code> - Whether the property exists.</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/head.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns the first element of the given list or string.</p>

**Params**
<p><code>list</code>: <code>Array|String</code> - The list to get the first element from</p>

**Returns**
<br /><p><code>&ast;</code> - The first element in the given list</p>

**Example**
```js
head(['fi', 'fo', 'fum']) //=> 'fi'
head([]) //=> undefined

head('abc') //=> 'a'
head('') //=> ''
```
<br /><br />

### init()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/init.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns all but the last element of the given list or string.</p>

**Params**
<p><code>list</code>: <code>&ast;</code> - The list to select from</p>

**Returns**
<br /><p><code>&ast;</code> - A new array or string of all but the last element in the list</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/is.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>See if an object (<code>val</code>) is an instance of the supplied constructor. This function will check up the inheritance chain, if any.</p>

**Params**
<p><code>constructor</code>: <code>Object</code> - A constructor</p>
<p><code>value</code>: <code>&ast;</code> - The value to test</p>

**Returns**
<br /><p><code>boolean</code> - </p>

**Example**
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

### join()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/join.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a string made by inserting the <code>separator</code> between each element and<br />
concatenating all the elements into a single string.</p>
<p>Supports Promises. If a Promise is received for either parameter than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>separator</code>: <code>number|string|Promise&lt;number|string&gt;</code> - The string used to separate the elements.</p>
<p><code>list</code>: <code>Array|Promise&lt;Array&gt;</code> - The list of elements to join into a string.</p>

**Returns**
<br /><p><code>string|Promise&lt;string&gt;</code> - The string made by concatenating `list` with `separator`.</p>

**Example**
```js
const spacer = join(' ')
spacer(['a', 2, 3.4])   //=> 'a 2 3.4'
join('|', [1, 2, 3])    //=> '1|2|3'
await join(Promise.resolve('|'), Promise.resolve([1, 2, 3]))    //=> '1|2|3'
```
<br /><br />

### keys()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/keys.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the keys of the given collection in an Array.</p>
<p>Supports objects, Maps and array like values. If given an array like value, the indexes will be returned in string form.</p>
<p>This method supports Promise values. If given a Promise it will return a Promise that will resolve to the keys of the resolved value of the Promise.</p>
<p>Dispatches to the <code>keys</code> method of the <code>collection</code> if present (except on Map). If a <code>Map</code> is received an array of the <code>Map</code>'s keys will be returned.</p>

**Params**
<p><code>collection</code>: <code>&ast;</code> - The collection to get the keys from</p>

**Returns**
<br /><p><code>Array&lt;string&gt;|Promise&lt;Array&lt;string&gt;&gt;</code> - The keys of the given collection</p>

**Example**
```js
keys({ foo: 'bar', 'baz': 'bat', bim: 'bop' }) //=> ['foo', 'baz', 'bim']
keys({}) //=> []

keys(['fi', 'fo', 'fum']) //=> [ '0', '1', '2' ]
keys([]) //=> []

keys('abc') //=> ['0', '1', '2']
keys('') //=> []

await keys(Promise.resolve({ a: 1, b: 2 }) //=> ['a', 'b']
```
<br /><br />

### last()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/last.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns the last element of the given list or string.</p>

**Params**
<p><code>list</code>: <code>&ast;</code> - The list to get the last element from</p>

**Returns**
<br /><p><code>&ast;</code> - The last element of the given list or string</p>

**Example**
```js
last(['fi', 'fo', 'fum']) //=> 'fum'
last([]) //=> undefined

last('abc') //=> 'c'
last(''); //=> ''
```
<br /><br />

### length()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/length.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Returns the number of elements in the array by returning <code>list.length</code>.</p>

**Params**
<p><code>list</code>: <code>&ast;</code> - The array like value to inspect.</p>

**Returns**
<br /><p><code>Number</code> - The length of the list.</p>

**Example**
```js
length([]) //=> 0
length([1, 2, 3]) //=> 3
```
<br /><br />

### map()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/map.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Takes a function and a <a href="https://github.com/fantasyland/fantasy-land#functor">functor</a>, applies the function to each of the functor's values, and returns  a functor of the same shape.</p>
<p>Provides suitable <code>map</code> implementations for <code>Array</code> and <code>Object</code>,<br />
so this function may be applied to <code>[1, 2, 3]</code> or <code>{x: 1, y: 2, z: 3}</code>.</p>
<p>Dispatches to the <code>map</code> method of the second argument, if present.</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The function to be called on every element of the input `list`.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to be iterated over.</p>

**Returns**
<br /><p><code>&ast;</code> - The new collection.</p>

**Example**
```js
const double = x => x * 2

map(double, [1, 2, 3]) //=> [2, 4, 6]

map(double, {x: 1, y: 2, z: 3}) //=> {x: 2, y: 4, z: 6}
```
<br /><br />

### mapIndexed()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/mapIndexed.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Alias for <a href="#map">map</a> method</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The function to be called on every element of the input `list`.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to be iterated over.</p>

**Returns**
<br /><p><code>&ast;</code> - The new collection.</p>

<br /><br />

### mapObjIndexed()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/mapObjIndexed.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Alias for <a href="#map">map</a> method</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The function to be called on every element of the input `list`.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to be iterated over.</p>

**Returns**
<br /><p><code>&ast;</code> - The new collection.</p>

<br /><br />

### omit()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/omit.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a partial copy of an object omitting the keys specified.</p>

**Params**
<p><code>names</code>: <code>Array</code> - an array of String property names to omit from the new object</p>
<p><code>obj</code>: <code>Object</code> - The object to copy from</p>

**Returns**
<br /><p><code>Object</code> - A new object with properties from `names` not on it.</p>

**Example**
```js
omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) //=> {b: 2, c: 3}
```
<br /><br />

### pick()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/pick.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a partial copy of an object containing only the keys specified. If<br />
the key does not exist, the property is ignored.</p>
<p>Supports Promises. If a Promise is received for either parameter than the entire method will upgrade to async and return a Promise.</p>

**Params**
<p><code>names</code>: <code>Array|Promise&lt;Array&gt;</code> - an array of String property names to copy onto a new object</p>
<p><code>object</code>: <code>Object|Promise&lt;Object&gt;</code> - The object to copy from</p>

**Returns**
<br /><p><code>Object|Promise&lt;Object&gt;</code> - A new object with only properties from `names` on it.</p>

**Example**
```js
pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) //=> {a: 1, d: 4}
pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}) //=> {a: 1}
await pick(
  Promise.resolve(['a', 'd']),
  Promise.resolve({a: 1, b: 2, c: 3, d: 4})
) //=> {a: 1, d: 4}
```
<br /><br />

### prepend()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/prepend.js#L16)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Returns a new list with the given element at the front, followed by the contents of the list.</p>
<p>This method dispatches to the <code>prepend</code> method of the <code>arrayLike</code> argument if it exists.</p>
<p>This method will auto upgrade to async and resolve the <code>arrayLike</code> value if the <code>arrayLike</code> value is a Promise.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to add to the end of the new list.</p>
<p><code>arrayLike</code>: <code>Array|string</code> - The array like value of elements to prepend a new item to.</p>

**Returns**
<br /><p><code>Array|string</code> - A new array or string containing the elements of the old list prepended with `value`.</p>

**Example**
```js
prepend('write', ['more', 'tests']) //=> ['write', 'more', 'tests']
prepend('write', []) //=> ['write']
prepend(['write'], ['more', 'tests']) //=> ['write', 'more', ['tests']]
prepend('write', ' more tests') //=> 'write more tests'
```
<br /><br />

### reduce()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/reduce.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Returns a single item by iterating through the collection, successively calling the iterator function and passing it an accumulator value and the current value from the collection, and then passing the result to the next call.</p>
<p>The iterator function receives three values: <em>(acc, value, kdx)</em>.</p>
<p>Note: This method automatically upgrades to async.</p>
<ul>
<li>If an async <code>iteratee</code> is given to this method it will return a Promise.</li>
<li>If a Promise is given for <code>iteratee</code>, <code>accumulator</code>, or <code>collection</code>, this method will resolve the Promise(s) and return a Promise</li>
</ul>
<p>Note: for arrays, <code>reduce</code> does not skip deleted or unassigned indices (sparse arrays), unlike the native <code>Array.prototype.reduce</code> method. For more details  on this behavior, see:<br />
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description</p>
<p>Dispatches to the <code>reduce</code> method of the third argument, if present.</p>
<p>This method will resolve the parameters but it will not resolve the values passed to the iteratee. It will only resolve the values returned by the iteratee.</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.</p>
<p><code>accumulator</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>Array|string|Object|Promise</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

**Example**
```js
reduce((accum, value, key) => {
  ...
  return accum
}, myAccum, myObject)

reduce((accum, value, index) => {
  ...
  return accum
}, myAccum, myArray)

reduce((accum, value) => {
  accum.push(value)
  return accum
}, [], [ Promise.resolve('foo') ]) // => [ Promise { 'foo' } ]


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

### reduceIndexed()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/reduceIndexed.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Alias for <a href="#reduce">reduce</a> method</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.</p>
<p><code>accumulator</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>Array|string|Object|Promise</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

<br /><br />

### reduceObjIndexed()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/reduceObjIndexed.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Alias for <a href="#reduce">reduce</a> method</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.</p>
<p><code>accumulator</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>Array|string|Object|Promise</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

<br /><br />

### reduceRight()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/reduceRight.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Returns a single item by iterating through the collection, successively calling the iterator function and passing it an accumulator value,  the current value and the index or key from the collection, and then passing the result to the next call.</p>
<p>Similar to <a href="#reduce"><code>reduce</code></a>, except moves through the input list from the right to the left.</p>
<p>The iterator function receives three values: <em>(acc, value, kdx)</em>.</p>
<p>Supports async reducers. This method will automatically upgrade to async if given an async reducer.</p>
<p>Dispatches to the <code>reduce</code> method of the third argument, if present.</p>
<p>Note: <code>reduceRight</code> does not skip deleted or unassigned indices (sparse arrays), unlike the native <code>Array.prototype.reduceRight</code> method. For more details on this behavior, see:<br />
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.</p>
<p><code>accumulator</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>Array|string|Object|Promise</code> - The collection to iterate over.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

**Example**
```js
reduceRight(subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
//    -               -2
//   / \              / \
//  1   -            1   3
//     / \              / \
//    2   -     ==>    2  -1
//       / \              / \
//      3   -            3   4
//         / \              / \
//        4   0            4   0
```
<br /><br />

### reject()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/reject.js#L8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>The complement of <a href="#filter"><code>filter</code></a>.</p>

**Params**
<p><code>predicate</code>: <code>Function</code> - </p>
<p><code>filterable</code>: <code>&ast;</code> - </p>

**Returns**
<br /><p><code>&ast;</code> - </p>

**Example**
```js
isOdd = (n) => n % 2 === 1

reject(isOdd, [1, 2, 3, 4]) //=> [2, 4]

reject(isOdd, {a: 1, b: 2, c: 3, d: 4}) //=> {b: 2, d: 4}
```
<br /><br />

### set()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/set.js#L20)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>This method is an alias for <code>assoc</code></p>
<p>Makes a shallow clone of an object, setting or overriding the specified property with the given value. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.</p>
<p>Supports path based property selectors 'foo.bar' and functional selectors which performs an 'over' on the entire collection and sets each matching selector to the given value.</p>
<p>dispatches to the <code>set</code> method of the 3rd argument if available</p>

**Params**
<p><code>selector</code>: <code>Array | String | Function</code> - The property path to set or functional selector</p>
<p><code>value</code>: <code>&ast;</code> - The new value</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to clone and assign the new value</p>

**Returns**
<br /><p><code>&ast;</code> - A new collection equivalent to the original except for the changed selector path.</p>

**Example**
```js
set('c', 3, {a: 1, b: 2})          //=> {a: 1, b: 2, c: 3}
set('c.d', 3, {a: 1, b: 2})        //=> {a: 1, b: 2, c: { d: 3 }}
set([ 'c', 'd' ], 3, {a: 1, b: 2}) //=> {a: 1, b: 2, c: { d: 3 }}
```
<br /><br />

### shallowEquals()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/shallowEquals.js#L21)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Performs equality by iterating through keys on an object and returning false when any key has values which are not strictly equal between the arguments. Returns true when the values of all keys are strictly equal.</p>

**Params**
<p><code>selector</code>: <code>Array | String | Function</code> - The property path to set or functional selector</p>
<p><code>objA</code>: <code>object</code> - The object to compare to B</p>
<p><code>objB</code>: <code>object</code> - The object to compare to A</p>

**Returns**
<br /><p><code>boolean</code> - Whether or not the two objects are shallowly equal</p>

**Example**
```js
shallowEquals({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: undefined }) //=> true
shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }) //=> false
```
<br /><br />

### slice()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/slice.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Creates a slice of <code>arrayLike</code> from <code>start</code> up to, but not including, <code>end</code>.</p>
<p><strong>Note:</strong> This method is used instead of<br />
<a href="https://mdn.io/Array/slice"><code>Array#slice</code></a> to ensure dense arrays are returned.</p>
<p>This method</p>

**Params**
<p><code></code>: <code>number</code> - [start=0] The start position. A negative index will be treated as an offset from the end.</p>
<p><code></code>: <code>number</code> - [end=array.length] The end position. A negative index will be treated as an offset from the end.</p>
<p><code>arrayLike</code>: <code>Array|string</code> - The array like value to slice.</p>

**Returns**
<br /><p><code>Array|string</code> - Returns the slice of `arrayLike`.</p>

**Example**
```js
const array = [1, 2, 3, 4]

slice(2, Infinity, array)
// => [3, 4]

const string = 'abcd'

slice(0, 2, string)
// => 'ab'
```
<br /><br />

### tail()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/tail.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.5
<p>Returns all but the first element of the given list or string (or object<br />
with a <code>tail</code> method).</p>
<p>Dispatches to the <code>slice</code> method of the first argument, if present.</p>

**Params**
<p><code>collection</code>: <code>&ast;</code> - The collection to get the tail of</p>

**Returns**
<br /><p><code>&ast;</code> - The tail of the given collection</p>

**Example**
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

### union()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/union.js#L6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.10
<p>Combines two lists into a set (i.e. no duplicates) composed of the elements<br />
of each list.</p>

**Params**
<p><code>firstList</code>: <code>Array</code> - The first list.</p>
<p><code>secondList</code>: <code>Array</code> - The second list.</p>

**Returns**
<br /><p><code>Array</code> - The first and second lists concatenated, with duplicates removed.</p>

**Example**
```js
union([1, 2, 3], [2, 3, 4]) //=> [1, 2, 3, 4]
```
<br /><br />

### values()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/values.js#L9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.12
<p>Returns an array of all the values of the given collection.</p>
<p>Note that the order of the output array is not guaranteed across different JS platforms.</p>
<p>Supports objects, Maps and array like values.</p>
<p>This method supports Promise values. If given a Promise it will return a Promise that will resolve to the values of the resolved value of the Promise.</p>
<p>Dispatches to the <code>values</code> method of the <code>collection</code> if present (except on <code>Map</code>). If a <code>Map</code> is received an array of the <code>Map</code>'s keys will be returned.</p>

**Params**
<p><code>collection</code>: <code>&ast;</code> - The collection to extract values from</p>

**Returns**
<br /><p><code>Array&lt;&ast;&gt;|Promise&lt;Array&lt;&ast;&gt;&gt;</code> - An array of the values of the `collection`</p>

**Example**
```js
values({a: 1, b: 2, c: 3}) //=> [1, 2, 3]
values({}) //=> []

values(['fi', 'fo', 'fum']) //=> [ 'fi', 'fo', 'fum' ]
values([]) //=> []

values('abc') //=> ['a', 'b', 'c']
values('') //=> []

await values(Promise.resolve({ a: 1, b: 2 }) //=> [1, 2]
```
<br /><br />

### walk()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/walk.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Walk using the given walkee and iteratee functions.</p>

**Params**
<p><code>walkee</code>: <code>Function</code> - The function responsible for returning the next value in the walk</p>
<p><code>iteratee</code>: <code>Function</code> - The iterator function.</p>

**Returns**
<br /><p><code>&ast;</code> - The final value returned by the walk</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/walkReduce.js#L27)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Walk reduce using the given reducer function</p>
<p>NOTE: This method will resolve values during the walk before iterating and walking them.</p>

**Params**
<p><code>fn</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.</p>
<p><code>accum</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to walk.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

**Example**
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

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/walkReduceDepthFirst.js#L27)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Walk depth first and reduce using the given reducer function</p>
<p>NOTE: This method will resolve values during the walk before iterating and walking them.</p>

**Params**
<p><code>iteratee</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.</p>
<p><code>accum</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to walk.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

**Example**
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

### walkReducePath()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/data/walkReducePath.js#L19)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Walk reduce the specific path using the given reducer function</p>
<p>NOTE: This method will resolve values during the walk before iterating and walking them.</p>

**Params**
<p><code>path</code>: <code>&ast;</code> - The specific path to walk</p>
<p><code>fn</code>: <code>Function</code> - The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.</p>
<p><code>accum</code>: <code>&ast;</code> - The accumulator value.</p>
<p><code>collection</code>: <code>&ast;</code> - The collection to walk.</p>

**Returns**
<br /><p><code>&ast;</code> - The final, accumulated value.</p>

**Example**
```js
walkReducePath(
  (accum, value, keys) => {
    return accum.push(keys)
  },
  'a.c.d'
  [],
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
//=> [
//   [],
//   ['a'],
//   ['a', 'c'],
//   ['a', 'c', 'd']
// ]
```
<br /><br />

## fetch

### fetch()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/fetch/fetch.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Fetch provides a generic definition of Request and Response objects (and other things involved with network requests). This will allow them to be used wherever they are needed in the future, whether it’s for service workers, Cache API and other similar things that handle or modify requests and responses, or any kind of use case that might require you to generate your own responses programmatically.</p>
<p>See the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a> API docs for more information.</p>
<p>Auto curried with placeholder support</p>

**Params**
<p><code>url</code>: <code>string</code> - </p>

**Returns**
<br /><p><code>Promise&lt;Response&gt;</code> - the web request response</p>

**Example**
```js
const response = await fetch('http://example.com/movies.json')
const data = await response.json()
console.log(JSON.stringify(data))
```
<br /><br />

## ip

### isIp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/ip/isIp.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Determines whether the given value is an IP address</p>

**Params**
<p><code>value</code>: <code>string</code> - The value to check</p>
<p><code>version</code>: <code>string | number</code> - The IP version number &#39;4&#39; or &#39;6&#39;</p>

**Returns**
<br /><p><code>boolean</code> - True if the value is an ip address, otherwise false</p>

**Example**
```js
isIp('255.255.255.0') //=> true
isIp('255.255.255.0', 4) //=> true
isIp('255.255.255.0', 6) //=> false
isIp('2001:db8:abcd:0012:0000:0000:0000:0000') //=> true
isIp('2001:db8:abcd:0012:0000:0000:0000:0000', 4) //=> false
isIp('2001:db8:abcd:0012:0000:0000:0000:0000', 6) //=> true
```
<br /><br />

### lookupIp()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/ip/lookupIp.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Converts an ip address into an location</p>

**Params**
<p><code>ip</code>: <code>string</code> - The ip to lookup</p>

**Returns**
<br /><p><code>{<br />
  city: string,<br />
  country: string,<br />
  countryCode: string,<br />
  ip: string,<br />
  lat: number,<br />
  lng: number,<br />
  postalCode: string,<br />
  region: string,<br />
  regionCode: string,<br />
}</code> - The location</p>

**Example**
```js
await lookupIp('139.130.4.5')
//=> {
//   city: 'Belrose',
//   country: 'Australia',
//   countryCode: 'AU',
//   ip: '139.130.4.5',
//   lat: -33.7333,
//   lng: 151.2167,
//   postalCode: '2085',
//   region: 'New South Wales',
//   regionCode: 'NSW'
// }
```
<br /><br />

## lang

### getProperty()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/lang/getProperty.js#L3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.6
<p>Returns a property descriptor for an own property</p>

**Params**
<p><code>object</code>: <code>object</code> - The object to get the property from</p>
<p><code>prop</code>: <code>string</code> - The prop to get from the object</p>

**Returns**
<br /><p><code>{<br />
  configurable: boolean,<br />
  enumerable: boolean,<br />
  value: &ast;,<br />
  writeable: boolean,<br />
  get: () =&gt; &ast;,<br />
  set: (value) =&gt; undefined<br />
}</code> - The property descriptor</p>

**Example**
```js
const object = { get foo() { return 17 } }
getProperty(o, 'foo')
//=> {
//   configurable: true,
//   enumerable: true,
//   get: foo() { ... },
//   set: undefined
// }
```
<br /><br />

### mix()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/lang/mix.js#L24)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.4
<p>Returns an object with a <code>with</code> method that can be used to mix the given class with mixins</p>

**Params**
<p><code>SuperClass</code>: <code>class</code> - The class that you want the mixins to extend</p>
<p><code>args</code>: <code>...&ast;</code> - Additional arguments to pass to the mixin</p>

**Returns**
<br /><p><code>{<br />
  with: (<br />
    ...mixins: (SuperClass: class, ...args: &ast;) =&gt; class<br />
  ) =&gt; class<br />
}</code> - </p>

**Example**
```js
const mixin = (SuperClass, ...args) => class extends SuperClass { ... }
class mix(Parent, ...args).with(mixin) { ... }
```
<br /><br />

## logic

### and()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/logic/and.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Returns <code>true</code> if both arguments are <code>true</code>; <code>false</code> otherwise.</p>
<p>This method resolves both parameters before executing.</p>
<p>This method will automatically upgrade to async if a Promise is received for either value.</p>

**Params**
<p><code>valueA</code>: <code>&ast;</code> - </p>
<p><code>valueB</code>: <code>&ast;</code> - </p>

**Returns**
<br /><p><code>&ast;</code> - the first argument if it is falsy, otherwise the second argument.</p>

**Example**
```js
and(true, true) //=> true
and(true, false) //=> false
and(false, true) //=> false
and(false, false) //=> false
await and(Promise.resolve(false), false) //=> false
```
<br /><br />

### isEmpty()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/logic/isEmpty.js#L13)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Checks if <code>value</code> is an empty object, collection, map, or set.</p>
<p>Objects are considered empty if they have no own enumerable string keyed<br />
properties.</p>
<p>Array-like values such as <code>arguments</code> objects, arrays, buffers, strings, or</p>
<p>Similarly, maps and sets are considered empty if they have a <code>size</code> of <code>0</code>.</p>
<p>Auto curried for placeholder support.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - The value to check.</p>

**Returns**
<br /><p><code>boolean</code> - Returns `true` if `value` is empty, else `false`.</p>

**Example**
```js
isEmpty(null) // => true

isEmpty(true) // => true

isEmpty(1) // => true

isEmpty([1, 2, 3]) // => false

isEmpty('abc') // => false

isEmpty({ 'a': 1 })  // => false
```
<br /><br />

### not()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/logic/not.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>A function that returns the <code>!</code> of its argument. It will return <code>true</code> when passed false-y value, and <code>false</code> when passed a truth-y one.</p>
<p>Auto curried for placeholder support.</p>

**Params**
<p><code>value</code>: <code>&ast;</code> - Any value</p>

**Returns**
<br /><p><code>boolean</code> - the logical inverse of passed argument.</p>

**Example**
```js
not(true) //=> false
not(false) //=> true
not(0) //=> true
not(1) //=> false
```
<br /><br />

### or()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/logic/or.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.13
<p>Returns <code>true</code> if one or both of its arguments are <code>true</code>. Returns <code>false</code> if both arguments are <code>false</code>.</p>
<p>This method resolves both parameters before executing.</p>
<p>This method will automatically upgrade to async if a Promise is received for either value.</p>

**Params**
<p><code>valueA</code>: <code>&ast;</code> - </p>
<p><code>valueB</code>: <code>&ast;</code> - </p>

**Returns**
<br /><p><code>&ast;</code> - the first argument if truthy, otherwise the second argument.</p>

**Example**
```js
or(true, true) //=> true
or(true, false) //=> true
or(false, true) //=> true
or(false, false) //=> false
await or(Promise.resolve(false), false) //=> false
```
<br /><br />

## path

### findPath()

[source](https://github.com/serverless/utils/tree/v0.0.14/src/path/findPath.js#L7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.0.3
<p>Finds the first path in the given args.</p>

**Params**
<p><code>values</code>: <code>...String</code> - The values to check.</p>

**Returns**
<br /><p><code>String</code> - The first value found that is a path.</p>

**Example**
```js
findPath(null, 0, '/foo', '/bar') // => '/foo'
```
<br /><br />


<!-- AUTO-GENERATED-CONTENT:END -->
