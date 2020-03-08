import {Lesson} from '../../../../../../data';

export class GroupLessonInfo {
  constructor(
    readonly lesson: Lesson,
    readonly index: number,
    readonly visible: boolean
  ) {}
}
