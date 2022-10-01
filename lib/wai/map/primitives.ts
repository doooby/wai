import wai from '~/index';

export function object<O> (value, map: (value) => O): Readonly<O> {
  if (!wai.isObject(value)) {
    throw new wai.MappingError('not object');
  }
  return Object.freeze(map(value));
}

export function array<V = unknown> (value): readonly V[] {
  if (!Array.isArray(value)) {
    throw new wai.MappingError('not array');
  }
  return Object.freeze(value);
}

export function filteredArray<V = unknown> (
  value,
  filter: (value) => boolean = wai.isPresent,
): readonly V[] {
  if (Array.isArray(value)) value = value.filter(filter);
  return array(value);
}

export function integer (value): number {
  if (typeof value !== 'number') value = Number(value);
  if (isNaN(value) || !Number.isInteger) {
    throw new wai.MappingError('not integer');
  }
  return value;
}
