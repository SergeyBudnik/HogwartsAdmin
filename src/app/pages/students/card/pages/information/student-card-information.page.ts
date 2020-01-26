import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentsService, LoginService, NavigationService, TranslationService,} from '../../../../../service';
import {Student, EducationLevelUtils, Group, StudentGroup,  StaffMember} from '../../../../../data';
import {ToastsManager} from 'ng2-toastr';
import {SelectItem} from '../../../../../controls/select-item';
import {GroupsHttp, StaffMembersHttp} from '../../../../../http';
import {GroupService} from '../../../../../service';
import {StudentCardInformationAssignGroupPopupManager} from './components';

@Component({
  selector: 'app-student-card-information-page',
  templateUrl: './student-card-information.page.html',
  styleUrls: ['./student-card-information.page.less']
})
export class StudentCardInformationPage {
  public educationLevelItems = [];

  public student: Student = new Student();

  public loadingInProgress = true;

  private requestedGroupId: number;

  private allStudents: Array<Student> = [];
  private allGroups: Array<Group> = [];
  private allStaffMembers: Array<StaffMember> = [];

  public constructor(
    private navigationService: NavigationService,
    private translationService: TranslationService,
    private groupsService: GroupService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
    private staffMembersHttp: StaffMembersHttp,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    this.loginService.ifAuthenticated(() => {
      this.parseParams((studentId, groupId) => this.initStudent(studentId, groupId));
    });

    this.educationLevelItems = EducationLevelUtils.values.map(it => new SelectItem(
      this.translationService.educationLevel().translate(it),
      it
    ));
  }

  public addNewGroup(): void {
    StudentCardInformationAssignGroupPopupManager.pushStudentGroup(
      new StudentGroup(null, new Date().getTime(), null),
      null,
      (studentGroup: StudentGroup) => this.onGroupSaved(studentGroup, null),
      () => {}
    );
  }

  public editExistingGroup(studentGroup: StudentGroup, index: number) {
    StudentCardInformationAssignGroupPopupManager.pushStudentGroup(
      studentGroup,
      index,
      (studentGroup: StudentGroup) => this.onGroupSaved(studentGroup, index),
      () => this.onGroupDeleted(index)
    );
  }

  public goToStatus() {
    this.navigationService.students().id(this.student.id).status().go();
  }

  public goToGroup(groupId: number) {
    if (groupId !== null) {
      this.navigationService.groups().id(groupId).information().go();
    }
  }

  private onGroupSaved(studentGroup: StudentGroup, studentGroupIndex: number) {
    if (studentGroupIndex == null) {
      this.student.studentGroups.push(studentGroup);
    } else {
      this.student.studentGroups[studentGroupIndex] = studentGroup;
    }
  }

  private onGroupDeleted(studentGroupIndex: number) {
    let studentGroups: Array<StudentGroup> = [];

    for (let i = 0; i < this.student.studentGroups.length; i++) {
      if (i != studentGroupIndex) {
        studentGroups.push(this.student.studentGroups[i]);
      }
    }

    this.student.studentGroups = studentGroups;
  }

  public save(): void {
    this.loadingInProgress = true;

    if (this.student.id == null) { this.saveNew()} else { this.saveExisting() }
  }

  private saveNew() {
    this.studentsService.createStudent(this.student).then(studentId => {
      if (!!this.requestedGroupId) {
        this.navigationService.groups().id(this.requestedGroupId).students().go();
      } else {
        this.navigationService.students().id(studentId).information().go();
      }
    });
  }

  private saveExisting() {
    this.studentsService.editStudent(this.student).then(() => {
      this.loadingInProgress = false;

      this.toastr.success(`Студент '${this.student.name}' успешно сохранён.`);
    });
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.studentsService.deleteStudent(this.student.id).then(() => {
      this.navigationService.students().list().go();
    });
  }

  public getMatchingGroups(): Array<Group> {
    return new GroupService().getMatchingGroups(this.allGroups, this.student.age, this.student.educationLevel);
  }

  public getGroupName(groupId: number): string {
    let group = this.allGroups.find(it => it.id === groupId);
    let staffMember = this.allStaffMembers.find(it => it.login === group.headTeacherLogin);
    let students = this.groupsService.getGroupActiveStudents(group, this.allStudents, new Date().getTime());

    return new GroupService().getGroupName(staffMember, students);
  }

  public hasAtLeastOneContact(): boolean {
    return this.student.phones.length !== 0 || !!this.student.vkLink;
  }

  public goToVk() {
    window.open(`https://vk.com/${this.student.vkLink}`, '_blank');
  }

  private initStudent(studentId: number, groupId: number): void {
    Promise.all([
      this.studentsService.getAllStudents(),
      this.groupsHttp.getAllGroups(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.allStudents = it[0];
      this.allGroups = it[1];
      this.allStaffMembers = it[2];

      if (studentId == null) {
        this.student = new Student();

        if (groupId != null) {
          let group = this.allGroups.find(group => group.id === groupId);

          this.student.age = group.age;
          this.student.educationLevel = group.educationLevel;
          this.student.studentGroups = [new StudentGroup(group.id, new Date().getTime(), null)];
        }
      } else {
        this.student = this.allStudents.find(student => student.id === studentId);
      }

      this.loadingInProgress = false;
    })
  }

  private parseParams(onStudent: (studentId: number, groupId: number) => any) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id === 'new') {
        this.route.queryParams.subscribe(queryParams => {
            const groupId = queryParams['groupId'];

            if (!!groupId) {
              onStudent(null, Number(groupId));
            } else {
              onStudent(null, null);
            }
          });
      } else {
        onStudent(Number(id), null);
      }
    });
  }
}
