import wai from '~/index';

describe('NestedObject', () => {

  interface NestedObject {
    id: number;
    name?: string;
    settings?: {
      a: boolean;
      b?: string[];
    };
    tuple?: [ string, undefined | string ];
  }

  const mapNestedObject: (value) => NestedObject = wai.object(value => ({
    id: wai.prop('id', value, wai.integer),
    name: wai.prop('name', value, wai.nullable(wai.string)),
    settings: wai.prop('settings', value,
      wai.nullable(wai.object(value => ({
        a: wai.prop('a', value, wai.boolean),
        b: wai.prop('b', value, wai.nullable(wai.listOf(wai.string))),
      }))),
    ),
    tuple: wai.prop('tuple', value,
      wai.nullable(wai.tuple(
        wai.string,
        wai.nullable(wai.string),
      )),
    ),
  }));

  it('parses successfully', () => {
    const result = mapNestedObject({ id: 1, name: 'one' });
    expect(result).toEqual({ id: 1, name: 'one' });
    expect(Object.isFrozen(result)).toBeTruthy();
  });

  it('ignores additional properties', () => {
    const result = mapNestedObject({ id: 1, name: 'one', more: true });
    expect(result).toEqual({ id: 1, name: 'one' });
  });

  it('parses nested settings', () => {
    const result = mapNestedObject({ id: 1, settings: { a: false } });
    expect(result).toEqual({ id: 1, settings: { a: false } });
    expect(Object.isFrozen(result.settings));
  });

  it('parses optional nested settings', () => {
    const result = mapNestedObject({
      id: 1,
      settings: { a: true, b: [ '1', '', ] },
    });
    expect(result).toEqual({
      id: 1,
      settings: { a: true, b: [ '1', '', ] },
    });
    expect(Object.isFrozen(result.settings));
  });

  it('fails to parse with correct error', () => {
    expect(
      wai.tryParse(
        { id: 'a' },
        mapNestedObject,
      )[0]!.message
    ).toEqual('wai mapping error: not integer at .id');
    expect(
      wai.tryParse(
        { id: 1, settings: { a: 'a' } },
        mapNestedObject,
      )[0]!.message
    ).toEqual('wai mapping error: not boolean at .settings.a');
    expect(
      wai.tryParse(
        { id: 1, settings: { a: true, b: [ '1', undefined, '3' ] } },
        mapNestedObject,
      )[0]!.message
    ).toEqual('wai mapping error: not string at .settings.b.1');
  });

  it('parses optional nested tuple', () => {
    const result = mapNestedObject({ id: 1, tuple: [ 'a', 'b' ] });
    expect(result).toEqual({ id: 1, tuple: [ 'a', 'b' ] });
    expect(Object.isFrozen(result.settings));
    expect(
      mapNestedObject({ id: 1, tuple: [ 'a' ] })
    ).toEqual({ id: 1, tuple: [ 'a' ] });
  });

  it('fails to parse tuple with correct error', () => {
    expect(
      wai.tryParse(
        { id: 1, tuple: [ 'a', 0 ] },
        mapNestedObject,
      )[0]!.message
    ).toEqual('wai mapping error: not string at .tuple.1');
  });

});
