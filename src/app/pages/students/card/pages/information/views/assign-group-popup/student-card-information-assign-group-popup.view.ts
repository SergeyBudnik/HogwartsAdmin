import {Component, Input} from '@angular/core';
import {Group, StaffMember, Student, StudentGroup} from '../../../../../../../data';
import {GroupService} from '../../../../../../../service';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';
import {StudentGroupAndIndex} from '../../data/student-group-and-index';

export class StudentCardInformationAssignGroupPopupManager {
  private static popup: StudentCardInformationAssignGroupPopupView = null;
  private static saveListener: (studentGroup: StudentGroup) => void = null;
  private static deleteListener: () => void = null;

  public static register(popup: StudentCardInformationAssignGroupPopupView) {
    this.popup = popup;
  }

  public static pushStudentGroup(
    studentGroupAndIndex: StudentGroupAndIndex,
    saveListener: (studentGroup: StudentGroup) => void,
    deleteListener: () => void
  ) {
    if (!!this.popup) {
      this.popup.onStudentGroupInit(studentGroupAndIndex.group, studentGroupAndIndex.index);

      this.saveListener = saveListener;
      this.deleteListener = deleteListener;
    }
  }

  public static notifyGroupSaved(studentGroup: StudentGroup) {
    if (!!this.popup && !!this.saveListener) {
      this.saveListener(studentGroup);
    }
  }

  public static notifyGroupDeleted() {
    if (!!this.popup && !!this.deleteListener) {
      this.deleteListener();
    }
  }
}

@Component({
  selector: 'app-student-card-information-assign-group-popup',
  templateUrl: './student-card-information-assign-group-popup.view.html',
  styleUrls: ['./student-card-information-assign-group-popup.view.less']
})
export class StudentCardInformationAssignGroupPopupView {
  public modalStatus: ModalStatus = new ModalStatus(false);

  public studentGroup: StudentGroup = null;
  public studentGroupIndex: number = null;

  @Input('groups') public groups: Array<Group> = [];
  @Input('staffMembers') public staffMembers: Array<StaffMember> = [];
  @Input('students') public students: Array<Student> = [];

  public constructor(
    private groupService: GroupService
  ) {
    StudentCardInformationAssignGroupPopupManager.register(this);
  }

  public onStudentGroupInit(studentGroup: StudentGroup, studentGroupIndex: number) {
    this.studentGroup = StudentGroup.copy(studentGroup);
    this.studentGroupIndex = studentGroupIndex;

    this.modalStatus = new ModalStatus(true);
  }

  public getGroupName(group: Group): string {
    let staffMember = this.staffMembers.find(it => it.login === group.headTeacherLogin);
    let students = this.students.filter(student => student.studentGroups.map(it => it.groupId).indexOf(group.id) != -1);

    return (staffMember != null) ? this.groupService.getGroupName(
      group,
      staffMember,
      students
    ) : "?";
  }

  public onGroupChanged(groupId: number) {
    const finishTime = this.groups
      .find(it => it.id === groupId)
      .lessons
      .map(it => it.deactivationTime)
      .reduce((previous, current) => Math.max(previous, current), -1);

    this.studentGroup.groupId = groupId

    if (finishTime != -1) {
      this.studentGroup.finishTime = finishTime;
    }
  }

  public isNew(): boolean {
    return this.studentGroupIndex == null;
  }

  public isValid(): boolean {
    let hasGroupId = !!this.studentGroup.groupId;
    let hasStartTime = !!this.studentGroup.startTime;
    let hasFinishTime = !!this.studentGroup.finishTime;

    return hasGroupId && hasStartTime && hasFinishTime;
  }

  public save() {
    StudentCardInformationAssignGroupPopupManager.notifyGroupSaved(
      StudentGroup.copy(this.studentGroup)
    );

    this.hideModal();
  }

  public cancel() {
    this.hideModal();
  }

  public delete() {
    StudentCardInformationAssignGroupPopupManager.notifyGroupDeleted();

    this.hideModal();
  }

  private hideModal() {
    this.modalStatus.visible = false;
  }
}
