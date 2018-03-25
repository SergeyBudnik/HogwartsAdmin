export type EducationLevel =
  'UNKNOWN' | 'BEGINNER' | 'ELEMENTARY' | 'PRE_INTERMEDIATE' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'PRE_ADVANCED' | 'ADVANCED';

export class EducationLevelUtils {
  public static values: Array<EducationLevel> =
    ['UNKNOWN', 'BEGINNER', 'ELEMENTARY', 'PRE_INTERMEDIATE', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'PRE_ADVANCED', 'ADVANCED'];

  public static getTranslation(educationLevel: EducationLevel): string {
    switch (educationLevel) {
      case 'UNKNOWN':
        return 'Не известно';
      case 'BEGINNER':
        return 'Beginner';
      case 'ELEMENTARY':
        return 'Elementary';
      case 'PRE_INTERMEDIATE':
        return 'Pre-Intermediate';
      case 'INTERMEDIATE':
        return 'Intermediate';
      case 'UPPER_INTERMEDIATE':
        return 'Upper-Intermediate';
      case 'PRE_ADVANCED':
        return 'Pre-advanced';
      case 'ADVANCED':
        return 'Advanced';
    }
  }
}
