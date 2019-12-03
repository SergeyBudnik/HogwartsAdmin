import {Injectable} from '@angular/core';
import {StudentPaymentStatusUtils, StudentStatusTypeUtils, TimeUtils} from '../data';
import {TranslateService} from '@ngx-translate/core';

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
  }
}
