import {Component, Input} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Group, StaffMember, Student, StudentGroup, Teacher} from '../../../data';
import {SelectItem} from '../../../controls/select-item';
import {GroupService} from '../../../service';

export class StudentAssignGroupPopupManager {
  private static popup: StudentAssignGroupPopupComponent = null;
  private static saveListener: (studentGroup: StudentGroup) => void = null;
  private static deleteListener: () => void = null;

  public static register(popup: StudentAssignGroupPopupComponent) {
    this.popup = popup;
  }

  public static pushStudentGroup(
    studentGroup: StudentGroup,
    studentGroupIndex: number,
    saveListener: (studentGroup: StudentGroup) => void,
    deleteListener: () => void
  ) {
    if (!!this.popup) {
      this.popup.onStudentGroupInit(studentGroup, studentGroupIndex);

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
  selector: 'app-student-assign-group-popup',
  templateUrl: './student-assign-group.popup.html',
  styleUrls: ['./student-assign-group.popup.less']
})
export class StudentAssignGroupPopupComponent extends TranslatableComponent {
  public modalVisible = true;

  public studentGroup: StudentGroup = null;
  public studentGroupIndex: number = null;
  public studentGroupStatus: StudentAssignGroupStatus = null;

  @Input('groups') public groups: Array<Group> = [];
  @Input('staffMembers') public staffMembers: Array<StaffMember> = [];
  @Input('students') public students: Array<Student> = [];

  public constructor() {
    super();

    StudentAssignGroupPopupManager.register(this);
  }

  public onStudentGroupInit(studentGroup: StudentGroup, studentGroupIndex: number) {
    this.studentGroup = StudentGroup.copy(studentGroup);
    this.studentGroupIndex = studentGroupIndex;
    this.studentGroupStatus = (studentGroup.finishTime == null) ? 'ACTIVE' : 'DISABLED';
  }

  public getGroupItems(): Array<SelectItem> {
    return this.groups.map(it => new SelectItem(this.getGroupName(it), '' + it.id));
  }

  public getStatusItems(): Array<SelectItem> {
    return [new SelectItem('Записан', 'ACTIVE'), new SelectItem('Покинул', 'DISABLED')];
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
    StudentAssignGroupPopupManager.notifyGroupSaved(
      StudentGroup.copy(this.studentGroup)
    );

    this.toggleModal();
  }

  public delete() {
    StudentAssignGroupPopupManager.notifyGroupDeleted();

    this.toggleModal();
  }

  public cancel() {
    this.toggleModal();
  }

  private toggleModal() {
    this.modalVisible = !this.modalVisible;
  }
}
