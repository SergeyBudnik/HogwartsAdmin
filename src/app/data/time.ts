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
  'T_21_00' | 'T_21_30';

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

  public static getTranslation(time: Time): string {
    switch (time) {
      case 'T_07_00':
        return '07:00';
      case 'T_07_30':
        return '07:30';
      case 'T_08_00':
        return '08:00';
      case 'T_08_30':
        return '08:30';
      case 'T_09_00':
        return '09:00';
      case 'T_09_30':
        return '09:30';
      case 'T_10_00':
        return '10:00';
      case 'T_10_30':
        return '10:30';
      case 'T_11_00':
        return '11:00';
      case 'T_11_30':
        return '11:30';
      case 'T_12_00':
        return '12:00';
      case 'T_12_30':
        return '12:30';
      case 'T_13_00':
        return '13:00';
      case 'T_13_30':
        return '13:30';
      case 'T_14_00':
        return '14:00';
      case 'T_14_30':
        return '14:30';
      case 'T_15_00':
        return '15:00';
      case 'T_15_30':
        return '15:30';
      case 'T_16_00':
        return '16:00';
      case 'T_16_30':
        return '16:30';
      case 'T_17_00':
        return '17:00';
      case 'T_17_30':
        return '17:30';
      case 'T_18_00':
        return '18:00';
      case 'T_18_30':
        return '18:30';
      case 'T_19_00':
        return '19:00';
      case 'T_19_30':
        return '19:30';
      case 'T_20_00':
        return '20:00';
      case 'T_20_30':
        return '20:30';
      case 'T_21_00':
        return '21:00';
      case 'T_21_30':
        return '21:30';
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
}
