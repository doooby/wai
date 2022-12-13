import { wai } from 'wai';

export function integer (value): number {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    throw new wai.MappingError('not integer');
  }
  return value;
}

export function string (value): string {
  if (typeof value !== 'string') {
    throw new wai.MappingError('not string');
  }
  return value;
}

export function boolean (value): boolean {
  if (typeof value !== 'boolean') {
    throw new wai.MappingError('not boolean');
  }
  return value;
}
