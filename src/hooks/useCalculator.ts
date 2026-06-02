import { useState } from 'react'

interface State {
  display: string
  prev: number | null
  operator: string | null
  waitingForOperand: boolean
}

const MAX = 999999999
const MAX_LEN = 9

// runs the math for two operands
export const calculate = (a: number, op: string, b: number): number => {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return b !== 0 ? a / b : NaN
  if (op === '%') return a % b
  return b
}

// formats a number result to fit the display constraints
export const formatResult = (n: number): string => {
  if (isNaN(n) || n < 0) return 'ERROR'
  if (n > MAX) return 'ERROR'
  const str = n.toString()
  if (str.length <= MAX_LEN) return str
  if (str.includes('.')) {
    const dotIdx = str.indexOf('.')
    const decimals = MAX_LEN - dotIdx - 1
    if (decimals < 0) return 'ERROR'
    return parseFloat(n.toFixed(decimals)).toString()
  }
  return 'ERROR'
}

const initial: State = { display: '0', prev: null, operator: null, waitingForOperand: false }

const useCalculator = () => {
  const [state, setState] = useState<State>(initial)

  const handleKey = (key: string) => {
    setState(s => {
      // digit pressed
      if (/^[0-9]$/.test(key)) {
        if (s.display === 'ERROR') return { ...initial, display: key }
        if (s.waitingForOperand) return { ...s, display: key, waitingForOperand: false }
        const charCount = s.display.replace(/[-.]/, '').length
        if (charCount >= MAX_LEN) return s
        return { ...s, display: s.display === '0' ? key : s.display + key }
      }
      // decimal point
      if (key === '.') {
        if (s.waitingForOperand) return { ...s, display: '0.', waitingForOperand: false }
        if (s.display.includes('.') || s.display.length >= MAX_LEN) return s
        return { ...s, display: s.display + '.' }
      }
      // toggle sign
      if (key === '+/-') {
        if (s.display === '0' || s.display === 'ERROR') return s
        if (s.display.startsWith('-')) return { ...s, display: s.display.slice(1) }
        if (s.display.length >= MAX_LEN) return s
        return { ...s, display: '-' + s.display }
      }
      // clear
      if (key === 'C') return initial
      // equal
      if (key === '=') {
        if (s.prev === null || s.operator === null) return s
        const result = calculate(s.prev, s.operator, parseFloat(s.display))
        return { display: formatResult(result), prev: null, operator: null, waitingForOperand: false }
      }
      // operator
      if (['+', '-', '*', '/', '%'].includes(key)) {
        const current = parseFloat(s.display)
        if (s.prev !== null && s.operator !== null && !s.waitingForOperand) {
          const result = calculate(s.prev, s.operator, current)
          const formatted = formatResult(result)
          const nextPrev = formatted === 'ERROR' ? null : result
          return { display: formatted, prev: nextPrev, operator: key, waitingForOperand: true }
        }
        return { ...s, prev: current, operator: key, waitingForOperand: true }
      }
      return s
    })
  }

  return { display: state.display, handleKey }
}

export default useCalculator
