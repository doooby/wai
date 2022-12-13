import { wai } from 'wai';

export function nullable<V> (map: (value) => V): (value) => undefined | V {
  return value => {
    if (wai.isEmpty(value)) {
      return undefined;
    } else {
      return map(value);
    }
  };
}
