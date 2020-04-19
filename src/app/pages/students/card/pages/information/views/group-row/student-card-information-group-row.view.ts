import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group, StaffMember, Student, StudentGroup} from '../../../../../../../data';
import {GroupService, NavigationService} from '../../../../../../../service';
import {StudentGroupAndIndex} from '../../data/student-group-and-index';
import {StudentCardInformationAssignGroupPopupManager} from '../assign-group-popup/student-card-information-assign-group-popup.view';

@Component({
  selector: 'app-student-card-information-group-row',
  templateUrl: './student-card-information-group-row.view.html',
  styleUrls: ['./student-card-information-group-row.view.less']
})
export class StudentCardInformationGroupRowView {
  @Input() studentGroupAndIndex: StudentGroupAndIndex = null;

  @Input() allGroups: Array<Group> = [];
  @Input() allStaffMembers: Array<StaffMember> = [];
  @Input() allStudents: Array<Student> = [];

  @Output() onGroupSaved = new EventEmitter<StudentGroupAndIndex>();
  @Output() onGroupDeleted = new EventEmitter<number>();

  constructor(
    public navigationService: NavigationService,
    private groupsService: GroupService
  ) {}

  public editExistingGroup(studentGroupAndIndex: StudentGroupAndIndex) {
    StudentCardInformationAssignGroupPopupManager.pushStudentGroup(
      studentGroupAndIndex,
      (studentGroup: StudentGroup) => this.onGroupSaved.emit(new StudentGroupAndIndex(studentGroup, studentGroupAndIndex.index)),
      () => this.onGroupDeleted.emit(studentGroupAndIndex.index)
    );
  }

  public getGroupName(groupId: number): string {
    let group = this.allGroups.find(it => it.id === groupId);
    let staffMember = this.allStaffMembers.find(it => it.login === group.headTeacherLogin);
    let students = this.groupsService.getGroupActiveStudents(group, this.allStudents, new Date().getTime());

    return new GroupService().getGroupName(staffMember, students);
  }
}
