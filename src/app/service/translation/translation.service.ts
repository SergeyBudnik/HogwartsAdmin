import {
  TranslationAgeService,
  TranslationDayOfWeekService,
  TranslationEducationLevelService,
  TranslationGroupTypeService,
  TranslationStudentAttendanceTypeService,
  TranslationStudentOnBoardingTypeService,
  TranslationStudentStatusTypeService,
  TranslationTimeService
} from '.';

export class TranslationService {
  public age(): TranslationAgeService {
    return new TranslationAgeService();
  }

  public dayOfWeek(): TranslationDayOfWeekService {
    return new TranslationDayOfWeekService();
  }

  public educationLevel(): TranslationEducationLevelService {
    return new TranslationEducationLevelService();
  }

  public groupType(): TranslationGroupTypeService {
    return new TranslationGroupTypeService();
  }

  public studentAttendanceType(): TranslationStudentAttendanceTypeService {
    return new TranslationStudentAttendanceTypeService();
  }

  public studentOnBoardingType(): TranslationStudentOnBoardingTypeService {
    return new TranslationStudentOnBoardingTypeService();
  }

  public studentStatusType(): TranslationStudentStatusTypeService {
    return new TranslationStudentStatusTypeService();
  }

  public time(): TranslationTimeService {
    return new TranslationTimeService();
  }
}
