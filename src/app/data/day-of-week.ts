export type DayOfWeek =
  'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export class DayOfWeekUtils {
  public static values: Array<DayOfWeek> =
    ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  public static getShortTranslation(dayOfWeek: DayOfWeek): string {
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
