import {Component} from '@angular/core';
import {Student, StudentStatusType, StudentStatusTypeUtils, StudentUtils} from '../../data';
import {StudentsService} from '../../service';
import {Router} from '@angular/router';
import {TranslatableComponent} from '../../translation/translation.component';
import {Age, AgeUtils, EducationLevel, EducationLevelUtils} from '../../data';
import {LoginService} from '../../service';

@Component({
  selector: 'app-students-list-page',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.less']
})
export class StudentsListPageComponent extends TranslatableComponent {
  private unfilteredStudents: Array<Student> = [];

  public students: Array<Student> = [];

  public ages: Array<Age> = AgeUtils.values;
  public educationLevels: Array<EducationLevel> = EducationLevelUtils.values;
  public statuses: Array<StudentStatusType> = StudentStatusTypeUtils.values;

  public loadingInProgress = true;

  private nameFilter: string = '';
  private educationLevelFilter: EducationLevel = 'UNKNOWN';
  private ageFilter: Age = 'UNKNOWN';
  private statusFilter: StudentStatusType = null;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private studentsService: StudentsService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.studentsService.getAllStudents().then(students => {
        this.unfilteredStudents = students;
        this.students = this.getFilteredStudents();

        this.loadingInProgress = false;
      });
    }
  }

  public onNameFilterChange(nameFilter: string) {
    this.nameFilter = nameFilter;

    this.students = this.getFilteredStudents();
  }

  public onEducationLevelFilterChange(educationLevelFilter: EducationLevel) {
    this.educationLevelFilter = educationLevelFilter;

    this.students = this.getFilteredStudents();
  }

  public onAgeFilterChange(ageFilter: Age) {
    this.ageFilter = ageFilter;

    this.students = this.getFilteredStudents();
  }

  public onStatusFilterChange(statusFilter: StudentStatusType): void {
    this.statusFilter = statusFilter;

    this.students = this.getFilteredStudents();
  }

  public openStudentPage(studentId: number) {
    this.router.navigate([`/students/${studentId}`]);
  }

  public openNewStudentPage() {
    this.router.navigate([`/students/new`]);
  }

  public isStudentFilled(student: Student): boolean {
    return StudentUtils.isValid(student);
  }

  private getFilteredStudents(): Array<Student> {
    return this.unfilteredStudents
      .filter(it => it.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1)
      .filter(it => this.educationLevelFilter === 'UNKNOWN' || it.educationLevel === this.educationLevelFilter)
      .filter(it => this.ageFilter === 'UNKNOWN' || it.age === this.ageFilter)
      .filter(it => !this.statusFilter || it.statusType === this.statusFilter)
      .sort((o1, o2) => o1.id - o2.id);
  }
}
