import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/Button'

const meta: Meta<typeof Button> = {
  title: 'Calculator/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

// boton de numero normal
export const Number: Story = { args: { label: '5', variant: 'number' } }

// boton de operador
export const Operator: Story = { args: { label: '+', variant: 'operator' } }

// boton de accion (C o +/-)
export const Action: Story = { args: { label: 'C', variant: 'action' } }

// boton igual
export const Equal: Story = { args: { label: '=', variant: 'operator' } }
