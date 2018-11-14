import equals from './equals'

describe('equals', () => {
  test('NaN is equal to NaN', () => {
    expect(equals(NaN, NaN)).toBe(true)
    expect(equals(new Number(NaN), NaN)).toBe(true)
    expect(equals(NaN, new Number(NaN))).toBe(true)
    expect(equals(new Number(NaN), new Number(NaN))).toBe(true)
  })

  it('tests for deep equality of its operands', () => {
    const valueA = []
    const valueB = valueA
    expect(equals(100, 100)).toBe(true)
    expect(equals(100, '100')).toBe(false)
    expect(equals([], [])).toBe(true)
    expect(equals(valueA, valueB)).toBe(true)
  })

  it('considers equal Boolean primitives equal', () => {
    expect(equals(true, true)).toBe(true)
    expect(equals(false, false)).toBe(true)
    expect(equals(true, false)).toBe(false)
    expect(equals(false, true)).toBe(false)
  })

  it('considers equivalent Boolean objects equal', () => {
    expect(equals(new Boolean(true), new Boolean(true))).toBe(true)
    expect(equals(new Boolean(false), new Boolean(false))).toBe(true)
    expect(equals(new Boolean(true), new Boolean(false))).toBe(false)
    expect(equals(new Boolean(false), new Boolean(true))).toBe(false)
  })

  it('considers Boolean primitive equal to Boolean object', () => {
    expect(equals(true, new Boolean(true))).toBe(true)
    expect(equals(new Boolean(true), true)).toBe(true)
    expect(equals(false, new Boolean(false))).toBe(true)
    expect(equals(new Boolean(false), false)).toBe(true)
  })

  it('considers equal number primitives equal', () => {
    expect(equals(0, 0)).toBe(true)
    expect(equals(0, 1)).toBe(false)
    expect(equals(1, 0)).toBe(false)
  })

  it('considers equivalent Number objects equal', () => {
    expect(equals(new Number(0), new Number(0))).toBe(true)
    expect(equals(new Number(0), new Number(1))).toBe(false)
    expect(equals(new Number(1), new Number(0))).toBe(false)
  })

  it('considers number primitive equal to Number object', () => {
    expect(equals(0, new Number(0))).toBe(true)
    expect(equals(new Number(0), 0)).toBe(true)
  })

  it('considers equal string primitives equal', () => {
    expect(equals('', '')).toBe(true)
    expect(equals('', 'x')).toBe(false)
    expect(equals('x', '')).toBe(false)
    expect(equals('foo', 'foo')).toBe(true)
    expect(equals('foo', 'bar')).toBe(false)
    expect(equals('bar', 'foo')).toBe(false)
  })

  it('considers equivalent String objects equal', () => {
    expect(equals(new String(''), new String(''))).toBe(true)
    expect(equals(new String(''), new String('x'))).toBe(false)
    expect(equals(new String('x'), new String(''))).toBe(false)
    expect(equals(new String('foo'), new String('foo'))).toBe(true)
    expect(equals(new String('foo'), new String('bar'))).toBe(false)
    expect(equals(new String('bar'), new String('foo'))).toBe(false)
  })

  it('never considers string primitive equal to String object', () => {
    expect(equals('', new String(''))).toBe(true)
    expect(equals(new String(''), '')).toBe(true)
    expect(equals('x', new String('x'))).toBe(true)
    expect(equals(new String('x'), 'x')).toBe(true)
  })

  it('handles objects', () => {
    expect(equals({}, {})).toBe(true)
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    expect(equals({ a: 2, b: 3 }, { b: 3, a: 2 })).toBe(true)
    expect(equals({ a: 2, b: 3 }, { a: 3, b: 3 })).toBe(false)
    expect(equals({ a: 2, b: 3, c: 1 }, { a: 2, b: 3 })).toBe(false)
  })

  it('considers equivalent Arguments objects equal', () => {
    const argsA = (function() {
      return arguments
    })()
    const argsB = (function() {
      return arguments
    })()
    const argsC = (function() {
      return arguments
    })(1, 2, 3)
    const argsD = (function() {
      return arguments
    })(1, 2, 3)

    expect(equals(argsA, argsB)).toBe(true)
    expect(equals(argsB, argsA)).toBe(true)
    expect(equals(argsC, argsD)).toBe(true)
    expect(equals(argsD, argsC)).toBe(true)
    expect(equals(argsA, argsC)).toBe(false)
    expect(equals(argsC, argsA)).toBe(false)
  })

  it('considers equivalent Error objects equal', () => {
    expect(equals(new Error('XXX'), new Error('XXX'))).toBe(true)
    expect(equals(new Error('XXX'), new Error('YYY'))).toBe(false)
    expect(equals(new Error('XXX'), new TypeError('XXX'))).toBe(false)
    expect(equals(new Error('XXX'), new TypeError('YYY'))).toBe(false)
  })

  it('handles regex', () => {
    expect(equals(/\s/, /\s/)).toBe(true)
    expect(equals(/\s/, /\d/)).toBe(false)
    expect(equals(/a/gi, /a/gi)).toBe(true)
    expect(equals(/a/gim, /a/gim)).toBe(true)
    expect(equals(/a/gi, /a/i)).toBe(false)
  })

  it('handles lists', () => {
    expect(equals([], {})).toBe(false)
    expect(equals([1, 2, 3], [1, 3, 2])).toBe(false)
    expect(equals([1, 2, 3], [1, 2, 3, 4])).toBe(false)
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('handles recursive data structures', () => {
    const valueC = {}
    valueC.v = valueC
    const valueD = {}
    valueD.v = valueD
    const valueE = []
    valueE.push(valueE)
    const valueF = []
    valueF.push(valueF)
    expect(equals(valueC, valueD)).toBe(true)
    expect(equals(valueE, valueF)).toBe(true)
  })

  it('handles recursive data structures', () => {
    expect(equals({ a: [1, 2, { c: 1 }], b: 1 }, { a: [1, 2, { c: 1 }], b: 1 })).toBe(true)
    expect(equals({ a: [1, 2, { c: 1 }], b: 1 }, { a: [1, 2, { c: 2 }], b: 1 })).toBe(false)
  })

  it('handles dates', () => {
    expect(equals(new Date(0), new Date(0))).toBe(true)
    expect(equals(new Date(1), new Date(1))).toBe(true)
    expect(equals(new Date(0), new Date(1))).toBe(false)
    expect(equals(new Date(1), new Date(0))).toBe(false)
  })

  it('requires that both objects have the same enumerable properties with the same values', () => {
    const a1 = []
    const a2 = []
    a2.x = 0

    expect(equals(a1, a2)).toBe(false)

    const b1 = new Boolean(false)
    const b2 = new Boolean(false)
    b2.x = 0
    expect(equals(b1, b2)).toBe(false)

    const d1 = new Date(0)
    const d2 = new Date(0)
    d2.x = 0
    expect(equals(d1, d2)).toBe(false)

    const n1 = new Number(0)
    const n2 = new Number(0)
    n2.x = 0
    expect(equals(n1, n2)).toBe(false)

    const r1 = /(?:)/
    const r2 = /(?:)/
    r2.x = 0
    expect(equals(r1, r2)).toBe(false)

    const s1 = new String('')
    const s2 = new String('')
    s2.x = 0
    expect(equals(s1, s2)).toBe(false)
  })

  it('handles typed arrays', () => {
    const typArr1 = new ArrayBuffer(10)
    typArr1[0] = 1
    const typArr2 = new ArrayBuffer(10)
    typArr2[0] = 1
    const typArr3 = new ArrayBuffer(10)
    const intTypArr = new Int8Array(typArr1)
    typArr3[0] = 0
    expect(equals(typArr1, typArr2)).toBe(true)
    expect(equals(typArr1, typArr3)).toBe(false)
    expect(equals(typArr1, intTypArr)).toBe(false)
  })

  it('compares Map objects by value', () => {
    expect(equals(new Map([]), new Map([]))).toBe(true)
    expect(equals(new Map([]), new Map([[1, 'a']]))).toBe(false)
    expect(equals(new Map([[1, 'a']]), new Map([]))).toBe(false)
    expect(equals(new Map([[1, 'a']]), new Map([[1, 'a']]))).toBe(true)
    expect(equals(new Map([[1, 'a'], [2, 'b']]), new Map([[2, 'b'], [1, 'a']]))).toBe(true)
    expect(equals(new Map([[1, 'a']]), new Map([[2, 'a']]))).toBe(false)
    expect(equals(new Map([[1, 'a']]), new Map([[1, 'b']]))).toBe(false)
    expect(
      equals(
        new Map([[1, 'a'], [2, new Map([[3, 'c']])]]),
        new Map([[1, 'a'], [2, new Map([[3, 'c']])]])
      )
    ).toBe(true)
    expect(
      equals(
        new Map([[1, 'a'], [2, new Map([[3, 'c']])]]),
        new Map([[1, 'a'], [2, new Map([[3, 'd']])]])
      )
    ).toBe(false)
    expect(equals(new Map([[[1, 2, 3], [4, 5, 6]]]), new Map([[[1, 2, 3], [4, 5, 6]]]))).toBe(true)
    expect(equals(new Map([[[1, 2, 3], [4, 5, 6]]]), new Map([[[1, 2, 3], [7, 8, 9]]]))).toBe(false)
  })

  it('dispatches to `equals` method recursively in Map', () => {
    const mapA = new Map()
    const mapB = new Map()
    mapA.set(mapA, mapA)
    expect(equals(mapA, mapB)).toBe(false)
    mapA.set(mapB, mapB)
    mapB.set(mapB, mapB)
    mapB.set(mapA, mapA)
    expect(equals(mapA, mapB)).toBe(true)
  })

  it('compares Set objects by value', () => {
    expect(equals(new Set([]), new Set([]))).toBe(true)
    expect(equals(new Set([]), new Set([1]))).toBe(false)
    expect(equals(new Set([1]), new Set([]))).toBe(false)
    expect(equals(new Set([1, 2]), new Set([2, 1]))).toBe(true)
    expect(
      equals(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([3])])]))
    ).toBe(true)
    expect(
      equals(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([4])])]))
    ).toBe(false)
    expect(equals(new Set([[1, 2, 3], [4, 5, 6]]), new Set([[1, 2, 3], [4, 5, 6]]))).toBe(true)
    expect(equals(new Set([[1, 2, 3], [4, 5, 6]]), new Set([[1, 2, 3], [7, 8, 9]]))).toBe(false)
  })

  it('dispatches to `equals` method recursively in Set', () => {
    const setA = new Set()
    const setB = new Set()
    setA.add(setA)
    expect(equals(setA, setB)).toBe(false)
    setA.add(setB)
    setB.add(setB)
    setB.add(setA)
    expect(equals(setA, setB)).toBe(true)
  })

  it('compares WeakMap objects by identity', () => {
    const weakMap = new WeakMap([])
    expect(equals(weakMap, weakMap)).toBe(true)
    expect(equals(weakMap, new WeakMap([]))).toBe(false)
  })

  it('compares WeakSet objects by identity', () => {
    const weakSet = new WeakSet([])
    expect(equals(weakSet, weakSet)).toBe(true)
    expect(equals(weakSet, new WeakSet([]))).toBe(false)
  })

  it('dispatches to `equals` method recursively', () => {
    function Left(x) {
      this.value = x
    }
    Left.prototype.equals = function(x) {
      return x instanceof Left && equals(x.value, this.value)
    }

    function Right(x) {
      this.value = x
    }
    Right.prototype.equals = function(x) {
      return x instanceof Right && equals(x.value, this.value)
    }

    expect(equals(new Left([42]), new Left([42]))).toBe(true)
    expect(equals(new Left([42]), new Left([43]))).toBe(false)
    expect(equals(new Left(42), { value: 42 })).toBe(false)
    expect(equals({ value: 42 }, new Left(42))).toBe(false)
    expect(equals(new Left(42), new Right(42))).toBe(false)
    expect(equals(new Right(42), new Left(42))).toBe(false)

    expect(equals([new Left(42)], [new Left(42)])).toBe(true)
    expect(equals([new Left(42)], [new Right(42)])).toBe(false)
    expect(equals([new Right(42)], [new Left(42)])).toBe(false)
    expect(equals([new Right(42)], [new Right(42)])).toBe(true)
  })

  it('is commutative', () => {
    function Point(x, y) {
      this.x = x
      this.y = y
    }
    Point.prototype.equals = function(point) {
      return point instanceof Point && this.x === point.x && this.y === point.y
    }

    function ColorPoint(x, y, color) {
      this.x = x
      this.y = y
      this.color = color
    }
    ColorPoint.prototype = new Point(0, 0)
    ColorPoint.prototype.equals = function(point) {
      return (
        point instanceof ColorPoint &&
        this.x === point.x &&
        this.y === point.y &&
        this.color === point.color
      )
    }

    expect(equals(new Point(2, 2), new ColorPoint(2, 2, 'red'))).toBe(false)
    expect(equals(new ColorPoint(2, 2, 'red'), new Point(2, 2))).toBe(false)
  })

  it('curries the method', () => {
    const valueA = []
    const isA = equals(valueA)
    expect(isA([])).toBe(true)
  })

  it('upgrades to async when either parameter is a Promise', async () => {
    const result = equals(Promise.resolve(42), Promise.resolve(42))
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBe(true)
  })
})
