import {TranslateService} from '@ngx-translate/core';

export type StudentStatusType =
  'STUDYING' |
  'STOPPED' |
  'LEFT'

export class StudentStatusTypeUtils {
  public static values: Array<StudentStatusType> =
    [
      'STUDYING',
      'STOPPED',
      'LEFT'
    ];

  public static getStudentStatusTypeTranslation(studentStatus: StudentStatusType): string {
    switch (studentStatus) {
      case 'STUDYING':
        return 'Занимается';
      case 'STOPPED':
        return 'Приостановил';
      case 'LEFT':
        return 'Покинул';
      default:
        throw new Error(`Unexpected student status ${studentStatus}`);
    }
  }

  public static compare(s1: StudentStatusType, s2: StudentStatusType): number {
    let i1 = StudentStatusTypeUtils.values.findIndex(it => it == s1);
    let i2 = StudentStatusTypeUtils.values.findIndex(it => it == s2);

    return i1 - i2;
  }

  public static enableTranslationsRu(translateService: TranslateService) {
    translateService.setTranslation('ru', {
      STUDYING: 'Занимается',
      STOPPED: 'Приостановил',
      LEFT: 'Покинул'
    }, true);
  }
}

export class StudentStatus {
  public constructor(
    public id: number,
    public studentId: number,
    public status: StudentStatusType,
    public creationTime: number,
    public actionTime: number
  ) {}
}
