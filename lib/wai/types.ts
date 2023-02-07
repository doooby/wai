import { wai } from 'wai';

export type Object = Record<string, any>;

type Labels = { [name: string]: undefined | string };

export interface RecordWithId {
  id: string;
}

export interface FailedRecord<R extends RecordWithId> extends RecordWithId {
  __mappingError: wai.MappingError;
}

export interface MappedRecord<R extends RecordWithId> extends RecordWithId {
  __mappingError: undefined;
  attributes: R;
}

export interface AbbreviatedRecord extends RecordWithId {
  labels: Labels;
}
export type BRecordValue = undefined | string;
export type BRecordBase = RecordWithId & {
  caption: string;
};
export type BRecord<B extends Record<keyof B, BRecordValue>> = BRecordBase & B;

export interface RecordChange extends RecordWithId {
  errors?: [string, string][];
}

export type RecordsIndex<R extends RecordWithId> = Record<string, undefined | R>;

export interface RecordsSlice<R extends RecordWithId> {
  records: (FailedRecord<R> | MappedRecord<R>)[];
  page: number;
  size: number;
  pages: number;
  total: number;
}
