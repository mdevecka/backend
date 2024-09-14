export class Token {
  constructor(readonly desc?: string) { }
  toString() { return this.desc; }
}
