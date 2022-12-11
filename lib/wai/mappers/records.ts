import wai from '@node_modules/wai';

export const abbreviatedRecord: (value) => wai.AbbreviatedRecord = wai.object(
  value => ({
    id: wai.prop('id', value, wai.string),
    labels: wai.prop('labels', value, wai.object(
      labelsValue => {
        const labels: wai.AbbreviatedRecord['labels'] = {};
        for (const [ name, value ] of Object.entries(labelsValue)) {
          labels[name] = String(value || '');
        }
        return labels;
      }
    )),
  }),
);

// TODO Readonly<O> ? i.e. O must be frozen
// export function associate<O> (
//   id,
//   index: wai.ObjectsIndex<O>,
// ): O {
//   const object = index[String(id)];
//   if (!wai.isRecord(object)) {
//     throw new wai.MappingError('not associate');
//   }
//   return object!;
// }
//
// export function optionalAssociate<O> (
//   id,
//   index: wai.ObjectsIndex<O>,
// ): undefined | O {
//   const object = index[String(id)];
//   if (wai.isEmpty(object)) return;
//   if (!wai.isRecord(object)) {
//     throw new wai.MappingError('not associate');
//   }
//   return object;
// }
