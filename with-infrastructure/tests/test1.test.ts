import { describe, it, expect } from 'vitest';
import { validateInput } from '../src/main';

describe('validateInput', () => {
  it('1', () => {
    expect(validateInput('uvivanova@edu.hse.ru', '12345Ul')).toBe(false)
  })

  it('2', () => {
    expect(validateInput('not-an-email','000')).toBe(false)
  })
})
