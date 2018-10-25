import {TranslateService} from '@ngx-translate/core';

export type StudentPaymentStatus = 'PAYED' | 'NOT_PAYED';

export class StudentPaymentStatusUtils {
  public static values: Array<StudentPaymentStatus> = ['PAYED', 'NOT_PAYED'];

  public static enableTranslationsRu(translateService: TranslateService) {
    translateService.setTranslation('ru', {
      PAYED: 'Оплачено',
      NOT_PAYED: 'Не оплачено'
    }, true);
  }
}
