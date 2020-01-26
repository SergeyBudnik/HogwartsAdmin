import {Age} from '../../data';

export class TranslationAgeService {
  public translate(age: Age): string {
    switch (age) {
      case 'UNKNOWN':
        return 'Не известно';
      case 'PRE_SCHOOL':
        return 'Дошкольная группа';
      case 'SCHOOL_1_3':
        return 'Группа 1-3 класс';
      case 'SCHOOL_5_7':
        return 'Группа 5-7 класс';
      case 'SCHOOL_8_9':
        return 'Группа 8-9 класс';
      case 'SCHOOL_10_11':
        return 'Группа 10-11 класс';
      case 'ADULT':
        return 'Взрослая группа';
      case 'SENIOR':
        return 'Пожилая группа';
      default:
        throw new Error(`Unexpected age ${age}`);
    }
  }
}
