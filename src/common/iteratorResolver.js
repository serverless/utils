import { baseIsResolved } from './isResolved'
import { baseResolveWith } from './resolveWith'
import isIterator from '../lang/isIterator'
import toString from '../lang/toString'

const iterateAt = (iterator, history, pending, index) => {
  if (history[index]) {
    return history[index]
  }
  if (pending[index]) {
    return pending[index]
  }
  const next = iterator.next()
  pending[index] = next
  history[index] = null
  return baseResolveWith((resolvedNext) => {
    pending[index] = null
    if (!resolvedNext.done) {
      history[index] = resolvedNext
    }
    return resolvedNext
  }, next)
}

const fastForward = (histIterator) => {
  let next = { done: false }
  while (!next.done) {
    next = histIterator.next()
    if (!baseIsResolved(next)) {
      return baseResolveWith((resolvedNext) => {
        if (!resolvedNext.done) {
          return fastForward(histIterator)
        }
        return histIterator
      }, next)
    }
  }
  return histIterator
}

const iterAt = (index, history) => {
  if (index >= 0 && history[index]) {
    const iter = history[index]
    return {
      ...iter,
      index,
      kdx: index
    }
  }
  return {
    done: true
  }
}

const prevIterAt = (index, history) => {
  if (index >= 0 && history[index]) {
    const iter = history[index]
    return {
      ...iter,
      index,
      kdx: index
    }
  }
}

const historicIterator = (iterator, start = 'START') => {
  const history = []
  const pending = []
  let index = 0

  const histIterator = {
    next: () => {
      const iter = iterateAt(iterator, history, pending, index)
      return baseResolveWith((resolvedIter) => {
        const prev = prevIterAt(index - 1, history)
        if (!resolvedIter.done) {
          resolvedIter = iterAt(index, history)
          index += 1
        }
        return {
          ...resolvedIter,
          prev
        }
      }, iter)
    },
    previous: () => {
      const iter = iterAt(index - 1, history)
      const prev = prevIterAt(index, history)
      if (index >= 0) {
        index -= 1
      }
      return {
        ...iter,
        prev
      }
    }
  }

  if (start === 'END') {
    return fastForward(histIterator)
  }
  return histIterator
}

/**
 * Returns iterator capable of resolving iterators that might be async, wrapping it in additional functionality.
 *
 * @function
 * @since v0.0.16
 * @category common
 * @param {Iterator} iterator The iterator to wrap
 * @param {string} start The positin to start at.
 * @return {Iterator} A new iterator for the given iterator
 * @example
 *
 * iteratorResolver(
 *  (['write', 'more'])[Symbol.iterator]()
 * )
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   }),
 * //   previous: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 */
const iteratorResolver = (iterator, start = 'START') => {
  if (!isIterator(iterator)) {
    throw new TypeError(
      `iteratorResolver expected iterator to be an Iterator value. Instead received ${toString(
        iterator
      )}`
    )
  }

  // NOTE BRN: Optimization here of reassigning histIterator so that we don't have to resolve it on every iteration.
  let histIterator
  histIterator = baseResolveWith((resolvedIterator) => {
    histIterator = resolvedIterator
    return histIterator
  }, historicIterator(iterator, start))

  return {
    next: () => baseResolveWith((resolvedIterator) => resolvedIterator.next(), histIterator),
    previous: () => baseResolveWith((resolvedIterator) => resolvedIterator.previous(), histIterator)
  }
}

export default iteratorResolver
