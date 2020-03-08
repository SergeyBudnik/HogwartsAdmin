import {Component, Input} from '@angular/core';
import {Group, StaffMember, Student, StudentGroup} from '../../../../../../../data';
import {SelectItem} from '../../../../../../../controls/select-item';
import {GroupService} from '../../../../../../../service';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';
import {StudentGroupAndIndex} from '../../data/student-group-and-index';

export class StudentCardInformationAssignGroupPopupManager {
  private static popup: StudentCardInformationAssignGroupPopup = null;
  private static saveListener: (studentGroup: StudentGroup) => void = null;
  private static deleteListener: () => void = null;

  public static register(popup: StudentCardInformationAssignGroupPopup) {
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

type StudentAssignGroupStatus = 'ACTIVE' | 'DISABLED';

@Component({
  selector: 'app-student-card-information-assign-group-popup',
  templateUrl: './student-card-information-assign-group.popup.html',
  styleUrls: ['./student-card-information-assign-group.popup.less']
})
export class StudentCardInformationAssignGroupPopup {
  public modalStatus: ModalStatus = new ModalStatus(false);

  public studentGroup: StudentGroup = null;
  public studentGroupIndex: number = null;
  public studentGroupStatus: StudentAssignGroupStatus = null;

  @Input('groups') public groups: Array<Group> = [];
  @Input('staffMembers') public staffMembers: Array<StaffMember> = [];
  @Input('students') public students: Array<Student> = [];

  public constructor() {
    StudentCardInformationAssignGroupPopupManager.register(this);
  }

  public onStudentGroupInit(studentGroup: StudentGroup, studentGroupIndex: number) {
    this.studentGroup = StudentGroup.copy(studentGroup);
    this.studentGroupIndex = studentGroupIndex;
    this.studentGroupStatus = (studentGroup.finishTime == null) ? 'ACTIVE' : 'DISABLED';

    this.modalStatus = new ModalStatus(true);
  }

  public getGroupItems(): Array<SelectItem> {
    return this.groups.map(it => new SelectItem(this.getGroupName(it), '' + it.id));
  }

  public getGroupName(group: Group): string {
    let staffMember = this.staffMembers.find(it => it.login === group.headTeacherLogin);
    let students = this.students.filter(student => student.studentGroups.map(it => it.groupId).indexOf(group.id) != -1);

    return (staffMember != null) ? new GroupService().getGroupName(staffMember, students) : "?";
  }

  public isNew(): boolean {
    return this.studentGroupIndex == null;
  }

  public isValid(): boolean {
    let hasGroupId = !!this.studentGroup.groupId;
    let hasStartTime = !!this.studentGroup.startTime;
    let hasFinishTime = !!this.studentGroup.finishTime;

    let isActive = this.studentGroupStatus === 'ACTIVE';

    return hasGroupId && hasStartTime && (isActive || hasFinishTime);
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
