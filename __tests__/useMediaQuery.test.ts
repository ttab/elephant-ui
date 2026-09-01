import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true when the query matches', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string): MediaQueryList => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('returns false when the query does not match', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 9999px)'))
    expect(result.current).toBe(false)
  })

  it('updates when the matchMedia "change" event fires', () => {
    let registered: ((e: MediaQueryListEvent) => void) | null = null
    const removed = vi.fn()
    let currentMatches = false

    vi.spyOn(window, 'matchMedia').mockImplementation((query: string): MediaQueryList => ({
      get matches() {
        return currentMatches
      },
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_type: string, cb: EventListenerOrEventListenerObject) => {
        registered = cb as (e: MediaQueryListEvent) => void
      },
      removeEventListener: removed,
      dispatchEvent: () => false
    }))

    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    act(() => {
      currentMatches = true
      registered?.({} as MediaQueryListEvent)
    })
    expect(result.current).toBe(true)

    unmount()
    expect(removed).toHaveBeenCalled()
  })
})
