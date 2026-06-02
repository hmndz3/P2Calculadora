import Display from './Display'
import Keyboard from './Keyboard'
import useCalculator from '../hooks/useCalculator'
import useKeyboardListener from '../hooks/useKeyboardListener'

const Calculator = () => {
  const { display, handleKey } = useCalculator()
  useKeyboardListener(handleKey)
  return (
    <div className="calculator" role="application" aria-label="Calculator">
      <Display value={display} />
      <Keyboard onKey={handleKey} />
    </div>
  )
}

export default Calculator
