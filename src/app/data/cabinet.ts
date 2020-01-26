export type CabinetType = 'HOGWARTS_PRIMORSKAYA' | 'AWAY_PRIMORSKAYA' | 'AWAY_OTHER';

export class CabinetTypeUtils {
  public static values: Array<CabinetType> = ['HOGWARTS_PRIMORSKAYA', 'AWAY_PRIMORSKAYA', 'AWAY_OTHER'];
}

export class Cabinet {
  public constructor(
    public id: number,
    public name: string,
    public cabinetType: CabinetType,
  ) {}
}
