import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useCalculator from '../hooks/useCalculator'
import { calculate, formatResult } from '../hooks/useCalculator'

// helpers para reducir repeticion en los tests
const press = (handleKey: (k: string) => void, keys: string[]) => {
  keys.forEach(k => handleKey(k))
}

describe('useCalculator', () => {
  it('shows digit when pressed', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.handleKey('5'))
    expect(result.current.display).toBe('5')
  })

  it('concatenates multiple digits', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['1', '2', '3']))
    expect(result.current.display).toBe('123')
  })

  it('adds two numbers correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['5', '+', '3', '=']))
    expect(result.current.display).toBe('8')
  })

  it('subtracts two numbers correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['9', '-', '4', '=']))
    expect(result.current.display).toBe('5')
  })

  it('shows ERROR when subtraction result is negative', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['3', '-', '5', '=']))
    expect(result.current.display).toBe('ERROR')
  })

  it('shows ERROR when result exceeds 999999999', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['9', '9', '9', '9', '9', '9', '9', '9', '9', '*', '2', '=']))
    expect(result.current.display).toBe('ERROR')
  })

  it('ignores digits beyond 9 characters', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']))
    expect(result.current.display).toBe('123456789')
  })

  it('chains operations showing intermediate result', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['5', '+', '3', '+']))
    expect(result.current.display).toBe('8')
  })

  it('clears display on C', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['5', '+', '3', 'C']))
    expect(result.current.display).toBe('0')
  })

  it('handles decimal division within 9 chars (22/7)', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['2', '2', '/', '7', '=']))
    expect(result.current.display.length).toBeLessThanOrEqual(9)
    expect(result.current.display).not.toBe('ERROR')
  })

  it('multiplies correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['6', '*', '7', '=']))
    expect(result.current.display).toBe('42')
  })

  it('calculates modulo correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => press(result.current.handleKey, ['1', '0', '%', '3', '=']))
    expect(result.current.display).toBe('1')
  })
})

describe('calculate', () => {
  it('adds', () => expect(calculate(2, '+', 3)).toBe(5))
  it('subtracts', () => expect(calculate(5, '-', 2)).toBe(3))
  it('multiplies', () => expect(calculate(4, '*', 3)).toBe(12))
  it('divides', () => expect(calculate(10, '/', 2)).toBe(5))
  it('returns NaN on division by zero', () => expect(isNaN(calculate(5, '/', 0))).toBe(true))
})

describe('formatResult', () => {
  it('returns ERROR for negative numbers', () => expect(formatResult(-1)).toBe('ERROR'))
  it('returns ERROR for overflow', () => expect(formatResult(1000000000)).toBe('ERROR'))
  it('truncates long decimals to fit 9 chars', () => {
    const r = formatResult(1 / 3)
    expect(r.length).toBeLessThanOrEqual(9)
    expect(r).not.toBe('ERROR')
  })
})
