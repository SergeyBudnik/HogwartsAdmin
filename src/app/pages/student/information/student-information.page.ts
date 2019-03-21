import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService,} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student, EducationLevelUtils, Group, AgeUtils} from '../../../data';
import {ToastsManager} from 'ng2-toastr';
import {SelectItem} from '../../../controls/select-item';
import {GroupsHttp} from '../../../http';

@Component({
  selector: 'app-student-information-page',
  templateUrl: './student-information.page.html',
  styleUrls: ['./student-information.page.less']
})
export class StudentInformationPageComponent extends TranslatableComponent {
  public ageItems = AgeUtils.values.map(it => new SelectItem(this.getAgeTranslationAsGroup(it), it));
  public educationLevelItems = EducationLevelUtils.values.map(it => new SelectItem(this.getEducationLevelTranslation(it), it));

  public student: Student = new Student();

  public loadingInProgress = true;

  private requestedGroupId: number;

  private allStudents: Array<Student> = [];
  private allGroups: Array<Group> = [];

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
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

  public addGroup(): void {
    this.student.groupIds.push(null);
  }

  public goToStatus() {
    this.router.navigate([`/students/${this.student.id}/status`]);
  }

  public goToGroup(groupId: number) {
    if (groupId !== null) {
      this.router.navigate([`/groups/${groupId}/information`])
    }
  }

  public removeGroup(indexToRemove: number): void {
    this.student.groupIds = this.student.groupIds.filter((_, index) => index !== indexToRemove);
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
    return this.allGroups
      .filter(group => group.age === this.student.age)
      .filter(group => group.educationLevel === this.student.educationLevel)
  }

  public getGroupName(groupId: number): String {
    let group = this.allGroups.find(it => it.id === groupId);

    return `${this.getEducationLevelTranslation(group.educationLevel)} - ${group.bookName} - ${this.getGroupStudentsNames(groupId)}`;
  }

  public hasAtLeastOneContact(): boolean {
    return this.student.phones.length !== 0 || !!this.student.vkLink;
  }

  public goToVk() {
    window.open(`https://vk.com/${this.student.vkLink}`, '_blank');
  }

  private getGroupStudentsNames(groupId: number): String {
    let students = this.allStudents.filter(it => it.groupIds.indexOf(groupId) !== -1);

    if (students.length == 0) {
      return 'Нет студентов';
    } else {
      return students.map(it => it.name).map(it => it.split(' ')[0]).reduce((n1, n2) => `${n1}; ${n2}`);
    }
  }

  private initStudent(studentId: number, groupId: number): void {
    Promise.all([
      this.studentsService.getAllStudents(),
      this.groupsHttp.getAllGroups(),
    ]).then(it => {
      this.allStudents = it[0];
      this.allGroups = it[1];

      if (studentId == null) {
        this.student = new Student();

        if (groupId != null) {
          let group = this.allGroups.find(group => group.id === groupId);

          this.student.age = group.age;
          this.student.educationLevel = group.educationLevel;
          this.student.groupIds = [group.id];
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
