import {TranslateService} from '@ngx-translate/core';

export type EventStatus = 'PENDING' | 'ON_GOING' | 'FINISHED';

export class EventStatusUtils {
  public static enableTranslationsRu(translateService: TranslateService) {
    translateService.setTranslation('ru', {
      PENDING: 'Состоится',
      ON_GOING: 'В процессе',
      FINISHED: 'Закончилось'
    }, true);
  }
}
