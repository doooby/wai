import wai from "~/index";

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
