import {Injectable} from '@angular/core';
import {EventTypeUtils, StudentPaymentStatusUtils, StudentStatusTypeUtils, TimeUtils} from '../data';
import {TranslateService} from '@ngx-translate/core';
import {EventStatusUtils} from '../data/event-status';

@Injectable()
export class AppTranslationsService {
  public constructor(
    private translateService: TranslateService
  ) {}

  public enableTranslations() {
    this.translateService.setDefaultLang('ru');

    StudentStatusTypeUtils.enableTranslationsRu(this.translateService);
    StudentPaymentStatusUtils.enableTranslationsRu(this.translateService);
    TimeUtils.enableTranslationsRu(this.translateService);
    EventStatusUtils.enableTranslationsRu(this.translateService);
    EventTypeUtils.enableTranslationsRu(this.translateService);
  }
}
