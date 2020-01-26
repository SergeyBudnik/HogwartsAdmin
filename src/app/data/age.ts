// todo: rename to EducationAge

export type Age =
  'UNKNOWN' | 'PRE_SCHOOL' | 'SCHOOL_1_3' | 'SCHOOL_5_7' | 'SCHOOL_8_9' | 'SCHOOL_10_11' | 'ADULT' | 'SENIOR';

export class AgeUtils {
  public static values: Array<Age> =
    ['UNKNOWN', 'PRE_SCHOOL', 'SCHOOL_1_3', 'SCHOOL_5_7', 'SCHOOL_8_9', 'SCHOOL_10_11', 'ADULT', 'SENIOR'];
}
