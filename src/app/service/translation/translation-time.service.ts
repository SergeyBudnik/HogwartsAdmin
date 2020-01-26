import {Time} from '../../data';

export class TranslationTimeService {
  public translate(time: Time): string {
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
}
