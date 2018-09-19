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

<b>Params</b><br />
<p><code>Function</code>: The predicate function.</p>
<p><code>&ast;</code>: The collection to consider.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: <code>true</code> if the predicate is satisfied by at least one element, <code>false</code>         otherwise.</p>

<b>Example</b><br />
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

<b>Params</b><br />
<p><code>Function</code>: The predicate function.</p>
<p><code>Integer</code>: The index to start at.</p>
<p><code>Array</code>: The array to consider.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: <code>true</code> if the predicate is satisfied by at least one element, <code>false</code>         otherwise.</p>

<b>Example</b><br />
<pre><code> const lessThan0 = flip(lt)(0)
 const lessThan2 = flip(lt)(2)
 any(lessThan0)([1, 2]) //=&gt; false
 any(lessThan2)([1, 2]) //=&gt; true</code></pre>



### arrayLikeKeys()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/arrayLikeKeys.js#Lundefined)    since v0.0.3
<p>Creates an array of the enumerable property names of the array-like <code>value</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to query.</p>
<p><code>boolean</code>: Specify returning inherited property names.</p>

<b>Returns</b><br />
<p><code>Array</code>: Returns the array of property names.</p>



### assoc()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assoc.js#Lundefined)    since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the specified<br />
property with the given value. Note that this copies and flattens prototype<br />
properties onto the new object as well. All non-primitive properties are<br />
copied by reference.</p>
<p>Supports path based property selectors 'foo.bar' and functional selectors<br />
which performs an over on the entire collection and sets each matching<br />
selector to the given value.</p>

<b>Params</b><br />
<p><code>Array</code>|<code>String</code>|<code>Function</code>: The property path to set or functional selector</p>
<p><code>&ast;</code>: The new value</p>
<p><code>&ast;</code>: The collection to clone and assign the new value</p>

<b>Returns</b><br />
<p><code>&ast;</code>: A new collection equivalent to the original except for the changed selector path.</p>

<b>Example</b><br />
<pre><code> assoc('c', 3, {a: 1, b: 2});          //=&gt; {a: 1, b: 2, c: 3}
 assoc('c.d', 3, {a: 1, b: 2});        //=&gt; {a: 1, b: 2, c: { d: 3 }}
 assoc([ 'c', 'd' ], 3, {a: 1, b: 2}); //=&gt; {a: 1, b: 2, c: { d: 3 }}</code></pre>



### assocIndex()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assocIndex.js#Lundefined)    since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

<b>Params</b><br />
<p><code>number</code>: The index number to set</p>
<p><code>&ast;</code>: The new value</p>
<p><code>Array</code>: The array to clone</p>

<b>Returns</b><br />
<p><code>Array</code>: A new array equivalent to the original except for the changed index.</p>

<b>Example</b><br />
<pre><code> assocIndex(1, 'c', ['a', 'b']) //=&gt; ['a', 'c']</code></pre>



### assocPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assocPath.js#Lundefined)    since v0.0.3
<p>Makes a shallow clone of an object, setting or overriding the nodes required<br />
to create the given path, and placing the specific value at the tail end of<br />
that path. Note that this copies and flattens prototype properties onto the<br />
new object as well. All non-primitive properties are copied by reference.</p>

<b>Params</b><br />
<p><code>Array</code>: the path to set</p>
<p><code>&ast;</code>: The new value</p>
<p><code>Object</code>|<code>Array</code>|<code>Map</code>: The object, array or map to clone</p>

<b>Returns</b><br />
<p><code>&ast;</code>: A new collection equivalent to the original except along the specified path.</p>

<b>Example</b><br />
<pre><code> assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=&gt; {a: {b: {c: 42}}}

 // Any missing or non-object keys in path will be overridden
 assocPath(['a', 0, 'c'], 42, {a: 5}); //=&gt; {a: [{c: 42}]}</code></pre>



### assocProp()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/assocProp.js#Lundefined)    since v0.0.3
<p>Returns the result of &quot;setting&quot; the portion of the given data structure<br />
focused by the given lens to the given value.</p>

<b>Params</b><br />
<p><code>String</code>: The property name to set</p>
<p><code>&ast;</code>: The new value</p>
<p><code>Object</code>|<code>Map</code>: The object to clone</p>

<b>Returns</b><br />
<p><code>Object</code>: A new object equivalent to the original except for the changed property.</p>

