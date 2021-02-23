import {Component} from '@angular/core';
import {LoginService, GroupService, StudentsService, NavigationService, TranslationService} from '../../../service';
import {Age, Cabinet, Group, GroupType, EducationLevel, Student} from '../../../data';
import {CabinetsHttp, GroupsHttp} from '../../../http';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list.page.html',
  styleUrls: ['./groups-list.page.less']
})
export class GroupsListPage {
  private students: Array<Student> = [];

  public cabinets: Array<Cabinet> = [];
  public groups: Array<Group> = [];

  public groupTypeFilter: GroupType = null;
  public ageFilter: Age = null;
  public educationLevelFilter: EducationLevel = null;
  public cabinetFilter: number = null;

  public loadingInProgress = true;

  private unfilteredGroups: Array<Group> = [];

  public constructor(
    public navigationService: NavigationService,
    public translationService: TranslationService,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private cabinetsHttp: CabinetsHttp,
    private studentsService: StudentsService,
    private groupsService: GroupService
  ) {
    this.loginService.ifAuthenticated(() => {
      Promise.all([
        this.groupsHttp.getAllGroups(),
        this.cabinetsHttp.getAllCabinets(),
        this.studentsService.getAllStudents(),
      ]).then(it => {
        this.unfilteredGroups = it[0];
        this.cabinets = it[1];
        this.students = it[2];

        this.loadingInProgress = false;

        this.groups = this.getFilteredGroups();
      });
    });
  }

  public getGroupStudentsString(groupId: number): string {
    const currentTime = new Date().getTime();

    const groupActiveStudents = this.groupsService.getGroupActiveStudents(
      this.getGroupById(groupId),
      this.students,
      currentTime
    );

    const groupActiveStudentsNames = groupActiveStudents
      .map(it => it.person.name)
      .map(it => it.split(' ')[0])
      .reduce((previous, current) => {
        if (!previous) {
          return `${current}`;
        } else {
          return `${previous}; ${current}`;
        }
      }, "");

    return `(${groupActiveStudents.length}) ${groupActiveStudentsNames}`;
  }

  public getGroupCabinet(groupId: number): Cabinet {
    return this.groupsService.getGroupCabinet(this.getGroupById(groupId), this.cabinets);
  }

  public onGroupTypeFilterChange(groupTypeFilter: GroupType): void {
    this.groupTypeFilter = groupTypeFilter;
    this.groups = this.getFilteredGroups();
  }

  public onAgeFilterChange(ageFilter: Age): void {
    this.ageFilter = ageFilter;
    this.groups = this.getFilteredGroups();
  }

  public onEducationLevelFilterChange(educationLevelFilter: EducationLevel): void {
    this.educationLevelFilter = educationLevelFilter;
    this.groups = this.getFilteredGroups();
  }

  public onCabinetFilterChange(cabinetFilter: number): void {
    this.cabinetFilter = cabinetFilter;
    this.groups = this.getFilteredGroups();
  }

  public openGroupPage(groupId: number): void {
    this.navigationService.groups().id(groupId).information().go();
  }

  public isGroupActive(groupId: number): boolean {
    const currentTime = new Date().getTime();
    const group = this.getGroupById(groupId);

    return this.groupsService.isGroupActive(group, this.students, currentTime);
  }

  private getGroupById(groupId: number): Group {
    return this.unfilteredGroups.find(group => group.id === groupId);
  }

  private getFilteredGroups(): Array<Group> {
    return this.unfilteredGroups
      .filter(it => !this.groupTypeFilter || it.type === this.groupTypeFilter)
      .filter(it => this.ageFilter === null || it.age === this.ageFilter)
      .filter(it => this.educationLevelFilter === null || it.educationLevel === this.educationLevelFilter)
      .filter(it => !this.cabinetFilter || it.cabinetId === this.cabinetFilter)
      .sort((o1, o2) => o1.id - o2.id)
      .sort((o1, o2) => {
        const currentTime = new Date().getTime();

        const o1Students = this.groupsService.getGroupActiveStudents(o1, this.students, currentTime).length;
        const o2Students = this.groupsService.getGroupActiveStudents(o2, this.students, currentTime).length;

        return o2Students - o1Students;
      })
      .sort((o1, o2) => {
        let o1Active = this.isGroupActive(o1.id) ? 1 : 0;
        let o2Active = this.isGroupActive(o2.id) ? 1 : 0;

        return o2Active - o1Active;
      });
  }
}
