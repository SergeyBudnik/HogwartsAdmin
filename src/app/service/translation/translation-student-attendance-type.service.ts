import {StudentAttendanceType} from '../../data';

export class TranslationStudentAttendanceTypeService {
  public translate(studentAttendanceType: StudentAttendanceType): string {
    switch (studentAttendanceType) {
      case 'VISITED':
        return 'Посещено';
      case 'VALID_SKIP':
        return 'Уважительный пропуск';
      case 'INVALID_SKIP':
        return 'Пропуск';
      default:
        throw new Error(`Unexpected attendance type ${studentAttendanceType}`);
    }
  }
}
