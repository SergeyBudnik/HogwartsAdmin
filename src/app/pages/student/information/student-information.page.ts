import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService, GroupsService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {
  Student, StudentReferralSource, StudentReferralSourceUtils, StudentStatusType,
  EducationLevel, EducationLevelUtils, Group, Age, AgeUtils, StudentStatusTypeUtils
} from '../../../data';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-student-information-page',
  templateUrl: './student-information.page.html',
  styleUrls: ['./student-information.page.less']
})
export class StudentInformationPageComponent extends TranslatableComponent {
  public educationLevels: Array<EducationLevel> = EducationLevelUtils.values;
  public ages: Array<Age> = AgeUtils.values;
  public referralSources: Array<StudentReferralSource> = StudentReferralSourceUtils.values;
  public statuses: Array<StudentStatusType> = StudentStatusTypeUtils.values;

  public student: Student = new Student();
  public suitableGroups: Array<Group> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

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

  public onAgeChange(age: Age): void {
    this.student.age = age;
    this.initMatchingGroups();
  }

  public onEducationLevelChange(educationLevel: EducationLevel): void {
    this.student.educationLevel = educationLevel;
    this.initMatchingGroups();
  }

  public onReferralSourceChange(referralSource: StudentReferralSource): void {
    this.student.referralSource = referralSource;
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
            this.router.navigate([`/students/${it}`]);
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

  private initExisting(studentId: number): void {
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
      });
  }
}
