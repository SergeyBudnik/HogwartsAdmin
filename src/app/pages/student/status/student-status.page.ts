import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentsService, LoginService} from '../../../service';
import {Student, StudentStatus, StudentStatusType} from '../../../data';
import {ToastsManager} from 'ng2-toastr';
import {StudentStatusHttp} from '../../../http';

export class StatusAction {
  constructor(
    public newStatus: StudentStatusType,
    public label: String,
    public isPrimary: Boolean
  ) {}
}

@Component({
  selector: 'app-student-status-page',
  templateUrl: './student-status.page.html',
  styleUrls: ['./student-status.page.less']
})
export class StudentStatusPageComponent {
  public student: Student = new Student();
  public studentStatuses: Array<StudentStatus> = [];
  public currentStudentStatus: StudentStatus;

  public newStudentStatus: StudentStatusType;

  public loadingInProgress = true;
  public actionInProgress = false;

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsService: StudentsService,
    private studentStatusHttp: StudentStatusHttp,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        this.init(Number(id));
      });
    });
  }

  public hasAction(status: StudentStatus): boolean {
    return false;
  }

  public getActionLabel(): string {
    return '';
  }

  public setNewStudentStatus(status: StudentStatusType) {
    this.newStudentStatus = status;
  }

  public onStatusSaved(studentStatus: StudentStatus) {
    this.currentStudentStatus = studentStatus;

    let newStudentStatuses = [];

    newStudentStatuses.push(studentStatus);
    this.studentStatuses.forEach(status => newStudentStatuses.push(status));

    this.studentStatuses = newStudentStatuses;
  }

  public getStatusActions(status: StudentStatusType): Array<StatusAction> {
    switch (status) {
      case 'STUDYING':
        return [
          new StatusAction('STOPPED', 'Приостановил', false),
          new StatusAction('LEFT', 'Покинул', false)
        ];
      case 'LEFT':
        return [
          new StatusAction('STOPPED', 'Приостановил', false),
          new StatusAction('STUDYING', 'Вернулся', false)
        ];
      case 'STOPPED':
        return [
          new StatusAction('LEFT', 'Покинул', false),
          new StatusAction('STUDYING', 'Вернулся', false)
        ];
    }
  }

  private init(studentId: number): void {
    this.student.id = studentId;

    Promise.all([
      this.studentsService.getStudent(studentId),
      this.studentStatusHttp.getStatuses(studentId)
    ]).then(it => {
      this.student = it[0];
      this.studentStatuses = it[1].sort((o1, o2) => o2.creationTime - o1.creationTime);
      this.currentStudentStatus = this.studentStatuses[0];

      this.loadingInProgress = false;
    });
  }
}
