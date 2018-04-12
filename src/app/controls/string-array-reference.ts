export class StringArrayReference {
  public constructor(
    public getValue: () => Array<string>,
    public setValue: (arg: string []) => {}
  ) {}
}
