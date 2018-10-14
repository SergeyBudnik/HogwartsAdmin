import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService, GroupsService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
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
    private studentStatusHttp: StudentStatusHttp,
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

  public hasAction(status: StudentStatus): boolean {
    if (status.actionTime == 0) {
      return false;
    } else {
      switch (status.status) {
        case 'REQUEST_LEFT':
        case 'TEST_LEFT':
        case 'FREE_LESSON_LEFT':
        case 'AWAITING_GROUP_LEFT':
        case 'STUDYING_LEFT':
        case 'STUDYING':
          return false;
        default:
          return true;
      }
    }
  }

  public getActionLabel(): string {
    switch (this.currentStudentStatus.status) {
      case 'REQUEST':
      case 'TEST_LEFT':
      case 'FREE_LESSON_STOPPED':
      case 'AWAITING_GROUP':
        return 'Перезвонить';
      case 'TEST':
        return 'Дата тестирования';
      case 'FREE_LESSON':
        return 'Дата бесплатного занятия';
      default:
        throw Error(`Unexpected status ${this.currentStudentStatus.status}`)
    }
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
      case 'REQUEST':
        return [
          new StatusAction('TEST', 'Тест назначен', true),
          new StatusAction('REQUEST', 'Перезвонить', false),
          new StatusAction('REQUEST_LEFT', 'Покинул', false)
        ];
      case 'REQUEST_LEFT':
        return [
          new StatusAction('REQUEST', 'Вернулся', true)
        ];
      case 'TEST':
        return [
          new StatusAction('FREE_LESSON', 'Бесплатное занятие назначено', true),
          new StatusAction('TEST', 'Перенесено', false),
          new StatusAction('REQUEST_LEFT', 'Покинул до теста', false),
          new StatusAction('TEST_LEFT', 'Покинул после теста', false),
        ];
      case 'TEST_LEFT':
        return [
          new StatusAction('FREE_LESSON', 'Бесплатное занятие назначено', true),
        ];
      case 'FREE_LESSON':
        return [
          new StatusAction('AWAITING_GROUP', 'Проведено', true),
          new StatusAction('FREE_LESSON', 'Перенесено', false),
          new StatusAction('TEST_LEFT', 'Покинул до бесплатного занятия', false),
          new StatusAction('FREE_LESSON_LEFT', 'Покинул после бесплатного занятия', false)
        ];
      case 'FREE_LESSON_LEFT':
        return [
          new StatusAction('AWAITING_GROUP', 'Вернулся', true),
        ];
      case 'AWAITING_GROUP':
        return [
          new StatusAction('STUDYING', 'Начал заниматься', true),
          new StatusAction('AWAITING_GROUP_LEFT', 'Покинул', false)
        ];
      case 'AWAITING_GROUP_LEFT':
        return [
          new StatusAction('AWAITING_GROUP', 'Вернулся', false)
        ];
      case 'STUDYING':
        return [
          new StatusAction('AWAITING_GROUP', 'Ожидает группу', true),
          new StatusAction('STUDYING_LEFT', 'Покинул', false)
        ];
      case 'STUDYING_LEFT':
        return [
          new StatusAction('AWAITING_GROUP', 'Вернулся', true)
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
