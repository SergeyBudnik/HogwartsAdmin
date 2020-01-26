import {GroupType} from '../../data';

export class TranslationGroupTypeService {
  public translate(groupType: GroupType): string {
    switch (groupType) {
      case 'GROUP':
        return 'Групповые';
      case 'INDIVIDUAL':
        return 'Индивидуальные';
      default:
        throw Error(`Unexpected group type ${groupType}`);
    }
  }
}
