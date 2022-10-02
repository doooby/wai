import wai from '~/index';

export function object<V> (value, map: (value) => V): V {
  if (!wai.isObject(value)) {
    throw new wai.MappingError('not object');
  }
  return Object.freeze(map(value));
}

export function listOf<V> (value, map: (value) => V): V[] {
  if (!Array.isArray(value)) {
    throw new wai.MappingError('not array');
  }
  const array: V[] = [];
  for (let i = 0; i < value.length; i+=1) {
    try {
      array[i] = map(value[i]);
    } catch (error) {
      if (error instanceof wai.MappingError) {
        error.addPropertyTrace(i.toString(), value);
      }
      throw error;
    }
  }
  return Object.freeze(array) as V[];
}


// TODO Readonly<O> ? i.e. O must be frozen
export function associate<O> (
  id,
  index: wai.ObjectsIndex<O>,
): O {
  const object = index[String(id)];
  if (!wai.isRecord(object)) {
    throw new wai.MappingError('not associate');
  }
  return object!;
}

export function optionalAssociate<O> (
  id,
  index: wai.ObjectsIndex<O>,
): undefined | O {
  const object = index[String(id)];
  if (wai.isEmpty(object)) return;
  if (!wai.isRecord(object)) {
    throw new wai.MappingError('not associate');
  }
  return object;
}
