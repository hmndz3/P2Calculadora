import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: 'number' | 'operator' | 'action'
}

const Button = ({ label, variant = 'number', ...rest }: Props) => (
  <button className={`btn btn-${variant}`} aria-label={label} {...rest}>
    {label}
  </button>
)

export default Button
