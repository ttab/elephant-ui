import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Button } from '@/components/ui/button'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText
} from '@/components/ui/buttonGroup'

describe('ButtonGroup', () => {
  it('renders children inside a role=group', () => {
    render(
      <ButtonGroup>
        <Button>one</Button>
        <Button>two</Button>
      </ButtonGroup>
    )

    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'one' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'two' })).toBeInTheDocument()
  })

  it('default orientation applies horizontal CVA class', () => {
    render(
      <ButtonGroup>
        <Button>one</Button>
      </ButtonGroup>
    )

    // Default cva variant produces the horizontal layout class on the group.
    const group = screen.getByRole('group')
    expect(group.className).toMatch(/flex/)
    // Vertical applies flex-col; default (horizontal) does not.
    expect(group.className).not.toMatch(/flex-col/)
  })

  it('vertical orientation sets data-orientation', () => {
    render(
      <ButtonGroup orientation='vertical'>
        <Button>one</Button>
      </ButtonGroup>
    )

    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'vertical')
  })

  it('forwards className', () => {
    render(
      <ButtonGroup className='custom-class'>
        <Button>one</Button>
      </ButtonGroup>
    )

    expect(screen.getByRole('group')).toHaveClass('custom-class')
  })

  describe('ButtonGroupText', () => {
    it('renders default as a div', () => {
      render(
        <ButtonGroup>
          <ButtonGroupText>label</ButtonGroupText>
        </ButtonGroup>
      )

      expect(screen.getByText('label').tagName).toBe('DIV')
    })

    it('regression: render prop substitution works on ButtonGroupText', () => {
      // Locks the asChild → render prop migration for ButtonGroupText.
      render(
        <ButtonGroup>
          <ButtonGroupText render={<a href='/x'>link</a>}>x</ButtonGroupText>
        </ButtonGroup>
      )

      const anchor = screen.getByRole('link')
      expect(anchor.tagName).toBe('A')
      expect(anchor).toHaveAttribute('href', '/x')
    })
  })

  describe('ButtonGroupSeparator', () => {
    it('renders a separator with default vertical orientation', () => {
      const { container } = render(
        <ButtonGroup>
          <Button>one</Button>
          <ButtonGroupSeparator />
          <Button>two</Button>
        </ButtonGroup>
      )

      // ButtonGroupSeparator defaults to orientation='vertical'.
      const sep = container.querySelector('[data-slot=button-group-separator]')
      expect(sep).not.toBeNull()
      expect(sep).toHaveAttribute('data-orientation', 'vertical')
    })
  })
})
