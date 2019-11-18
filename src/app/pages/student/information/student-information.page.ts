import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService,} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student, EducationLevelUtils, Group, StudentGroup, Teacher} from '../../../data';
import {ToastsManager} from 'ng2-toastr';
import {SelectItem} from '../../../controls/select-item';
import {GroupsHttp, TeachersHttp} from '../../../http';
import {StudentAssignGroupPopupManager} from '../../';
import {GroupService} from '../../../service';

@Component({
  selector: 'app-student-information-page',
  templateUrl: './student-information.page.html',
  styleUrls: ['./student-information.page.less']
})
export class StudentInformationPageComponent extends TranslatableComponent {
  public educationLevelItems = EducationLevelUtils.values.map(it => new SelectItem(this.getEducationLevelTranslation(it), it));

  public student: Student = new Student();

  public loadingInProgress = true;

  private requestedGroupId: number;

  private allStudents: Array<Student> = [];
  private allGroups: Array<Group> = [];
  private allTeachers: Array<Teacher> = [];

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
    private teachersHttp: TeachersHttp,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    super();

    this.toastr.setRootViewContainerRef(vcr);

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.parseParams((studentId, groupId) => this.initStudent(studentId, groupId));
    }
  }

  public addNewGroup(): void {
    StudentAssignGroupPopupManager.pushStudentGroup(
      new StudentGroup(null, new Date().getTime(), null),
      null,
      (studentGroup: StudentGroup) => this.onGroupSaved(studentGroup, null),
      () => {}
    );
  }

  public editExistingGroup(studentGroup: StudentGroup, index: number) {
    StudentAssignGroupPopupManager.pushStudentGroup(
      studentGroup,
      index,
      (studentGroup: StudentGroup) => this.onGroupSaved(studentGroup, index),
      () => this.onGroupDeleted(index)
    );
  }

  public goToStatus() {
    this.router.navigate([`/students/${this.student.id}/status`]);
  }

  public goToGroup(groupId: number) {
    if (groupId !== null) {
      this.router.navigate([`/groups/${groupId}/information`])
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
        this.router.navigate([`/groups/${this.requestedGroupId}/students`]);
      } else {
        this.router.navigate([`/students/${studentId}/information`]);
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
      this.router.navigate([`/students`]);
    });
  }

  public getMatchingGroups(): Array<Group> {
    return new GroupService().getMatchingGroups(this.allGroups, this.student.age, this.student.educationLevel);
  }

  public getGroupName(groupId: number): string {
    let group = this.allGroups.find(it => it.id === groupId);
    let teacher = this.allTeachers.find(it => it.id === group.managerId);
    let students = this.allStudents.filter(student => student.studentGroups.map(it => it.groupId).indexOf(groupId) != -1);

    return new GroupService().getGroupName(teacher, students);
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
      this.teachersHttp.getAllTeachers()
    ]).then(it => {
      this.allStudents = it[0];
      this.allGroups = it[1];
      this.allTeachers = it[2];

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