<b>Example</b><br />
<pre><code> assocProp('c', 3, {a: 1, b: 2}); //=&gt; {a: 1, b: 2, c: 3}</code></pre>



### deferredPromise()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/deferredPromise.js#Lundefined)    since v0.0.3
<p>Creates a promise with the resolve and reject methods exposed as properties<br />
on the promise.</p>

<b>Params</b><br />
None

<b>Returns</b><br />
<p><code>Promise</code>: The promise with exposed methods</p>

<b>Example</b><br />
<pre><code> const promise = deferredPromise()
 // ... do something async then eventually resolve the promise
 promise.resolve(someValue)</code></pre>



### find()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/find.js#Lundefined)    since v0.0.3
<p>Returns the first element of the collection which matches the predicate, or<br />
<code>undefined</code> if no element matches.</p>
<p>Dispatches to the <code>find</code> method of the collection argument, if present.</p>
<p>Supports async predicates. If a predicate returns a Promise than the entire<br />
method will upgrade to async and return a Promise.</p>

<b>Params</b><br />
<p><code>Function</code>: The predicate function used to determine if the element is the        desired one.</p>
<p><code>&ast;</code>: The collection to consider.</p>

<b>Returns</b><br />
<p><code>Object</code>: The element found, or <code>undefined</code>.</p>

<b>Example</b><br />
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

<b>Params</b><br />
<p><code>Function</code>: The predicate function used to determine if the element is the        desired one.</p>
<p><code>Integer</code>: The index to start at.</p>
<p><code>Array</code>: The array to consider.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The element found, or <code>undefined</code>.</p>

<b>Example</b><br />
<pre><code> const xs = [{a: 1}, {a: 2}, {a: 3}];
 findAtIndex(propEq('a'), 0)(xs) //=&gt; {a: 2}
 findAtIndex(propEq('a', 2), 2)(xs) //=&gt; undefined</code></pre>



### getPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/getPath.js#Lundefined)    since v0.0.3
<p>Retrieve the value at a given path.</p>

<b>Params</b><br />
<p><code>Array</code>: The path to use.</p>
<p><code>Object</code>: The object to retrieve the nested property from.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The data at <code>path</code>.</p>

<b>Example</b><br />
<pre><code> getPath(['a', 'b'], {a: {b: 2}}); //=&gt; 2
 getPath(['a', 'b'], {c: {b: 2}}); //=&gt; undefined</code></pre>



### getProp()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/getProp.js#Lundefined)    since v0.0.3
<p>Returns a function that when supplied an object returns the indicated<br />
property of that object, if it exists.</p>

<b>Params</b><br />
<p><code>String</code>: The property name</p>
<p><code>Object</code>: The object to query</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The value at <code>obj.p</code>.</p>

<b>Example</b><br />
<pre><code> getProp('x', {x: 100}); //=&gt; 100
 getProp('x', {});       //=&gt; undefined</code></pre>



### has()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/has.js#Lundefined)    since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

<b>Params</b><br />
<p><code>Array</code>|<code>String</code>: The selector to use.</p>
<p><code>Object</code>: The value to check the path in.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: Whether the selector exists.</p>

<b>Example</b><br />
<pre><code> has(['a', 'b'], {a: {b: 2}})          // =&gt; true
 has(['a', 'b'], {a: {b: undefined}})  // =&gt; true
 has('a.b', {a: {c: 2}})               // =&gt; false
 has([], {})                           // =&gt; true</code></pre>



### hasPath()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/hasPath.js#Lundefined)    since v0.0.3
<p>Returns whether or not a path exists in an object. Only the object's<br />
own properties are checked.</p>

<b>Params</b><br />
<p><code>Array</code>: The path to use.</p>
<p><code>Object</code>: The object to check the path in.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: Whether the path exists.</p>

<b>Example</b><br />
<pre><code> has(['a', 'b'], {a: {b: 2}})          // =&gt; true
 has(['a', 'b'], {a: {b: undefined}})  // =&gt; true
 has('a.b', {a: {c: 2}})               // =&gt; false
 hasPath([], {})                           // =&gt; true</code></pre>



### hasProp()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/hasProp.js#Lundefined)    since v0.0.3
<p>Returns whether or not an object has an own property with the specified name</p>
<p>If prop is a function then it is executed against value as a selector.<br />
If prop is undefined then value will be checked for truthiness.</p>

<b>Params</b><br />
<p><code>String</code>|<code>Function</code>: The name of the property to check for.</p>
<p><code>Object</code>|<code>map</code>: The value to query.</p>

