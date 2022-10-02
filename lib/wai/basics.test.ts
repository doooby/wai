import wai from '~/index';

describe('basics', () => {

  describe('nested object', () => {

    interface NestedObject {
      id: number;
      name?: string;
      settings?: {
        a: boolean;
        b?: string[];
      };
    }

    function mapNestedObject(value): NestedObject {
      return wai.map.object(value, value => ({
        id: wai.map.prop('id', value, wai.map.integer),
        name: wai.map.maybeProp('name', value, wai.map.string),
        settings: wai.map.maybeProp('settings', value,
          wai.map.nestedObject(value => ({
            a: wai.map.prop('a', value, wai.map.boolean),
            b: wai.map.maybeProp('b', value, wai.map.nestedListOf(wai.map.string)),
          })),
        ),
      }));
    }

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

  });

});
