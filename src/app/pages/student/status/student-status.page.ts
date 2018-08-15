import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService, GroupsService, StudentStatusService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student, StudentStatus, StudentStatusType} from '../../../data';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-student-status-page',
  templateUrl: './student-status.page.html',
  styleUrls: ['./student-status.page.less']
})
export class StudentStatusPageComponent extends TranslatableComponent {
  public student: Student = new Student();
  public studentStatuses: Array<StudentStatus> = [];
  public currentStudentStatus: StudentStatus;

  public newStudentStatus: StudentStatusType;

  public loadingInProgress = true;
  public actionInProgress = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsService: GroupsService,
    private studentsService: StudentsService,
    private studentStatusService: StudentStatusService,
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

        this.init(Number(id));
      });
    }
  }

  public hasAction(status: StudentStatusType): boolean {
    switch (status) {
      case 'GROUP_ASSIGNED':
      case 'LEFT':
        return false;
      default:
        return true;
    }
  }

  public getActionLabel(): string {
    switch (this.currentStudentStatus.status) {
      case 'REQUEST':
        return 'Перезвонить';
      case 'TEST_ASSIGNED':
        return 'Дата тестирования';
      case 'FREE_LESSON_ASSIGNED':
        return 'Дата бесплатного занятия';
      case 'TEMPORARILY_STOPPED':
        return 'Временно приостановил';
      default:
        throw Error(`Unexpected status ${this.currentStudentStatus.status}`)
    }
  }

  public setNewStudentStatus(status: StudentStatusType) {
    this.newStudentStatus = status;
  }

  public onStatusSaved() {
    window.location.reload();
  }

  private init(studentId: number): void {
    this.student.id = studentId;

    Promise.all([
      this.studentsService.getStudent(studentId),
      this.studentStatusService.getStatuses(studentId)
    ]).then(it => {
      this.student = it[0];
      this.studentStatuses = it[1].sort((o1, o2) => o2.creationTime - o1.creationTime);
      this.currentStudentStatus = this.studentStatuses[0];

      this.loadingInProgress = false;
    });
  }
}
