import wai from '~/index';

export function prop<V> (
  name: number | string,
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
