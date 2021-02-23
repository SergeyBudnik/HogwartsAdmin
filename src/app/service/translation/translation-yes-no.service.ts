import {YesNo} from '../../data/yes-no';

export class TranslationYesNoService {
  public translate(yesNo: YesNo): string {
    switch (yesNo) {
      case 'YES':
        return 'Да';
      case 'NO':
        return 'Нет';
    }
  }
}
