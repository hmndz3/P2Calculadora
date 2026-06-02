interface Props {
  value: string
}

const Display = ({ value }: Props) => (
  <div className="display" role="status" aria-live="polite" aria-label={`Display: ${value}`}>
    <span className={`display-value ${value === 'ERROR' ? 'display-error' : ''}`}>{value}</span>
  </div>
)

export default Display
