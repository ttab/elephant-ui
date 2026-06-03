import '../../src/styles/index.css'
import { beforeEach } from 'vitest'

// Disable all animations, transitions, and caret blinking for deterministic
// screenshots. Injected once at module load.
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.setAttribute('data-visual-test-reset', '')
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      caret-color: transparent !important;
    }
    html { scroll-behavior: auto !important; }
  `
  document.head.appendChild(style)
}

beforeEach(async () => {
  // Wait for Inter (via @fontsource/inter) to finish loading. Without this,
  // the first few screenshots may render in the fallback font.
  if (typeof document !== 'undefined' && document.fonts) {
    await document.fonts.ready
  }
})
