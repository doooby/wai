import wai from "~/index";

export function just<V> (
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

export function maybe<V> (
  name: string,
  parent: wai.Object,
  map: (value) => V,
  defaultValue: undefined | V = undefined,
): undefined | V {
  const value = parent[name];
  if (wai.isEmpty(value)) return defaultValue;
  return just(name, parent, map);
}

export function ensure<V> (
  name: string,
  parent: wai.Object,
  map: (value) => V,
  defaultValue: undefined | V = undefined,
): undefined | V {
  try {
    return maybe(name, parent, map);
  } catch (error) {
    return defaultValue;
  }
}
