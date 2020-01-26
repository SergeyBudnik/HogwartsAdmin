export type EducationLevel =
  'UNKNOWN' | 'BEGINNER' | 'ELEMENTARY' | 'PRE_INTERMEDIATE' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'PRE_ADVANCED' | 'ADVANCED';

export class EducationLevelUtils {
  public static values: Array<EducationLevel> =
    ['UNKNOWN', 'BEGINNER', 'ELEMENTARY', 'PRE_INTERMEDIATE', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'PRE_ADVANCED', 'ADVANCED'];
}
