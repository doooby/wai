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

describe('string function suite', () => {

  it('Checks string output, when string goes in ', () => {
    const value = wai.string('kkk');
    expect(value).toEqual('kkk');
  })

  it('Check error throw, when integer goes in ', () => {
    expect(() => wai.string(666)).toThrow(Error)
  })

  /*it('Check error throw, when empty string goes in', () => {
    expect(() => wai.string('')).toThrow(Error)
    // Is empty string valid?
  })*/

  it('Check error throw, when undefined goes in', () => {
    expect(() => wai.string(undefined)).toThrow(Error)
  })
})

describe('boolean function suite', () => {

  it('Checks boolean output, when boolean goes in', () => {
    const value_true = wai.boolean(true);
    const value_false = wai.boolean(false);
    expect(value_true).toEqual(true)
    expect(value_false).toEqual(false)
  })

  it('Checks error throw, when string goes in', () => {
    expect(() => wai.boolean('true')).toThrow(Error)
  })

  it('Checks error throw, when undefined goes in', () => {
    expect(() => wai.boolean(undefined)).toThrow(Error)
  })

  it('Checks error throw, when empty string goes in', () => {
    expect(() => wai.boolean('')).toThrow(Error)
  })

})
