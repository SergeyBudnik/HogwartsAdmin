import {EducationLevel, EducationLevelUtils} from '../data/education-level';
import {Age, AgeUtils} from '../data/age';
import {DayOfWeek, DayOfWeekUtils} from '../data/day-of-week';
import {Time, TimeUtils} from '../data/time';
import {CabinetType, CabinetTypeUtils} from '../data/cabinet';
import {
  StudentReferralSource, StudentReferralSourceUtils, StudentStatusType, StudentStatusTypeUtils, TeacherType,
  TeacherTypeUtils
} from '../data';

export abstract class TranslatableComponent {
  public getStudentReferralSourceTranslation(studentReferralSource: StudentReferralSource): string {
    return StudentReferralSourceUtils.getReferralSourceTranslation(studentReferralSource);
  }

  public getEducationLevelTranslation(educationLevel: EducationLevel): string {
    return EducationLevelUtils.getTranslation(educationLevel);
  }

  public getAgeTranslationAsGroup(age: Age): string {
    return AgeUtils.getTranslationAsGroup(age);
  }

  public getStudentStatusTypeTranslation(studentStatusType: StudentStatusType): string {
    return StudentStatusTypeUtils.getStudentStatusTypeTranslation(studentStatusType);
  }

  public getDayOfWeekTranslation(dayOfWeek: DayOfWeek): string {
    return DayOfWeekUtils.getShortTranslation(dayOfWeek);
  }

  public getTimeTranslation(time: Time): string {
    return TimeUtils.getTranslation(time);
  }

  public getCabinetTypeTranslation(cabinetType: CabinetType): string {
    return CabinetTypeUtils.getTranslation(cabinetType);
  }

  public getTeacherTypeTranslation(teacherType: TeacherType): string {
    return TeacherTypeUtils.getTranslation(teacherType);
  }
}
