export class Cabinet {
  public constructor(
    public id: number,
    public info: CabinetInfo
  ) {}
}

export class CabinetInfo {
  public constructor(
    public name: string
  ) {}
}
