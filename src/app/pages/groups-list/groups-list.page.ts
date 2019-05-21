import {Component} from '@angular/core';
import {Group, GroupType, GroupTypeUtils, Student, Teacher} from '../../data';
import {LoginService, StudentPaymentService, StudentsService} from '../../service';
import {Router} from '@angular/router';
import {TranslatableComponent} from '../../translation/translation.component';
import {Age, AgeUtils} from '../../data';
import {EducationLevel, EducationLevelUtils} from '../../data';
import {Cabinet} from '../../data';
import {SelectItem} from '../../controls/select-item';
import {CabinetsHttp, GroupsHttp, TeachersHttp} from '../../http';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list.page.html',
  styleUrls: ['./groups-list.page.less']
})
export class GroupsListPageComponent extends TranslatableComponent {
  private students: Array<Student> = [];

  public groups: Array<Group> = [];
  public cabinets: Array<Cabinet> = [];
  public teachers: Array<Teacher> = [];

  public groupTypeFilter: GroupType = null;
  public managerFilter: number = null;
  public ageFilter: Age = 'UNKNOWN';
  public educationLevelFilter: EducationLevel = 'UNKNOWN';
  public cabinetFilter: number = null;

  public loadingInProgress = true;

  private unfilteredGroups: Array<Group> = [];

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private cabinetsHttp: CabinetsHttp,
    private studentsService: StudentsService,
    private teachersHttp: TeachersHttp,
    private studentPaymentService: StudentPaymentService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.groupsHttp.getAllGroups(),
        this.cabinetsHttp.getAllCabinets(),
        this.studentsService.getAllStudents(),
        this.teachersHttp.getAllTeachers()
      ]).then(it => {
        this.unfilteredGroups = it[0];
        this.cabinets = it[1];
        this.students = it[2];
        this.teachers = it[3];

        this.loadingInProgress = false;

        this.groups = this.getFilteredGroups();
      });
    }
  }

  public getGroupManager(groupId: number): Teacher {
    let group = this.groups.find(group => group.id === groupId);

    return this.teachers.find(teacher => teacher.id === group.managerId);
  }

  public getGroupStudentsString(groupId: number): string {
    let studentsString = '';

    this.getGroupActiveStudents(groupId)
      .map(it => it.name)
      .map(it => it.split(' ')[0])
      .forEach(it => studentsString += it + '; ');

    return studentsString;
  }

  public getGroupCabinet(groupId: number): Cabinet {
    let group = this.groups.find(group => group.id === groupId);

    return this.cabinets.find(cabinet => cabinet.id === group.cabinetId);
  }

  public groupHasActiveStudents(groupId: number): boolean {
    return this.getGroupActiveStudents(groupId).length !== 0;
  }

  private getGroupActiveStudents(groupId: number): Array<Student> {
    return this.students
      .filter(student => !!student.studentGroups.map(it => it.groupId).find(studentGroupId => studentGroupId == groupId))
      .filter(student => student.statusType == 'STUDYING')
  }

  public getCabinetItems(): Array<SelectItem> {
    const res = [new SelectItem('Все', null)];

    this.cabinets.forEach(it => res.push(new SelectItem(it.name, String(it.id))));

    return res;
  }

  public getManagerItems(): Array<SelectItem> {
    let items = [new SelectItem('Все', '')];

    this.teachers.forEach(teacher =>
      items.push(new SelectItem(teacher.name, String(teacher.id)))
    );

    return items;
  }

  public onManagerFilterChange(managerFilter: string) {
    this.managerFilter = !!managerFilter ? Number(managerFilter) : null;
    this.groups = this.getFilteredGroups();
  }

  public getGroupTypeItems(): Array<SelectItem> {
    let items = [new SelectItem('Все', '')];

    GroupTypeUtils.values.forEach(it => items.push(new SelectItem(this.getGroupTypeTranslation(it), it)));

    return items;
  }

  public onGroupTypeFilterChange(groupTypeFilter: GroupType): void {
    this.groupTypeFilter = groupTypeFilter;
    this.groups = this.getFilteredGroups();
  }

  public getAgeItems(): Array<SelectItem> {
    return AgeUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.getAgeTranslationAsGroup(it), it)
    );
  }

  public onAgeFilterChange(ageFilter: Age): void {
    this.ageFilter = ageFilter;
    this.groups = this.getFilteredGroups();
  }

  public getEducationLevelItems(): Array<SelectItem> {
    return EducationLevelUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.getEducationLevelTranslation(it), it)
    );
  }

  public onEducationLevelFilterChange(educationLevelFilter: EducationLevel): void {
    this.educationLevelFilter = educationLevelFilter;
    this.groups = this.getFilteredGroups();
  }

  public onCabinetFilterChange(cabinetFilter: string): void {
    this.cabinetFilter = Number(cabinetFilter);
    this.groups = this.getFilteredGroups();
  }

  public openGroupPage(groupId: number): void {
    this.router.navigate([`/groups/${groupId}/information`]);
  }

  public openNewGroupPage() {
    this.router.navigate([`/groups/new/information`]);
  }

  public getGroupPayment(groupId: number): number {
    const group = this.groups.find(it => it.id === groupId);

    let activeStudents = this.getGroupActiveStudents(group.id);

    return this.studentPaymentService.getGroupPayment(group, group.lessons, activeStudents);
  }

  private getFilteredGroups(): Array<Group> {
    return this.unfilteredGroups
      .filter(it => !this.groupTypeFilter || it.type === this.groupTypeFilter)
      .filter(it => !this.managerFilter || it.managerId === this.managerFilter)
      .filter(it => this.ageFilter === 'UNKNOWN' || it.age === this.ageFilter)
      .filter(it => this.educationLevelFilter === 'UNKNOWN' || it.educationLevel === this.educationLevelFilter)
      .filter(it => !this.cabinetFilter || it.cabinetId === this.cabinetFilter)
      .sort((o1, o2) => o1.id - o2.id);
  }
}
