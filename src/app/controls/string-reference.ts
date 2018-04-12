export class StringReference {
  public constructor(
    public getValue: () => string,
    public setValue: (string) => {}
  ) {}
}
