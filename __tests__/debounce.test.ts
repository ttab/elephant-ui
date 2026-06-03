import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { debounce } from '@/lib/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays the call by the given timeout', async () => {
    const asyncCall = vi.fn(() => Promise.resolve())
    const debounced = debounce(asyncCall, 200)

    debounced('a')
    expect(asyncCall).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(200)
    expect(asyncCall).toHaveBeenCalledTimes(1)
    expect(asyncCall).toHaveBeenCalledWith('a')
  })

  it('coalesces rapid calls into a single trailing call with the last value', async () => {
    const asyncCall = vi.fn(() => Promise.resolve())
    const debounced = debounce(asyncCall, 200)

    debounced('a')
    debounced('b')
    debounced('c')

    await vi.advanceTimersByTimeAsync(200)
    expect(asyncCall).toHaveBeenCalledTimes(1)
    expect(asyncCall).toHaveBeenCalledWith('c')
  })

  it('fires again after the timeout window has passed', async () => {
    const asyncCall = vi.fn(() => Promise.resolve())
    const debounced = debounce(asyncCall, 100)

    debounced('first')
    await vi.advanceTimersByTimeAsync(100)
    debounced('second')
    await vi.advanceTimersByTimeAsync(100)

    expect(asyncCall).toHaveBeenCalledTimes(2)
    expect(asyncCall).toHaveBeenNthCalledWith(1, 'first')
    expect(asyncCall).toHaveBeenNthCalledWith(2, 'second')
  })

  it('logs but does not throw when the underlying call rejects', async () => {
    const error = new Error('boom')
    const asyncCall = vi.fn(() => Promise.reject(error))
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const debounced = debounce(asyncCall, 50)

    debounced('x')
    await vi.advanceTimersByTimeAsync(50)
    await vi.runAllTimersAsync()

    expect(consoleSpy).toHaveBeenCalledWith(error)
    consoleSpy.mockRestore()
  })
})
