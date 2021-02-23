export class DatesUtils {
  public static buildDateYMDFromDate(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, 0, 0, 0
    );
  }

  public static buildDateYMDFromYMD(year: number, month: number, date: number): Date {
    return new Date(
      year,
      month,
      date,
      0, 0, 0, 0
    );
  }
}
