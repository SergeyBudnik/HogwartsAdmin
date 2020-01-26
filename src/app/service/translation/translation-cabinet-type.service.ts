import {CabinetType} from '../../data';

export class TranslationCabinetTypeService {
  public translate(cabinetType: CabinetType) {
    switch (cabinetType) {
      case 'HOGWARTS_PRIMORSKAYA':
        return 'Офис Hogwarts: Приморская';
      case 'AWAY_PRIMORSKAYA':
        return 'Выезд: Приморская';
      case 'AWAY_OTHER':
        return 'Выезд: Город';
      default:
        throw new Error(`Unexpected cabinet type ${cabinetType}`);
    }
  }
}
