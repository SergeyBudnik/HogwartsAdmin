import {Component, Input} from '@angular/core';
import {StaffMember} from '../../../../../../../data';
import {TranslationService} from '../../../../../../../service';
import {GroupLessonInfo} from '../../data';

@Component({
  selector: 'app-group-card-information-lesson-row',
  templateUrl: './group-card-information-lesson-row.view.html',
  styleUrls: ['./group-card-information-lesson-row.view.less']
})
export class GroupCardInformationLessonRowView {
  @Input('groupLessonInfo') public groupLessonInfo: GroupLessonInfo;
  @Input('staffMembers') public staffMembers: Array<StaffMember>;

  constructor(public translationService: TranslationService) {}

  public getTeacherName(): string {
    let teacher = this.staffMembers.find(it => it.login === this.groupLessonInfo.lesson.teacherLogin);

    return !!teacher ? teacher.person.name : "?";
  }
}
