import type { Meta, StoryObj } from '@storybook/react'
import Keyboard from '../components/Keyboard'

const meta: Meta<typeof Keyboard> = {
  title: 'Calculator/Keyboard',
  component: Keyboard,
  args: { onKey: (k: string) => console.log('pressed:', k) },
}

export default meta
type Story = StoryObj<typeof Keyboard>

// teclado completo con todos los botones
export const Default: Story = {}
