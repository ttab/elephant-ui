import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tooltip } from '@/components/ui/tooltip'

describe('Tooltip', () => {
  describe('convenience wrapper', () => {
    it('renders children inside the trigger', () => {
      render(
        <Tooltip content='hint'>
          <button type='button'>hover me</button>
        </Tooltip>
      )

      expect(screen.getByRole('button', { name: 'hover me' })).toBeInTheDocument()
    })

    it('shows content on hover', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Tooltip content='hint text'>
          <button type='button'>hover me</button>
        </Tooltip>
      )

      // Tooltip is hidden initially.
      expect(screen.queryByText('hint text')).toBeNull()

      await user.hover(screen.getByRole('button', { name: 'hover me' }))

      expect(await screen.findByText('hint text', undefined, { timeout: 3000 }))
        .toBeInTheDocument()
    })

    it('accepts ReactNode content (not just strings)', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Tooltip content={<strong>bold hint</strong>}>
          <button type='button'>hover me</button>
        </Tooltip>
      )

      await user.hover(screen.getByRole('button', { name: 'hover me' }))

      const hint = await screen.findByText('bold hint', undefined, { timeout: 3000 })
      expect(hint.tagName).toBe('STRONG')
    })

    it('hides content when no longer hovered', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <div>
          <Tooltip content='hint text'>
            <button type='button'>hover me</button>
          </Tooltip>
          <button type='button'>other</button>
        </div>
      )

      const trigger = screen.getByRole('button', { name: 'hover me' })
      await user.hover(trigger)
      await screen.findByText('hint text', undefined, { timeout: 3000 })

      await user.unhover(trigger)
      await user.hover(screen.getByRole('button', { name: 'other' }))

      await waitFor(() => {
        expect(screen.queryByText('hint text')).toBeNull()
      }, { timeout: 3000 })
    })
  })
})
