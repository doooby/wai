import { wai } from 'wai';

describe('integer function suite', () => {

  it('Checks integer output, when integer goes in', () => {
    const value = wai.integer(4);
    expect(value).toEqual(4)
  })

  it('Checks error output, when null goes in', () => {
      expect(() =>
        wai.integer(null)).toThrow(Error)
  })

  it('Checks error output, when string goes in', () => {
    expect(() =>
      wai.integer('kkk')).toThrow(Error)
  })

  it('Checks error output, when empty string goes in', () => {
    expect(() =>
      wai.integer('')).toThrow(Error)
  })

  it('Checks error output, when undefined goes in', () => {
    expect(() =>
      wai.integer(undefined)).toThrow(Error)
  })
})
