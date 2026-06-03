import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

describe('Table', () => {
  it('renders a full table structure', () => {
    render(
      <Table>
        <TableCaption>users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>alice@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('users').tagName).toBe('CAPTION')
    expect(screen.getByText('Name').tagName).toBe('TH')
    expect(screen.getByText('Alice').tagName).toBe('TD')
  })

  it('forwards className on table root', () => {
    render(<Table className='custom-class'><TableBody><TableRow><TableCell>x</TableCell></TableRow></TableBody></Table>)
    expect(screen.getByRole('table')).toHaveClass('custom-class')
  })

  it('TableFooter renders a tfoot with forwarded className', () => {
    render(
      <Table>
        <TableBody>
          <TableRow><TableCell>row</TableCell></TableRow>
        </TableBody>
        <TableFooter className='foot-x'>
          <TableRow><TableCell>summary</TableCell></TableRow>
        </TableFooter>
      </Table>
    )

    const foot = screen.getByText('summary').closest('tfoot')
    expect(foot).not.toBeNull()
    expect(foot).toHaveClass('foot-x')
  })

  it('TableRow data-state="selected" applies selected styling class', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state='selected'>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    const row = screen.getByText('x').closest('tr')
    expect(row).toHaveAttribute('data-state', 'selected')
  })
})
