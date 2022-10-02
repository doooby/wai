import wai from '~/index';

export function prop<V> (
  name: string,
  parent: wai.Object,
  map: (value) => V,
): V {
  try {
    return map(parent[name]);
  } catch (error) {
    if (error instanceof wai.MappingError) {
      error.addPropertyTrace(name, parent);
    }
    throw error;
  }
}

export function maybeProp<V> (
  name: string,
  parent: wai.Object,
  map: (value) => V,
  defaultValue: undefined | V = undefined,
): undefined | V {
  const value = parent[name];
  if (wai.isEmpty(value)) return defaultValue;
  return prop(name, parent, map);
}

export function ensureProp<V> (
  name: string,
  parent: wai.Object,
  map: (value) => V,
  defaultValue: undefined | V = undefined,
): undefined | V {
  try {
    return maybeProp(name, parent, map);
  } catch (error) {
    return defaultValue;
  }
}
