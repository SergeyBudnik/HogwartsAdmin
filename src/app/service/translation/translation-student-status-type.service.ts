import {StudentStatusType} from '../../data';

export class TranslationStudentStatusTypeService {
  public translate(studentStatusType: StudentStatusType): string {
    switch (studentStatusType) {
      case 'STUDYING':
        return 'Занимается';
      case 'STOPPED':
        return 'Приостановил';
      case 'LEFT':
        return 'Покинул';
      default:
        throw new Error(`Unexpected student status ${studentStatusType}`);
    }
  }
}
