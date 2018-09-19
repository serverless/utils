# API

*NOTES*
* These API docs are still being written. However, we have attempted to stick to the Ramda signature as much as possible for our data methods. So, in most cases, the [ramda documentation](https://ramdajs.com/docs/) is a good point of reference.
* A number of our data methods have async support built in. They will automatically upgrade to async methods when an async iteratee is used.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [data methods](#data-methods)
  * [any()](#any)
  * [anyAtIndex()](#anyatindex)
  * [arrayLikeKeys()](#arraylikekeys)
  * [assoc()](#assoc)
  * [assocIndex()](#associndex)
  * [assocPath()](#assocpath)
  * [assocProp()](#assocprop)
  * [deferredPromise()](#deferredpromise)
  * [find()](#find)
  * [findAtIndex()](#findatindex)
  * [getPath()](#getpath)
  * [getProp()](#getprop)
  * [has()](#has)
  * [hasPath()](#haspath)
  * [hasProp()](#hasprop)
  * [isArguments()](#isarguments)
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
  * [isTypedArray()](#istypedarray)
  * [isUndefined()](#isundefined)
  * [reduce()](#reduce)
- [path methods](#path-methods)
  * [findPath()](#findpath)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (METHODS) -->
## data methods

### any()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/any.js#Lundefined)    since v0.0.3
<p>Returns <code>true</code> if at least one of elements of the collection match the predicate,<br />
<code>false</code> otherwise.</p>
<p>Dispatches to the <code>any</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

*Params*
<code>Function</code>: <p>The predicate function.</p>
<code>*</code>: <p>The collection to consider.</p>

*Returns*
<code>Boolean</code>: <p><code>true</code> if the predicate is satisfied by at least one element, <code>false</code>         otherwise.</p>

*Example*
<pre><code> const lessThan0 = flip(lt)(0)
 const lessThan2 = flip(lt)(2)
 any(lessThan0)([1, 2]) //=&gt; false
 any(lessThan2)([1, 2]) //=&gt; true</code></pre>



### anyAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/anyAtIndex.js#Lundefined)    since v0.0.3
<p>Returns <code>true</code> if at least one of elements of the list match the predicate<br />
starting at the given index, <code>false</code> otherwise.</p>
<p>Dispatches to the <code>anyAtIndex</code> method of the list argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

*Params*
<code>Function</code>: <p>The predicate function.</p>
<a href="Integer.html">Integer</a>: <p>The index to start at.</p>
<code>Array</code>: <p>The array to consider.</p>

*Returns*
<code>Boolean</code>: <p><code>true</code> if the predicate is satisfied by at least one element, <code>false</code>         otherwise.</p>

*Example*
<pre><code> const lessThan0 = flip(lt)(0)
 const lessThan2 = flip(lt)(2)
 any(lessThan0)([1, 2]) //=&gt; false
 any(lessThan2)([1, 2]) //=&gt; true</code></pre>



### arrayLikeKeys()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/arrayLikeKeys.js#Lundefined)    since v0.0.3
<p>Creates an array of the enumerable property names of the array-like <code>value</code>.</p>

*Params*
<code>*</code>: <p>The value to query.</p>
<code>boolean</code>: <p>Specify returning inherited property names.</p>

*Returns*
<code>Array</code>: <p>Returns the array of property names.</p>



### assoc()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assoc.js#Lundefined)    since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the specified<br />
property with the given value. Note that this copies and flattens prototype<br />
properties onto the new object as well. All non-primitive properties are<br />
copied by reference.</p>
<p>Supports path based property selectors 'foo.bar' and functional selectors<br />
which performs an over on the entire collection and sets each matching<br />
selector to the given value.</p>

*Params*
<code>Array</code>|<code>String</code>|<code>Function</code>: <p>The property path to set or functional selector</p>
<code>*</code>: <p>The new value</p>
<code>*</code>: <p>The collection to clone and assign the new value</p>

*Returns*
<code>*</code>: <p>A new collection equivalent to the original except for the changed selector path.</p>

*Example*
<pre><code> assoc('c', 3, {a: 1, b: 2});          //=&gt; {a: 1, b: 2, c: 3}
 assoc('c.d', 3, {a: 1, b: 2});        //=&gt; {a: 1, b: 2, c: { d: 3 }}
 assoc([ 'c', 'd' ], 3, {a: 1, b: 2}); //=&gt; {a: 1, b: 2, c: { d: 3 }}</code></pre>



### assocIndex()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assocIndex.js#Lundefined)    since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

*Params*
<code>number</code>: <p>The index number to set</p>
<code>*</code>: <p>The new value</p>
<code>Array</code>: <p>The array to clone</p>

*Returns*
<code>Array</code>: <p>A new array equivalent to the original except for the changed index.</p>

*Example*
<pre><code> assocIndex(1, 'c', ['a', 'b']) //=&gt; ['a', 'c']</code></pre>



### assocPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assocPath.js#Lundefined)    since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the nodes required<br />
to create the given path, and placing the specific value at the tail end of<br />
that path. Note that this copies and flattens prototype properties onto the<br />
new object as well. All non-primitive properties are copied by reference.</p>

*Params*
<code>Array</code>: <p>the path to set</p>
<code>*</code>: <p>The new value</p>
<code>Object</code>|<code>Array</code>|<a href="Map.html">Map</a>: <p>The object, array or map to clone</p>

*Returns*
<code>*</code>: <p>A new collection equivalent to the original except along the specified path.</p>

*Example*
<pre><code> assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=&gt; {a: {b: {c: 42}}}

 // Any missing or non-object keys in path will be overridden
 assocPath(['a', 0, 'c'], 42, {a: 5}); //=&gt; {a: [{c: 42}]}</code></pre>



### assocProp()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assocProp.js#Lundefined)    since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

*Params*
<code>String</code>: <p>The property name to set</p>
<code>*</code>: <p>The new value</p>
<code>Object</code>|<a href="Map.html">Map</a>: <p>The object to clone</p>

*Returns*
<code>Object</code>: <p>A new object equivalent to the original except for the changed property.</p>

*Example*
<pre><code> assocProp('c', 3, {a: 1, b: 2}); //=&gt; {a: 1, b: 2, c: 3}</code></pre>



### deferredPromise()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/deferredPromise.js#Lundefined)    since v0.0.3
<p>Creates a promise with the resolve and reject methods exposed as properties<br />
on the promise.</p>

*Params*
None

*Returns*
<a href="Promise.html">Promise</a>: <p>The promise with exposed methods</p>

*Example*
<p>const promise = deferredPromise()<br />
// ... do something async then eventually resolve the promise<br />
promise.resolve(someValue)</p>



### find()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/find.js#Lundefined)    since v0.0.3
<p>Returns the first element of the collection which matches the predicate, or<br />
<code>undefined</code> if no element matches.</p>
<p>Dispatches to the <code>find</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

*Params*
<code>Function</code>: <p>The predicate function used to determine if the element is the        desired one.</p>
<code>*</code>: <p>The collection to consider.</p>

*Returns*
<code>Object</code>: <p>The element found, or <code>undefined</code>.</p>

*Example*
<pre><code> const xs = [{a: 1}, {a: 2}, {a: 3}];
 find(propEq('a', 2))(xs); //=&gt; {a: 2}
 find(propEq('a', 4))(xs); //=&gt; undefined</code></pre>



### findAtIndex()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/findAtIndex.js#Lundefined)    since v0.0.3
<p>Returns the first element of the list which matches the predicate, or<br />
<code>undefined</code> if no element matches starting at the given index.</p>
<p>Dispatches to the <code>findAtIndex</code> method of the last argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

*Params*
<code>Function</code>: <p>The predicate function used to determine if the element is the        desired one.</p>
<a href="Integer.html">Integer</a>: <p>The index to start at.</p>
<code>Array</code>: <p>The array to consider.</p>

*Returns*
<code>*</code>: <p>The element found, or <code>undefined</code>.</p>

*Example*
<pre><code> const xs = [{a: 1}, {a: 2}, {a: 3}];
 findAtIndex(propEq('a'), 0)(xs) //=&gt; {a: 2}
 findAtIndex(propEq('a', 2), 2)(xs) //=&gt; undefined</code></pre>



### getPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/getPath.js#Lundefined)    since v0.0.3
<p>Retrieve the value at a given path.</p>

*Params*
<code>Array</code>: <p>The path to use.</p>
<code>Object</code>: <p>The object to retrieve the nested property from.</p>

*Returns*
<code>*</code>: <p>The data at <code>path</code>.</p>

*Example*
<pre><code> getPath(['a', 'b'], {a: {b: 2}}); //=&gt; 2
 getPath(['a', 'b'], {c: {b: 2}}); //=&gt; undefined</code></pre>



### getProp()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/getProp.js#Lundefined)    since v0.0.3
<p>Returns a function that when supplied an object returns the indicated<br />
property of that object, if it exists.</p>

*Params*
<code>String</code>: <p>The property name</p>
<code>Object</code>: <p>The object to query</p>

*Returns*
<code>*</code>: <p>The value at <code>obj.p</code>.</p>

*Example*
<pre><code> getProp('x', {x: 100}); //=&gt; 100
 getProp('x', {});       //=&gt; undefined</code></pre>



### has()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/has.js#Lundefined)    since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

*Params*
<code>Array</code>|<code>String</code>: <p>The selector to use.</p>
<code>Object</code>: <p>The value to check the path in.</p>

*Returns*
<code>Boolean</code>: <p>Whether the selector exists.</p>

*Example*
<pre><code> has(['a', 'b'], {a: {b: 2}})          // =&gt; true
 has(['a', 'b'], {a: {b: undefined}})  // =&gt; true
 has('a.b', {a: {c: 2}})               // =&gt; false
 has([], {})                           // =&gt; true</code></pre>



### hasPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/hasPath.js#Lundefined)    since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

*Params*
<code>Array</code>: <p>The path to use.</p>
<code>Object</code>: <p>The object to check the path in.</p>

*Returns*
<code>Boolean</code>: <p>Whether the path exists.</p>

*Example*
<pre><code> has(['a', 'b'], {a: {b: 2}})          // =&gt; true
 has(['a', 'b'], {a: {b: undefined}})  // =&gt; true
 has('a.b', {a: {c: 2}})               // =&gt; false
 hasPath([], {})                           // =&gt; true</code></pre>



### hasProp()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/hasProp.js#Lundefined)    since v0.0.3
<p>Returns whether or not an object has an own property with the specified name</p>
<p>If prop is a function then it is executed against value as a selector.<br />
If prop is undefined then value will be checked for truthiness.</p>

*Params*
<code>String</code>|<code>Function</code>: <p>The name of the property to check for.</p>
<code>Object</code>|<a href="Map.html">Map</a>: <p>The value to query.</p>

*Returns*
<code>Boolean</code>: <p>Whether the property exists.</p>

*Example*
<pre><code> hasProp('name', {name: 'philipp'})  //=&gt; true
 hasProp('name', {})                 //=&gt; false

 hasProp(undefined, {})            //=&gt; true
 hasProp(undefined, null)          //=&gt; false

 hasProp((value) =&gt; value.name, { name: 'eslam'})     //=&gt; true
 hasProp((value) =&gt; value.birthday, { name: 'raees'}) //=&gt; false</code></pre>



### isArguments()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isArguments.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is likely an <code>arguments</code> object.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is an <code>arguments</code> object, else <code>false</code>.</p>

*Example*
<p>isArguments(function() { return arguments }())<br />
// =&gt; true</p>
<p>isArguments([1, 2, 3])<br />
// =&gt; false</p>



### isArrayLike()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isArrayLike.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is array-like. A value is considered array-like if it's<br />
not a function and has a <code>value.length</code> that's an integer greater than or<br />
equal to <code>0</code> and less than or equal to <code>Number.MAX_SAFE_INTEGER</code>.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is array-like, else <code>false</code>.</p>

*Example*
<p>isArrayLike([1, 2, 3])<br />
// =&gt; true</p>
<p>isArrayLike(document.body.children)<br />
// =&gt; true</p>
<p>isArrayLike('abc')<br />
// =&gt; true</p>
<p>isArrayLike(Function)<br />
// =&gt; false</p>



### isBuffer()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isBuffer.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is a buffer.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a buffer, else <code>false</code>.</p>

*Example*
<p>isBuffer(new Buffer(2))<br />
// =&gt; true</p>
<p>isBuffer(new Uint8Array(2))<br />
// =&gt; false</p>



### isEmpty()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isEmpty.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is an empty object, collection, map, or set.</p>
<p>Objects are considered empty if they have no own enumerable string keyed<br />
properties.</p>
<p>Array-like values such as <code>arguments</code> objects, arrays, buffers, strings, or<br />
jQuery-like collections are considered empty if they have a <code>length</code> of <code>0</code>.<br />
Similarly, maps and sets are considered empty if they have a <code>size</code> of <code>0</code>.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is empty, else <code>false</code>.</p>

*Example*
<p>isEmpty(null)<br />
// =&gt; true</p>
<p>isEmpty(true)<br />
// =&gt; true</p>
<p>isEmpty(1)<br />
// =&gt; true</p>
<p>isEmpty([1, 2, 3])<br />
// =&gt; false</p>
<p>isEmpty('abc')<br />
// =&gt; false</p>
<p>isEmpty({ 'a': 1 })<br />
// =&gt; false</p>



### isFunction()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isFunction.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Function</code> object.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a function, else <code>false</code>.</p>

*Example*
<p>isFunction(function() {})<br />
// =&gt; true</p>
<p>isFunction(/abc/)<br />
// =&gt; false</p>



### isGenerator()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isGenerator.js#Lundefined)    since v0.0.3
<p>Checks whether the given value is a generator.</p>

*Params*
<code>*</code>: 

*Returns*
<code>Boolean</code>: 

*Example*
<p>isGenerator((function*() {})())  //=&gt; true<br />
isGenerator((function() {})())   //=&gt; false<br />
isGenerator({<br />
next: () =&gt; {},<br />
throw: () =&gt; {}<br />
})  //=&gt; true</p>



### isGeneratorFunction()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isGeneratorFunction.js#Lundefined)    since v0.0.3
<p>Checks whether a function is generator function.</p>

*Params*
<code>*</code>: 

*Returns*
<code>Boolean</code>: 

*Example*
<p>isGeneratorFunction(function*() {})  //=&gt; true<br />
isGeneratorFunction(function() {})   //=&gt; false</p>



### isIndex()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isIndex.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is a valid array-like index.</p>

*Params*
<code>*</code>: <p>The value to check.</p>
<code>number</code>: <p>The upper bounds of a valid index.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a valid index, else <code>false</code>.</p>



### isInteger()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isInteger.js#Lundefined)    since v0.0.3
<p>Determine if the passed argument is an integer.</p>

*Params*
<code>*</code>: 

*Returns*
<code>Boolean</code>: 



### isMap()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isMap.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Map</code> object.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a map, else <code>false</code>.</p>

*Example*
<p>isMap(new Map)<br />
// =&gt; true</p>
<p>isMap(new WeakMap)<br />
// =&gt; false</p>



### isNil()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isNil.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is <code>null</code> or <code>undefined</code>.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is nullish, else <code>false</code>.</p>

*Example*
<p>isNil(null)<br />
// =&gt; true</p>
<p>isNil(void 0)<br />
// =&gt; true</p>
<p>isNil(NaN)<br />
// =&gt; false</p>



### isNull()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isNull.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is <code>null</code>.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is <code>null</code>, else <code>false</code>.</p>

*Example*
<p>isNull(null)<br />
// =&gt; true</p>
<p>isNull(void 0)<br />
// =&gt; false</p>



### isNumber()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isNumber.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Number</code> primitive or object.</p>
<p><strong>Note:</strong> To exclude <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code>, which are<br />
classified as numbers, use the <code>Number.isFinite</code> method.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a number, else <code>false</code>.</p>

*Example*
<p>isNumber(3)<br />
// =&gt; true</p>
<p>isNumber(Number.MIN_VALUE)<br />
// =&gt; true</p>
<p>isNumber(Infinity)<br />
// =&gt; true</p>
<p>isNumber('3')<br />
// =&gt; false</p>



### isObject()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isObject.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is the<br />
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types">language type</a><br />
of <code>Object</code>. (e.g. arrays, functions, objects, regexes, <code>new Number(0)</code>, and <code>new String('')</code>)</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is an object, else <code>false</code>.</p>

*Example*
<p>isObject({}) // =&gt; true</p>
<p>isObject([1, 2, 3]) // =&gt; true</p>
<p>isObject(Function) // =&gt; true</p>
<p>isObject(null) // =&gt; false</p>



### isObjectLike()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isObjectLike.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is object-like. A value is object-like if it's not <code>null</code><br />
and has a <code>typeof</code> result of &quot;object&quot;.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is object-like, else <code>false</code>.</p>

*Example*
<p>isObjectLike({})<br />
// =&gt; true</p>
<p>isObjectLike([1, 2, 3])<br />
// =&gt; true</p>
<p>isObjectLike(Function)<br />
// =&gt; false</p>
<p>isObjectLike(null)<br />
// =&gt; false</p>



### isPlainObject()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isPlainObject.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is a plain object, that is, an object created by the<br />
<code>Object</code> constructor or one with a <code>[[Prototype]]</code> of <code>null</code>.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a plain object, else <code>false</code>.</p>

*Example*
<p>function Foo() {<br />
this.a = 1<br />
}</p>
<p>isPlainObject(new Foo)<br />
// =&gt; false</p>
<p>isPlainObject([1, 2, 3])<br />
// =&gt; false</p>
<p>isPlainObject({ 'x': 0, 'y': 0 })<br />
// =&gt; true</p>
<p>isPlainObject(Object.create(null))<br />
// =&gt; true</p>



### isPromise()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isPromise.js#Lundefined)    since v0.0.3
<p>Checks whether the given value is a Promise.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a Promise, else <code>false</code>.</p>

*Example*
<p>isPromise(new Promise(() =&gt; {})) //=&gt; true</p>
<p>isPromise({}) //=&gt; false</p>
<p>isPromise({ then: () =&gt; {} }) //=&gt; true</p>



### isPrototype()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isPrototype.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is likely a prototype object.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a prototype, else <code>false</code>.</p>



### isString()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isString.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>String</code> primitive or object.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a string, else <code>false</code>.</p>

*Example*
<p>isString('abc') // =&gt; true</p>
<p>isString(1) // =&gt; false</p>



### isSymbol()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isSymbol.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Symbol</code> primitive or object.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a symbol, else <code>false</code>.</p>

*Example*
<p>isSymbol(Symbol.iterator) // =&gt; true</p>
<p>isSymbol('abc') // =&gt; false</p>



### isTypedArray()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isTypedArray.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a typed array.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is a typed array, else <code>false</code>.</p>

*Example*
<p>isTypedArray(new Uint8Array)<br />
// =&gt; true</p>
<p>isTypedArray([])<br />
// =&gt; false</p>



### isUndefined()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isUndefined.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is <code>undefined</code>.</p>

*Params*
<code>*</code>: <p>The value to check.</p>

*Returns*
<code>boolean</code>: <p>Returns <code>true</code> if <code>value</code> is <code>undefined</code>, else <code>false</code>.</p>

*Example*
<p>isUndefined(void 0)<br />
// =&gt; true</p>
<p>isUndefined(null)<br />
// =&gt; false</p>



### reduce()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/reduce.js#Lundefined)    since v0.1.0
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

*Params*
<code>Function</code>: <p>The iterator function. Receives two values, the accumulator and the        current element from the array.</p>
<code>*</code>: <p>The accumulator value.</p>
<code>Array</code>: <p>The list to iterate over.</p>

*Returns*
<code>*</code>: <p>The final, accumulated value.</p>

*Example*
<pre><code> reduce(subtract, 0, [1, 2, 3, 4]) // =&gt; ((((0 - 1) - 2) - 3) - 4) = -10
 //          -               -10
 //         / \              / \
 //        -   4           -6   4
 //       / \              / \
 //      -   3   ==&gt;     -3   3
 //     / \              / \
 //    -   2           -1   2
 //   / \              / \
 //  0   1            0   1</code></pre>



## path methods

### findPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/path/findPath.js#Lundefined)    since v0.0.3
<p>Finds the first path in the given args.</p>

*Params*
...<code>String</code>: <p>The values to check.</p>

*Returns*
<code>String</code>: <p>The first value found that is a path.</p>

*Example*
<p>findPath(null, 0, '/foo', '/bar')        // =&gt; '/foo'</p>




<!-- AUTO-GENERATED-CONTENT:END -->
