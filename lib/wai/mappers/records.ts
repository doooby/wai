import { wai } from 'wai';

export function abbreviatedRecord (value): wai.AbbreviatedRecord {
  return wai.object(
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
  )(value);
}
