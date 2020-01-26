import {DayOfWeek} from '../../data';

export class TranslationDayOfWeekService {
  public translate(dayOfWeek: DayOfWeek): string {
    switch (dayOfWeek) {
      case 'MONDAY':
        return 'Пн';
      case 'TUESDAY':
        return 'Вт';
      case 'WEDNESDAY':
        return 'Ср';
      case 'THURSDAY':
        return 'Чт';
      case 'FRIDAY':
        return 'Пт';
      case 'SATURDAY':
        return 'Сб';
      case 'SUNDAY':
        return 'Вс';
      default:
        throw new Error(`Unexpected day of week ${dayOfWeek}`);
    }
  }
}
