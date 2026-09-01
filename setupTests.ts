import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  // Base UI's modal scroll-lock writes inline styles directly on <body>
  // and <html>. Cleanup unmounts React, which fires Base UI's effect
  // cleanups, but residue can linger between test files. Reset here.
  if (typeof document !== 'undefined') {
    document.body.removeAttribute('style')
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute('data-base-ui-scroll-locked')
  }
})

// jsdom polyfills required by Base UI's Floating UI internals.
// Without these, Tier 1 components throw on mount.

class ResizeObserverPolyfill {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

class IntersectionObserverPolyfill {
  root: Element | null = null
  rootMargin: string = ''
  thresholds: ReadonlyArray<number> = []
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverPolyfill
}
if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = IntersectionObserverPolyfill as unknown as typeof IntersectionObserver
}

if (typeof Element !== 'undefined') {
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = function scrollIntoView(): void {}
  }
  if (typeof Element.prototype.hasPointerCapture !== 'function') {
    Element.prototype.hasPointerCapture = function hasPointerCapture(): boolean {
      return false
    }
  }
  if (typeof Element.prototype.setPointerCapture !== 'function') {
    Element.prototype.setPointerCapture = function setPointerCapture(): void {}
  }
  if (typeof Element.prototype.releasePointerCapture !== 'function') {
    Element.prototype.releasePointerCapture = function releasePointerCapture(): void {}
  }
}

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList => {
    // Crude evaluator: handles `(min-width: Npx)` against jsdom's innerWidth.
    // Unknown queries default to `matches: true` so desktop-only branches
    // (ComboBox's `isDesktop`) take the expected path in tests.
    const minWidth = query.match(/min-width:\s*(\d+)px/)
    let matches = true
    if (minWidth) {
      matches = window.innerWidth >= Number(minWidth[1])
    }
    return {
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }
  }
}
