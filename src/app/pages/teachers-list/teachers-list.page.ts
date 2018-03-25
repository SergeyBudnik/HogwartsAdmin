import {Component} from '@angular/core';
import {LoginService, TeachersService} from '../../service';
import {Teacher} from '../../data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teachers-list-page',
  templateUrl: './teachers-list.page.html',
  styleUrls: ['./teachers-list.page.less']
})
export class TeachersListPageComponent {
  public teachers: Array<Teacher> = [];
  public loadingInProgress = true;

  private unfilteredTeachers: Array<Teacher> = [];

  public constructor(
    private loginService: LoginService,
    private router: Router,
    private teachersService: TeachersService,
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.teachersService.getAllTeachers().then(it => {
        this.unfilteredTeachers = it;
        this.teachers = this.getFilteredTeachers('');

        this.loadingInProgress = false;
      });
    }
  }

  public onSearchChange(teacherNameFilter: string) {
    this.teachers = this.getFilteredTeachers(teacherNameFilter);
  }

  public openTeacherPage(teacherId: number): void {
    this.router.navigate([`/teachers/${teacherId}/information`]);
  }

  public openNewTeacherPage(): void {
    this.router.navigate([`/teachers/new/information`]);
  }

  private getFilteredTeachers(teacherNameFilter: string): Array<Teacher> {
    return this.unfilteredTeachers
      .filter(it => it.name.toLowerCase().indexOf(teacherNameFilter.toLowerCase()) !== -1);
  }
}
