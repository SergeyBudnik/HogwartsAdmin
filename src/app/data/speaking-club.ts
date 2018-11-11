import {Time} from './time';
import {TranslateService} from '@ngx-translate/core';

export type EventType = 'TEST_LESSON' | 'OPEN_LESSON' | 'SPEAKING_CLUB' | 'HOLIDAY'

export class EventTypeUtils {
  public static values = ['TEST_LESSON', 'OPEN_LESSON', 'SPEAKING_CLUB', 'HOLIDAY'];

  public static enableTranslationsRu(translateService: TranslateService) {
    translateService.setTranslation('ru', {
      TEST_LESSON: 'Тестирование',
      OPEN_LESSON: 'Открытый урок',
      SPEAKING_CLUB: 'Разговорный клуб',
      HOLIDAY: 'Праздник'
    }, true);
  }
}

export class Event {
  public constructor(
    public id: number = null,
    public eventType: EventType = null,
    public name: String = "",
    public cabinetId: number = null,
    public teacherId: number = null,
    public date: number = Date.now(),
    public startTime: Time = null,
    public finishTime: Time = null,
  ) {}
}
