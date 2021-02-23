export type Time =
  'T_07_00' | 'T_07_30' |
  'T_08_00' | 'T_08_30' |
  'T_09_00' | 'T_09_30' |
  'T_10_00' | 'T_10_30' |
  'T_11_00' | 'T_11_30' |
  'T_12_00' | 'T_12_30' |
  'T_13_00' | 'T_13_30' |
  'T_14_00' | 'T_14_30' |
  'T_15_00' | 'T_15_30' |
  'T_16_00' | 'T_16_30' |
  'T_17_00' | 'T_17_30' |
  'T_18_00' | 'T_18_30' |
  'T_19_00' | 'T_19_30' |
  'T_20_00' | 'T_20_30' |
  'T_21_00' | 'T_21_30' |
  'T_22_00';

export class TimeUtils {
  public static values: Array<Time> =
    [
      'T_07_00', 'T_07_30',
      'T_08_00', 'T_08_30',
      'T_09_00', 'T_09_30',
      'T_10_00', 'T_10_30',
      'T_11_00', 'T_11_30',
      'T_12_00', 'T_12_30',
      'T_13_00', 'T_13_30',
      'T_14_00', 'T_14_30',
      'T_15_00', 'T_15_30',
      'T_16_00', 'T_16_30',
      'T_17_00', 'T_17_30',
      'T_18_00', 'T_18_30',
      'T_19_00', 'T_19_30',
      'T_20_00', 'T_20_30',
      'T_21_00', 'T_21_30',
      'T_22_00'
    ];

  public static earlier(t1: Time, t2: Time) {
    return TimeUtils.index(t1) < TimeUtils.index(t2);
  }

  public static later(t1: Time, t2: Time) {
    return TimeUtils.index(t1) > TimeUtils.index(t2);
  }

  public static range(start: Time, finish: Time): Array<Time> {
    const res = [];

    let rangeStarted = false;
    let rangeFinished = false;

    res.push(start);

    TimeUtils.values.forEach(time => {
      if (!rangeFinished) {
        if (time === finish) {
          rangeFinished = true;
        }
      }

      if (rangeStarted && !rangeFinished) {
        res.push(time);
      }

      if (!rangeStarted) {
        if (time === start) {
          rangeStarted = true;
        }
      }
    });

    return res;
  }

  public static fromDate(date: Date): Time {
    let h = date.getHours();
    let m = date.getMinutes();

    if      (h ==  7 && m ==  0) { return 'T_07_00'; }
    else if (h ==  7 && m == 30) { return 'T_07_30'; }
    else if (h ==  8 && m ==  0) { return 'T_08_00'; }
    else if (h ==  8 && m == 30) { return 'T_08_30'; }
    else if (h ==  9 && m ==  0) { return 'T_09_00'; }
    else if (h ==  9 && m == 30) { return 'T_09_30'; }
    else if (h == 10 && m ==  0) { return 'T_10_00'; }
    else if (h == 10 && m == 30) { return 'T_10_30'; }
    else if (h == 11 && m ==  0) { return 'T_11_00'; }
    else if (h == 11 && m == 30) { return 'T_11_30'; }
    else if (h == 12 && m ==  0) { return 'T_12_00'; }
    else if (h == 12 && m == 30) { return 'T_12_30'; }
    else if (h == 13 && m ==  0) { return 'T_13_00'; }
    else if (h == 13 && m == 30) { return 'T_13_30'; }
    else if (h == 14 && m ==  0) { return 'T_14_00'; }
    else if (h == 14 && m == 30) { return 'T_14_30'; }
    else if (h == 15 && m ==  0) { return 'T_15_00'; }
    else if (h == 15 && m == 30) { return 'T_15_30'; }
    else if (h == 16 && m ==  0) { return 'T_16_00'; }
    else if (h == 16 && m == 30) { return 'T_16_30'; }
    else if (h == 17 && m ==  0) { return 'T_17_00'; }
    else if (h == 17 && m == 30) { return 'T_17_30'; }
    else if (h == 18 && m ==  0) { return 'T_18_00'; }
    else if (h == 18 && m == 30) { return 'T_18_30'; }
    else if (h == 19 && m ==  0) { return 'T_19_00'; }
    else if (h == 19 && m == 30) { return 'T_19_30'; }
    else if (h == 20 && m ==  0) { return 'T_20_00'; }
    else if (h == 20 && m == 30) { return 'T_20_30'; }
    else if (h == 21 && m ==  0) { return 'T_21_00'; }
    else if (h == 21 && m == 30) { return 'T_21_30'; }
    else if (h == 22 && m ==  0) { return 'T_22_00'; }
    else                         { return 'T_08_00'; }
  }

  public static getTimeMills(time: Time): number {
    let minute = 60 * 1000;
    let hour = 60 * minute;

    switch (time) {
      case 'T_07_00':
        return 7 * hour;
      case 'T_07_30':
        return 7 * hour + 30 * minute;
      case 'T_08_00':
        return 8 * hour;
      case 'T_08_30':
        return 8 * hour + 30 * minute;
      case 'T_09_00':
        return 9 * hour;
      case 'T_09_30':
        return 9 * hour + 30 * minute;
      case 'T_10_00':
        return 10 * hour;
      case 'T_10_30':
        return 10 * hour + 30 * minute;
      case 'T_11_00':
        return 11 * hour;
      case 'T_11_30':
        return 11 * hour + 30 * minute;
      case 'T_12_00':
        return 12 * hour;
      case 'T_12_30':
        return 12 * hour + 30 * minute;
      case 'T_13_00':
        return 13 * hour;
      case 'T_13_30':
        return 13 * hour + 30 * minute;
      case 'T_14_00':
        return 14 * hour;
      case 'T_14_30':
        return 14 * hour + 30 * minute;
      case 'T_15_00':
        return 15 * hour;
      case 'T_15_30':
        return 15 * hour + 30 * minute;
      case 'T_16_00':
        return 16 * hour;
      case 'T_16_30':
        return 16 * hour + 30 * minute;
      case 'T_17_00':
        return 17 * hour;
      case 'T_17_30':
        return 17 * hour + 30 * minute;
      case 'T_18_00':
        return 18 * hour;
      case 'T_18_30':
        return 18 * hour + 30 * minute;
      case 'T_19_00':
        return 19 * hour;
      case 'T_19_30':
        return 19 * hour + 30 * minute;
      case 'T_20_00':
        return 20 * hour;
      case 'T_20_30':
        return 20 * hour + 30 * minute;
      case 'T_21_00':
        return 21 * hour;
      case 'T_21_30':
        return 21 * hour + 30 * minute;
      case 'T_22_00':
        return 22 * hour;
      default:
        throw new Error(`Unexpected time ${time}`);
    }
  }

  public static index(time: Time): number {
    for (let i = 0; i < TimeUtils.values.length; i++) {
      if (TimeUtils.values[i] === time) {
        return i;
      }
    }

    throw new Error(`Unexpected time ${time}`);
  }

  public static byIndex(index: number): Time {
    if (TimeUtils.values.length <= index) {
      throw new Error(`Unexpected time index ${index}`);
    } else {
      return TimeUtils.values[index];
    }
  }
}
