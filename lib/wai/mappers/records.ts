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

export function bRecord<B extends Record<string, wai.BRecordValue>> (value): wai.BRecord<B> {
  return wai.object(value => {
    const id = wai.prop('id', value, wai.string);
    const caption = wai.prop('caption', value, wai.string);

    const otherParsedValues: B = {} as any;
    for (let attr of Object.keys(value)) {
      if (attr === 'id' || attr === 'caption') continue;
      (otherParsedValues as any)[attr] = wai.prop(attr, value, bRecordValue);
    }

    return {
      id,
      caption,
      ...otherParsedValues
    }
  })(value);
}

function bRecordValue (value): wai.BRecordValue {
  if (wai.isEmpty(value) || typeof value !== 'string' || value.length === 0) return undefined;
  return value;
}
