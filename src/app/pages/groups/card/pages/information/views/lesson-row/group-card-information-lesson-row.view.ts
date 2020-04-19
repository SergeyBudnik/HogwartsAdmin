import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output('editLesson') public editLessonEmitter = new EventEmitter();

  constructor(public translationService: TranslationService) {}

  public getTeacherName(): string {
    let teacher = this.staffMembers.find(it => it.login === this.groupLessonInfo.lesson.teacherLogin);

    return !!teacher ? teacher.person.name : "?";
  }

  public editLesson() {
    this.editLessonEmitter.emit(this.groupLessonInfo);
  }
}
