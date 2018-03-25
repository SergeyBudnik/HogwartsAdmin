import {Lesson} from '../data/lesson';
import {Injectable} from '@angular/core';

@Injectable()
export class LessonsService {
  public getTeacherLessons(teacherId: number): Promise<Array<Lesson>> {
    return Promise.resolve([]);
  }

  public getGroupLessons(groupId: number): Promise<Array<Lesson>> {
    return Promise.resolve([]);
  }

  public getCabinetLessons(cabinetId: number): Promise<Array<Lesson>> {
    return Promise.resolve([]);
  }
}
