import wai from "~/index";

export function tuple<V0, V1> (
  value,
  property0: (
    name: string,
    parent: wai.Object,
  ) => V0,
  property1: (
    name: string,
    parent: wai.Object,
  ) => V1,
): [ V0, V1 ] {
  const array = wai.map.array(value);
  return [
    property0('0', array),
    property1('1', array),
  ]
}

export function tuple3<V0, V1, V2> (
  value,
  property0: (
    name: string,
    parent: wai.Object,
  ) => V0,
  property1: (
    name: string,
    parent: wai.Object,
  ) => V1,
  property2: (
    name: string,
    parent: wai.Object,
  ) => V2,
): [ V0, V1, V2 ] {
  const array = wai.map.array(value);
  return [
    property0('0', array),
    property1('1', array),
    property2('2', array),
  ]
}

function listOf<V> (value, map: (value) => undefined | V): readonly V[] {
  if (Array.isArray(value)) value = value.map(map);
  return wai.map.filteredArray<V>(value);
}
