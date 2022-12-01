export class MappingError extends Error {
  private readonly propertyTraces: [ number | string, any ][] = [];

  constructor (private readonly source: string) {
    super('wai mapping error');
  }

  addPropertyTrace (name: number | string, parent) {
    this.propertyTraces.push([ name, parent ]);
  }

  seal () {
    const props = this.propertyTraces.map(([ prop ]) => prop);
    props.reverse();
    this.message = `${this.message}: ${this.source} at .${props.join('.')}`;
  }
}
