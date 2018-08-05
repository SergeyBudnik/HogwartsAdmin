import {Age} from './age';
import {EducationLevel} from './education-level';
import {Lesson} from './lesson';
import {GroupType} from './group-type';

export class Group {
  public constructor(
    public id: number = null,
    public cabinetId: number = null,
    public managerId: number = null,
    public bookName: string = null,
    public type: GroupType = null,
    public lessons: Array<Lesson> = [],
    public age: Age = 'UNKNOWN',
    public educationLevel: EducationLevel = 'UNKNOWN',
    public color: string = '#FF0000'
  ) {}
}
