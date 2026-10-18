import { describe, expect, it } from 'vitest'
import { limitInMemory } from './rate-limit'

describe('limitInMemory', () => {
  it('blocks after the limit and resets after the window', () => {
    const t = 1_000_000
    for (let i = 0; i < 3; i++) expect(limitInMemory('k', t, 3, 1000).success).toBe(true)
    expect(limitInMemory('k', t + 10, 3, 1000).success).toBe(false)
    expect(limitInMemory('k', t + 1001, 3, 1000).success).toBe(true)
  })
  it('isolates keys', () => {
    expect(limitInMemory('a', 5, 1, 1000).success).toBe(true)
    expect(limitInMemory('b', 5, 1, 1000).success).toBe(true)
  })
})
