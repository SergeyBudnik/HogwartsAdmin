import {EducationLevel} from '../../data';

export class TranslationEducationLevelService {
  public translate(educationLevel: EducationLevel): string {
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
