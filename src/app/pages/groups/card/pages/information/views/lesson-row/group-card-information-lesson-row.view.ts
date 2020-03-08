import {Component, Input} from '@angular/core';
import {Lesson, StaffMember} from '../../../../../../../data';
import {TranslationService} from '../../../../../../../service';

@Component({
  selector: 'app-group-card-information-lesson-row',
  templateUrl: './group-card-information-lesson-row.view.html',
  styleUrls: ['./group-card-information-lesson-row.view.less']
})
export class GroupCardInformationLessonRowView {
  @Input('lesson') public lesson: Lesson;
  @Input('staffMembers') public staffMembers: Array<StaffMember>;

  constructor(public translationService: TranslationService) {}

  public getTeacherName(): string {
    let teacher = this.staffMembers.find(it => it.login === this.lesson.teacherLogin);

    return !!teacher ? teacher.person.name : "?";
  }
}
