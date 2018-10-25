import {EducationLevel} from './education-level';
import {Age} from './age';
import {StudentStatusType} from './student-status';

export type StudentReferralSource = 'UNKNOWN' | 'LEAFLET' | 'VK_SEARCH' | 'SEARCH_ENGINE' | 'FRIEND_RECOMMENDATION';

export class StudentReferralSourceUtils {
  public static values: Array<StudentReferralSource> = [
    'UNKNOWN', 'LEAFLET', 'VK_SEARCH', 'SEARCH_ENGINE', 'FRIEND_RECOMMENDATION'
  ];

  public static getReferralSourceTranslation(referralSource: StudentReferralSource): string {
    switch (referralSource) {
      case 'UNKNOWN':
        return 'Не известно';
      case 'LEAFLET':
        return 'Листовки';
      case 'VK_SEARCH':
        return 'Поиск VK';
      case 'SEARCH_ENGINE':
        return 'Поисковые системы';
      case 'FRIEND_RECOMMENDATION':
        return 'Рекомендация друга';
      default:
        throw new Error(`Unexpected referral source ${referralSource}`);
    }
  }
}

export class Student {
  public constructor(
    public id: number = null,
    public groupIds: Array<number> = [],
    public name: string = null,
    public statusType: StudentStatusType = 'STUDYING',
    public emails: Array<string> = [],
    public phones: Array<string> = [],
    public age: Age = 'UNKNOWN',
    public educationLevel: EducationLevel = 'UNKNOWN',
    public referralSource: StudentReferralSource = 'UNKNOWN'
  ) {}
}

export class StudentUtils {
  public static isValid(student: Student) {
    const nameValid = !!student.name && student.name.indexOf('?') === -1;

    const educationLevelKnown = student.educationLevel !== 'UNKNOWN';
    const ageKnown = student.age !== 'UNKNOWN';
    const referralSourceKnown = student.referralSource !== 'UNKNOWN';
    const hasAtLeastOneContact = student.phones.length !== 0 || student.emails.length !== 0;

    return nameValid && educationLevelKnown && ageKnown && referralSourceKnown && hasAtLeastOneContact;
  }
}
