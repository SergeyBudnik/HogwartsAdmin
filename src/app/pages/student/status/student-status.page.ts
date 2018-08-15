import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService, GroupsService, StudentStatusService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student, StudentStatus} from '../../../data';
import {ToastsManager} from 'ng2-toastr';
import {StringReference} from '../../../controls/string-reference';

@Component({
  selector: 'app-student-status-page',
  templateUrl: './student-status.page.html',
  styleUrls: ['./student-status.page.less']
})
export class StudentStatusPageComponent extends TranslatableComponent {
  public student: Student = new Student();
  public studentStatuses: Array<StudentStatus> = [];
  public currentStudentStatus: StudentStatus;

  public loadingInProgress = true;
  public actionInProgress = false;

  public nameReference: StringReference;

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

      this.nameReference = new StringReference(() => this.student.name, value => this.student.name = value);
    });
  }
}
