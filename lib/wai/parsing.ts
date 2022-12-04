import wai from '@node_modules/wai';

export function tryParse<V> (value, map: (value) => V): [null, V ] | [Error] {
  try {
    return [null, map(value)];
  } catch (error) {
    if (error instanceof wai.MappingError) {
      error.seal(value);
    }
    return [error as Error];
  }
}
