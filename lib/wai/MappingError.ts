export class MappingError extends Error {
  readonly __waiMappingError = true;
  private readonly propertyTraces: [ number | string, any ][] = [];
  data?: unknown;

  constructor (private readonly source: string) {
    super('wai mapping error');
  }

  addPropertyTrace (name: number | string, parent) {
    this.propertyTraces.push([ name, parent ]);
  }

  seal (data: unknown) {
    const props = this.propertyTraces.map(([ prop ]) => prop);
    props.reverse();
    this.message = `${this.message}: ${this.source} at .${props.join('.')}`;
    this.data = data;
  }
}
