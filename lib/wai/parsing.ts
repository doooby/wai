import wai from "~/index";

export function tryParse<V> (value, map: (value) => V): [null, V ] | [Error] {
  try {
    return [null, map(value)];
  } catch (error) {
    if (error instanceof wai.MappingError) {
      error.seal();
    }
    return [error as Error];
  }
}
