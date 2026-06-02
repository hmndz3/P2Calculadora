import type { Meta, StoryObj } from '@storybook/react'
import Display from '../components/Display'

const meta: Meta<typeof Display> = {
  title: 'Calculator/ErrorState',
  component: Display,
}

export default meta
type Story = StoryObj<typeof Display>

// resultado negativo de una resta
export const NegativeResult: Story = {
  args: { value: 'ERROR' },
  name: 'Negative result (subtraction)',
}

// resultado mayor a 999999999
export const Overflow: Story = {
  args: { value: 'ERROR' },
  name: 'Overflow > 999999999',
}

// division por cero
export const DivisionByZero: Story = {
  args: { value: 'ERROR' },
  name: 'Division by zero',
}
