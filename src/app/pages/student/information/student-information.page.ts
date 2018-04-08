import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService, GroupsService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {
  Student, StudentReferralSource, StudentReferralSourceUtils, StudentStatusType,
  EducationLevel, EducationLevelUtils, Group, Age, AgeUtils, StudentStatusTypeUtils
} from '../../../data';
import {ToastsManager} from 'ng2-toastr';
import {SelectItem} from '../../../controls/select-item';
import {StringReference} from '../../../controls/string-reference';
import {StringArrayReference} from '../../../controls/string-array-reference';

@Component({
  selector: 'app-student-information-page',
  templateUrl: './student-information.page.html',
  styleUrls: ['./student-information.page.less']
})
export class StudentInformationPageComponent extends TranslatableComponent {
  public student: Student = new Student();
  public suitableGroups: Array<Group> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

  public nameReference: StringReference;
  public telephonesReference: StringArrayReference;
  public emailsReference: StringArrayReference;
  public referralSourceReference: StringReference;
  public educationLevelReference: StringReference;
  public ageReference: StringReference;
  public statusReference: StringReference;

  private requestedGroupId: number;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsService: GroupsService,
    private studentsService: StudentsService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    super();

    this.toastr.setRootViewContainerRef(vcr);

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (!id || id === 'new') {
          this.route
            .queryParams
            .subscribe(queryParams => {
              const groupId = queryParams['groupId'];

              if (!!groupId) {
                this.requestedGroupId = Number(groupId);

                this.initNewStudentWithGroup(this.requestedGroupId);
              } else {
                this.initNewStudent();
              }
            });
        } else {
          this.initExisting(Number(params.get('id')));
        }
      });
    }
  }

  public getAgeItems(): Array<SelectItem> {
    return AgeUtils.values.map(it => new SelectItem(
      this.getAgeTranslationAsGroup(it), it
    ));
  }

  public onAgeChange(age: Age): void {
    this.student.age = age;
    this.initMatchingGroups();
  }

  public getEducationLevelItems(): Array<SelectItem> {
    return EducationLevelUtils.values.map(it => new SelectItem(
      this.getEducationLevelTranslation(it), it
    ));
  }

  public onEducationLevelChange(educationLevel: EducationLevel): void {
    this.student.educationLevel = educationLevel;
    this.initMatchingGroups();
  }

  public getReferralSourceItems(): Array<SelectItem> {
    return StudentReferralSourceUtils.values.map(it => new SelectItem(
      this.getStudentReferralSourceTranslation(it), it
    ))
  }

  public onReferralSourceChange(referralSource: StudentReferralSource): void {
    this.student.referralSource = referralSource;
  }

  public getStatusItems(): Array<SelectItem> {
    return StudentStatusTypeUtils.values.map(it => new SelectItem(
      this.getStudentStatusTypeTranslation(it), it
    ));
  }

  public onStatusTypeChange(statusType: StudentStatusType): void {
    this.student.statusType = statusType;
  }

  public addGroup(): void {
    this.student.groupIds.push(null);
  }

  public removeGroup(index: number): void {
    const groupIds = [];

    for (let i = 0; i < this.student.groupIds.length; i++) {
      if (i !== index) {
        groupIds.push(this.student.groupIds[i]);
      }
    }

    this.student.groupIds = groupIds;
  }

  public save(): void {
    this.actionInProgress = true;

    if (!!this.student.id) {
      this.studentsService
        .editStudent(this.student)
        .then(() => {
          this.actionInProgress = false;
          this.toastr.success(`Студент '${this.student.name}' успешно сохранён.`);
        });
    } else {
      this.studentsService
        .createStudent(this.student)
        .then(it => {
          this.actionInProgress = false;

          if (!!this.requestedGroupId) {
            this.router.navigate([`/groups/${this.requestedGroupId}/students`]);
          } else {
            this.router.navigate([`/students/${it}/information`]);
          }
        });
    }
  }

  public delete(): void {
    this.actionInProgress = true;

    this.studentsService
      .deleteStudent(this.student.id)
      .then(() => {
        this.actionInProgress = false;
        this.router.navigate([`/students`]);
      });
  }

  private initReferences(): void {
    this.nameReference = new StringReference(this.student.name);
    this.telephonesReference = new StringArrayReference(this.student.phones);
    this.emailsReference = new StringArrayReference(this.student.emails);
    this.referralSourceReference = new StringReference(this.student.referralSource);
    this.educationLevelReference = new StringReference(this.student.educationLevel);
    this.ageReference = new StringReference(this.student.age);
    this.statusReference = new StringReference(this.student.statusType);
  }

  private initExisting(studentId: number): void {
    this.student.id = studentId;

    this.studentsService.getStudent(studentId).then(student => {
      this.student = student;

      this.initMatchingGroups();
    });
  }

  private initNewStudent() {
    this.initMatchingGroups();
  }

  private initNewStudentWithGroup(groupId: number) {
    this.groupsService.getGroup(groupId).then(group => {
      this.student.age = group.age;
      this.student.educationLevel = group.educationLevel;
      this.student.groupIds = [group.id];

      this.initMatchingGroups();
    });
  }

  private initMatchingGroups() {
    this.groupsService
      .getMatchingGroups(this.student.educationLevel, this.student.age)
      .then(groups => {
        this.suitableGroups = groups;

        this.loadingInProgress = false;

        this.initReferences();
      });
  }
}
