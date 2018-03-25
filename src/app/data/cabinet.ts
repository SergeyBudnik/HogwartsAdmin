export type CabinetType = 'HOGWARTS_PRIMORSKAYA' | 'AWAY_PRIMORSKAYA' | 'AWAY_OTHER';

export class CabinetTypeUtils {
  public static values: Array<CabinetType> = ['HOGWARTS_PRIMORSKAYA', 'AWAY_PRIMORSKAYA', 'AWAY_OTHER'];

  public static getTranslation(cabinetType: CabinetType): string {
    switch (cabinetType) {
      case 'HOGWARTS_PRIMORSKAYA':
        return 'Офис Hogwarts: Приморская';
      case 'AWAY_PRIMORSKAYA':
        return 'Выезд: Приморская';
      case 'AWAY_OTHER':
        return 'Выезд: Город';
    }
  }
}

export class Cabinet {
  public constructor(
    public id: number,
    public name: string,
    public cabinetType: CabinetType,
  ) {}
}
