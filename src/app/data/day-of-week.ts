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

  public static earlier(t1: DayOfWeek, t2: DayOfWeek): boolean {
    return DayOfWeekUtils.index(t1) < DayOfWeekUtils.index(t2);
  }

  public static index(dayOfWeek: DayOfWeek): number {
    for (let i = 0; i < DayOfWeekUtils.values.length; i++) {
      if (DayOfWeekUtils.values[i] === dayOfWeek) {
        return i;
      }
    }

    throw new Error(`Unexpected time ${dayOfWeek}`);
  }
}