<b>Returns</b><br />
<p><code>Boolean</code>: Whether the property exists.</p>

<b>Example</b><br />
<pre><code> hasProp('name', {name: 'philipp'})  //=&gt; true
 hasProp('name', {})                 //=&gt; false

 hasProp(undefined, {})            //=&gt; true
 hasProp(undefined, null)          //=&gt; false

 hasProp((value) =&gt; value.name, { name: 'eslam'})     //=&gt; true
 hasProp((value) =&gt; value.birthday, { name: 'raees'}) //=&gt; false</code></pre>



### isArguments()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isArguments.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is likely an <code>arguments</code> object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is an <code>arguments</code> object, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isArguments(function() { return arguments }()) // =&gt; true

 isArguments([1, 2, 3]) // =&gt; false</code></pre>



### isArray()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isArray.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as an <code>Array</code> object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is an array, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isArray([1, 2, 3]) // =&gt; true

 isArray(document.body.children) // =&gt; false

 isArray('abc') // =&gt; false

 isArray(noop) // =&gt; false</code></pre>



### isArrayLike()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isArrayLike.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is array-like. A value is considered array-like if it's<br />
not a function and has a <code>value.length</code> that's an integer greater than or<br />
equal to <code>0</code> and less than or equal to <code>Number.MAX_SAFE_INTEGER</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is array-like, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isArrayLike([1, 2, 3]) // =&gt; true

 isArrayLike(document.body.children) // =&gt; true

 isArrayLike('abc') // =&gt; true

 isArrayLike(Function) // =&gt; false</code></pre>



### isBuffer()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isBuffer.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is a buffer.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a buffer, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isBuffer(new Buffer(2)) // =&gt; true

 isBuffer(new Uint8Array(2)) // =&gt; false</code></pre>



### isEmpty()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isEmpty.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is an empty object, collection, map, or set.</p>
<p>Objects are considered empty if they have no own enumerable string keyed<br />
properties.</p>
<p>Array-like values such as <code>arguments</code> objects, arrays, buffers, strings, or<br />
jQuery-like collections are considered empty if they have a <code>length</code> of <code>0</code>.<br />
Similarly, maps and sets are considered empty if they have a <code>size</code> of <code>0</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is empty, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isEmpty(null) // =&gt; true

 isEmpty(true) // =&gt; true

 isEmpty(1) // =&gt; true

 isEmpty([1, 2, 3]) // =&gt; false

 isEmpty('abc') // =&gt; false

 isEmpty({ 'a': 1 })  // =&gt; false</code></pre>



### isFunction()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isFunction.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Function</code> object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a function, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isFunction(function() {}) // =&gt; true

 isFunction(/abc/) // =&gt; false</code></pre>



### isGenerator()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isGenerator.js#Lundefined)    since v0.0.3
<p>Checks whether the given value is a generator.</p>

<b>Params</b><br />
<p><code>&ast;</code>: 

<b>Returns</b><br />
<p><code>Boolean</code>: 

<b>Example</b><br />
<pre><code> isGenerator((function*() {})())  //=&gt; true
 isGenerator((function() {})())   //=&gt; false
 isGenerator({
   next: () =&gt; {},
   throw: () =&gt; {}
 })  //=&gt; true</code></pre>



### isGeneratorFunction()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isGeneratorFunction.js#Lundefined)    since v0.0.3
<p>Checks whether a function is generator function.</p>

<b>Params</b><br />
<p><code>&ast;</code>: 

<b>Returns</b><br />
<p><code>Boolean</code>: 

<b>Example</b><br />
<pre><code> isGeneratorFunction(function*() {})  //=&gt; true
 isGeneratorFunction(function() {})   //=&gt; false</code></pre>



### isIndex()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isIndex.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is a valid array-like index.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>
<p><code>number</code>: The upper bounds of a valid index.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a valid index, else <code>false</code>.</p>



### isInteger()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isInteger.js#Lundefined)    since v0.0.3
<p>Determine if the passed argument is an integer.</p>

<b>Params</b><br />
<p><code>&ast;</code>: 

<b>Returns</b><br />
<p><code>Boolean</code>: 



### isMap()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isMap.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Map</code> object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a map, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isMap(new Map) // =&gt; true

 isMap(new WeakMap) // =&gt; false</code></pre>



### isNil()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isNil.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is <code>null</code> or <code>undefined</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is nullish, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isNil(null) // =&gt; true

 isNil(void 0) // =&gt; true

 isNil(NaN) // =&gt; false</code></pre>



