import wai from '~/index';

export function nestedObject<V> (map: (value) => V): (value) => V {
  return value => wai.map.object(value, map);
}

export function nestedListOf<V> (map: (value) => V): (value) => V[] {
  return value => wai.map.listOf(value, map);
}
