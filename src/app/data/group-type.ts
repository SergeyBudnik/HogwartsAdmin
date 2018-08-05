export type GroupType = 'GROUP' | 'INDIVIDUAL';

export class GroupTypeUtils {
  public static values: Array<GroupType> = ['GROUP', 'INDIVIDUAL'];

  public static getTranslation(groupType: GroupType): string {
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