### isNull()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isNull.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is <code>null</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is <code>null</code>, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isNull(null) // =&gt; true

 isNull(void 0) // =&gt; false</code></pre>



### isNumber()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isNumber.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is classified as a <code>Number</code> primitive or object.</p>
<p><strong>Note:</strong> To exclude <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code>, which are<br />
classified as numbers, use the <code>Number.isFinite</code> method.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a number, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isNumber(3) // =&gt; true

 isNumber(Number.MIN_VALUE) // =&gt; true

 isNumber(Infinity) // =&gt; true

 isNumber('3') // =&gt; false</code></pre>



### isObject()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isObject.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is the<br />
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types">language type</a><br />
of <code>Object</code>. (e.g. arrays, functions, objects, regexes, <code>new Number(0)</code>, and <code>new String('')</code>)</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is an object, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isObject({}) // =&gt; true

 isObject([1, 2, 3]) // =&gt; true

 isObject(Function) // =&gt; true

 isObject(null) // =&gt; false</code></pre>



### isObjectLike()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isObjectLike.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is object-like. A value is object-like if it's not <code>null</code><br />
and has a <code>typeof</code> result of &quot;object&quot;.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is object-like, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isObjectLike({}) // =&gt; true

 isObjectLike([1, 2, 3]) // =&gt; true

 isObjectLike(Function) // =&gt; false

 isObjectLike(null) // =&gt; false</code></pre>



### isPlainObject()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isPlainObject.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is a plain object, that is, an object created by the<br />
<code>Object</code> constructor or one with a <code>[[Prototype]]</code> of <code>null</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a plain object, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> function Foo() {
   this.a = 1
 }

 isPlainObject(new Foo) // =&gt; false

 isPlainObject([1, 2, 3]) // =&gt; false

 isPlainObject({ 'x': 0, 'y': 0 }) // =&gt; true

 isPlainObject(Object.create(null)) // =&gt; true</code></pre>



### isPromise()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isPromise.js#Lundefined)    since v0.0.3
<p>Checks whether the given value is a Promise.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a Promise, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isPromise(new Promise(() =&gt; {})) //=&gt; true

 isPromise({}) //=&gt; false

 isPromise({ then: () =&gt; {} }) //=&gt; true</code></pre>



### isPrototype()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isPrototype.js#Lundefined)    since v0.0.3
<p>Checks if <code>value</code> is likely a prototype object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a prototype, else <code>false</code>.</p>



### isString()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isString.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>String</code> primitive or object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a string, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isString('abc') // =&gt; true

 isString(1) // =&gt; false</code></pre>



### isSymbol()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isSymbol.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a <code>Symbol</code> primitive or object.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a symbol, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isSymbol(Symbol.iterator) // =&gt; true

 isSymbol('abc') // =&gt; false</code></pre>



### isTypedArray()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isTypedArray.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is classified as a typed array.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is a typed array, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isTypedArray(new Uint8Array) // =&gt; true

 isTypedArray([]) // =&gt; false</code></pre>



### isUndefined()

[source](https://github.com/serverless/utils/tree/v0.0.2/src/data/isUndefined.js#Lundefined)    since 0.3.0
<p>Checks if <code>value</code> is <code>undefined</code>.</p>

<b>Params</b><br />
<p><code>&ast;</code>: The value to check.</p>

<b>Returns</b><br />
<p><code>boolean</code>: Returns <code>true</code> if <code>value</code> is <code>undefined</code>, else <code>false</code>.</p>

<b>Example</b><br />
<pre><code> isUndefined(void 0) // =&gt; true

 isUndefined(null) // =&gt; false</code></pre>



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

<b>Params</b><br />
<p><code>Function</code>: The iterator function. Receives two values, the accumulator and the        current element from the array.</p>
<p><code>&ast;</code>: The accumulator value.</p>
<p><code>Array</code>: The list to iterate over.</p>

<b>Returns</b><br />
<p><code>&ast;</code>: The final, accumulated value.</p>

<b>Example</b><br />
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

<b>Params</b><br />
<p>...<code>String</code>: The values to check.</p>

<b>Returns</b><br />
<p><code>String</code>: The first value found that is a path.</p>

<b>Example</b><br />
<pre><code> findPath(null, 0, '/foo', '/bar') // =&gt; '/foo'</code></pre>




<!-- AUTO-GENERATED-CONTENT:END -->
