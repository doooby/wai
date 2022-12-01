import wai from '@node_modules/wai';

export function object<V> (map: (value) => V): (value) => V {
  return value => {
    if (!wai.isObject(value)) {
      throw new wai.MappingError('not object');
    }
    return Object.freeze(map(value));
  };
}

export function listOf<V> (map: (value) => V): (value) => V[] {
  return value => {
    if (!Array.isArray(value)) {
      throw new wai.MappingError('not array');
    }
    const array: any = [];
    for (let i = 0; i < value.length; i += 1) {
      array[i] = wai.prop(i, value, map);
    }
    return Object.freeze(array) as V[];
  };
}

export function tuple<V0, V1> (
  map0: (value) => V0,
  map1: (value) => V1,
): (value) => [V0, V1] {
  return value => {
    if (!Array.isArray(value)) {
      throw new wai.MappingError('not array');
    }
    const array: any = [];
    array[0] = wai.prop(0, value, map0);
    array[1] = wai.prop(1, value, map1);
    return Object.freeze(array) as [V0, V1];
  };
}
