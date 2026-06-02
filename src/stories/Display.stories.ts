import type { Meta, StoryObj } from '@storybook/react'
import Display from '../components/Display'

const meta: Meta<typeof Display> = {
  title: 'Calculator/Display',
  component: Display,
}

export default meta
type Story = StoryObj<typeof Display>

// display en estado inicial
export const Default: Story = { args: { value: '0' } }

// display con numero ingresado
export const WithNumber: Story = { args: { value: '12345' } }

// display en limite maximo de 9 caracteres
export const MaxLength: Story = { args: { value: '999999999' } }

// display con resultado decimal
export const Decimal: Story = { args: { value: '3.142857' } }
