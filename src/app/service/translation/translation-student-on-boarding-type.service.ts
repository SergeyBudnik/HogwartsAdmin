import {StudentOnBoardingType} from '../../data';

export class TranslationStudentOnBoardingTypeService {
  public translate(studentOnBoardingType: StudentOnBoardingType): string {
    switch (studentOnBoardingType) {
      case 'PROGRESS':
        return 'В процессе';
      case 'ON_BOARDED':
        return 'Вступил';
      case 'CANCELED':
        return 'Отмена';
      default:
        throw Error(`Unexpected on-boarding type ${studentOnBoardingType}`);
    }
  }
}
