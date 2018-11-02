import { SYMBOL_OP } from '../constants'
import op from './op'

describe('op', () => {
  test('creates an op object', () => {
    const fn = () => {}
    const operation = op(fn)
    expect(operation[SYMBOL_OP]).toBe(fn)
  })
})
