import {Age} from './age';
import {EducationLevel} from './education-level';

export class EducationInfo {
  constructor(
    public age: Age = 'UNKNOWN',
    public level: EducationLevel = 'UNKNOWN'
  ) {}
}
