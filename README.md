# WAI - What am I ?

strict TS mapper for JS data

#### Is it any good?

[yes.](https://news.ycombinator.com/item?id=3067434)

## WRITE-ME

## Use

```typescript
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

const validData = mapNestedObject({ id: 5 }); // valid and typed
const invalidData = mapNestedObject({ id: '5' }); // invalid, raises `wai mapping error: not integer at .id`
```
