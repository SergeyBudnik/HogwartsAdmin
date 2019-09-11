import {Component} from '@angular/core';
import {Group, GroupType, Student} from '../../data';
import {LoginService, GroupService, StudentsService} from '../../service';
import {Router} from '@angular/router';
import {TranslatableComponent} from '../../translation/translation.component';
import {Age} from '../../data';
import {EducationLevel} from '../../data';
import {Cabinet} from '../../data';
import {CabinetsHttp, GroupsHttp} from '../../http';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list.page.html',
  styleUrls: ['./groups-list.page.less']
})
export class GroupsListPageComponent extends TranslatableComponent {
  private students: Array<Student> = [];
  private cabinets: Array<Cabinet> = [];

  public groups: Array<Group> = [];

  public groupTypeFilter: GroupType = null;
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
    private groupsService: GroupService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
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
    }
  }

  public getGroupStudentsString(groupId: number): string {
    const groupActiveStudents = this.groupsService.getGroupActiveStudents(
      this.getGroupById(groupId),
      this.students
    );

    const groupActiveStudentsNames = groupActiveStudents
      .map(it => it.name)
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
    this.router.navigate([`/groups/${groupId}/information`]); // ToDo: move to separate component
  }

  public openNewGroupPage() {
    this.router.navigate([`/groups/new/information`]); // ToDo: move to separate component
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
      .filter(it => this.ageFilter === 'UNKNOWN' || it.age === this.ageFilter)
      .filter(it => this.educationLevelFilter === 'UNKNOWN' || it.educationLevel === this.educationLevelFilter)
      .filter(it => !this.cabinetFilter || it.cabinetId === this.cabinetFilter)
      .sort((o1, o2) => o1.id - o2.id)
      .sort((o1, o2) => {
        let o1Active = this.isGroupActive(o1.id) ? 1 : 0;
        let o2Active = this.isGroupActive(o2.id) ? 1 : 0;

        return o2Active - o1Active;
      });
  }
}
