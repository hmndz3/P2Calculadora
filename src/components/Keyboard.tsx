import Button from './Button'

const KEYS = [['C', '+/-', '%', '/'], ['7', '8', '9', '*'], ['4', '5', '6', '-'], ['1', '2', '3', '+'], ['0', '.', '=']]
const OPS = ['+', '-', '*', '/', '%', '=']
const ACTIONS = ['C', '+/-']

const Keyboard = ({ onKey }: { onKey: (k: string) => void }) => (
  <div className="keyboard" role="group" aria-label="Calculator keyboard">
    {KEYS.flat().map(k => (
      <Button key={k} label={k} onClick={() => onKey(k)}
        variant={ACTIONS.includes(k) ? 'action' : OPS.includes(k) ? 'operator' : 'number'} />
    ))}
  </div>
)

export default Keyboard
