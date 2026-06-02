import { useEffect } from 'react'

// maps physical keyboard keys to calculator keys
const KEY_MAP: Record<string, string> = {
  Enter: '=',
  Escape: 'C',
  Backspace: 'C',
  ',': '.',
}

const useKeyboardListener = (onKey: (k: string) => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) return onKey(e.key)
      if (['+', '-', '*', '/', '%', '.'].includes(e.key)) return onKey(e.key)
      if (KEY_MAP[e.key]) return onKey(KEY_MAP[e.key])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onKey])
}

export default useKeyboardListener
