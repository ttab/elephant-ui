import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function renderBasic(props: { defaultValue?: string, value?: string, onValueChange?: (v: string) => void } = {}) {
  render(
    <Tabs defaultValue='one' {...props}>
      <TabsList>
        <TabsTrigger value='one'>One</TabsTrigger>
        <TabsTrigger value='two'>Two</TabsTrigger>
        <TabsTrigger value='three'>Three</TabsTrigger>
      </TabsList>
      <TabsContent value='one'>panel one</TabsContent>
      <TabsContent value='two'>panel two</TabsContent>
      <TabsContent value='three'>panel three</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders the default panel', () => {
    renderBasic()
    expect(screen.getByText('panel one')).toBeInTheDocument()
  })

  it('switches panel on tab click', async () => {
    const user = userEvent.setup()
    renderBasic()

    await user.click(screen.getByRole('tab', { name: 'Two' }))

    expect(screen.getByText('panel two')).toBeInTheDocument()
  })

  it('arrow keys move focus between tabs', async () => {
    const user = userEvent.setup()
    renderBasic()

    const firstTab = screen.getByRole('tab', { name: 'One' })
    firstTab.focus()
    await user.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Two' }))
  })

  it('controlled value renders matching panel', () => {
    renderBasic({ value: 'three' })
    expect(screen.getByText('panel three')).toBeInTheDocument()
  })

  it('fires onValueChange when a tab is activated', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    renderBasic({ onValueChange: handleValueChange })

    await user.click(screen.getByRole('tab', { name: 'Two' }))

    expect(handleValueChange).toHaveBeenCalled()
    expect(handleValueChange.mock.calls[0][0]).toBe('two')
  })
})
