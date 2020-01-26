export type DayOfWeek =
  'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export class DayOfWeekUtils {
  public static values: Array<DayOfWeek> =
    ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  public static index(dayOfWeek: DayOfWeek): number {
    for (let i = 0; i < DayOfWeekUtils.values.length; i++) {
      if (DayOfWeekUtils.values[i] === dayOfWeek) {
        return i;
      }
    }

    throw new Error(`Unexpected time ${dayOfWeek}`);
  }
}
