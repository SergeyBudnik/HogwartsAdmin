import {Age} from './age';
import {EducationLevel} from './education-level';
import {Lesson} from './lesson';

export class Group {
  public constructor(
    public id: number = null,
    public cabinetId: number = null,
    public name: string = null,
    public bookName: string = null,
    public lessons: Array<Lesson> = [],
    public age: Age = 'UNKNOWN',
    public educationLevel: EducationLevel = 'UNKNOWN',
    public color: string = '#FF0000'
  ) {}
}
