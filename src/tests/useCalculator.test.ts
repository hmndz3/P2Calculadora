import { describe, it, expect } from 'vitest'
import { calculate, formatResult } from '../hooks/useCalculator'

describe('calculate', () => {
  it('adds two numbers', () => expect(calculate(5, '+', 3)).toBe(8))
  it('subtracts two numbers', () => expect(calculate(9, '-', 4)).toBe(5))
  it('multiplies two numbers', () => expect(calculate(6, '*', 7)).toBe(42))
  it('divides two numbers', () => expect(calculate(10, '/', 2)).toBe(5))
  it('calculates modulo', () => expect(calculate(10, '%', 3)).toBe(1))
  it('returns NaN on division by zero', () => expect(isNaN(calculate(5, '/', 0))).toBe(true))
  it('handles chained addition (5+3)', () => expect(calculate(5, '+', 3)).toBe(8))
  it('handles float addition', () => expect(calculate(0.1, '+', 0.2)).toBeCloseTo(0.3))
})

describe('formatResult', () => {
  it('returns ERROR for negative numbers', () => expect(formatResult(-1)).toBe('ERROR'))
  it('returns ERROR for zero result of negative', () => expect(formatResult(-0.001)).toBe('ERROR'))
  it('returns ERROR when result exceeds 999999999', () => expect(formatResult(1000000000)).toBe('ERROR'))
  it('returns ERROR for NaN', () => expect(formatResult(NaN)).toBe('ERROR'))
  it('formats integer result correctly', () => expect(formatResult(42)).toBe('42'))
  it('formats zero correctly', () => expect(formatResult(0)).toBe('0'))
  it('fits result within 9 chars', () => {
    const r = formatResult(22 / 7)
    expect(r.length).toBeLessThanOrEqual(9)
    expect(r).not.toBe('ERROR')
  })
  it('truncates long decimals to fit 9 chars (1/3)', () => {
    const r = formatResult(1 / 3)
    expect(r.length).toBeLessThanOrEqual(9)
    expect(r).not.toBe('ERROR')
  })
  it('allows max value 999999999', () => expect(formatResult(999999999)).toBe('999999999'))
  it('returns ERROR for value just above max', () => expect(formatResult(999999999 + 1)).toBe('ERROR'))
})
