import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Calendar } from '@/components/ui/calendar'

describe('Calendar', () => {
  it('renders a grid of dates', () => {
    render(<Calendar mode='single' />)

    // react-day-picker renders a grid role.
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('fires onSelect when a date is clicked', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(
      <Calendar
        mode='single'
        month={new Date(2025, 5, 1)}
        onSelect={handleSelect}
      />
    )

    // Pick a date button - first non-disabled "15" in June 2025.
    const day15 = screen.getAllByRole('button', { name: /15/ })[0]
    await user.click(day15)

    expect(handleSelect).toHaveBeenCalled()
  })

  it('renders previous/next month navigation buttons', () => {
    render(<Calendar mode='single' />)

    // react-day-picker uses aria-label for prev/next nav.
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next month/i })).toBeInTheDocument()
  })

  it('clicking next-month nav advances the displayed month', async () => {
    const user = userEvent.setup()
    // Uncontrolled month: defaultMonth lets the component manage its own state
    // so clicking the nav actually advances the calendar.
    render(<Calendar mode='single' defaultMonth={new Date(2025, 5, 1)} />)

    expect(screen.getByText(/June 2025/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /next month/i }))

    expect(screen.getByText(/July 2025/i)).toBeInTheDocument()
  })
})
