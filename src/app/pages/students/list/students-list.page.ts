import {Component} from '@angular/core';
import {Age, EducationLevel, Group, StaffMember, Student, StudentGroup, StudentStatusType, StudentStatusTypeUtils} from '../../../data';
import {LoginService, NavigationService, StudentGroupsService, TranslationService} from '../../../service';
import {SelectItem} from '../../../controls/select-item';
import {GroupsHttp, StaffMembersHttp} from '../../../http';
import {StudentsHttp} from '../../../http';

@Component({
  selector: 'app-students-list-page',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.less']
})
export class StudentsListPage {
  public allStaffMembers: Array<StaffMember> = [];
  private allStudents: Array<Student> = [];
  private allGroups: Array<Group> = [];

  public students: Array<Student> = [];

  public loadingInProgress = true;

  private nameFilter: string = '';
  private managerLoginFilter: string = null;
  private statusFilter: StudentStatusType = null;

  public constructor(
    public navigationService: NavigationService,
    public translationService: TranslationService,
    private loginService: LoginService,
    private studentsHttp: StudentsHttp,
    private groupsHttp: GroupsHttp,
    private studentGroupsService: StudentGroupsService,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loginService.ifAuthenticated(() => this.init());
  }

  private init() {
    Promise.all([
      this.studentsHttp.getAllStudents(),
      this.groupsHttp.getAllGroups(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.allStudents = it[0];
      this.allGroups = it[1];
      this.allStaffMembers = it[2];

      this.students = this.getFilteredStudents();

      this.loadingInProgress = false;
    });
  }

  public getStudentsActiveGroups(student: Student): Array<StudentGroup> {
    return this.studentGroupsService.getStudentActiveGroups(student);
  }

  public getGroup(groupId: number): Group {
    return this.allGroups.find(it => it.id === groupId);
  }

  public getManager(managerLogin: string): StaffMember {
    return this.allStaffMembers.find(it => it.login == managerLogin);
  }

  public getStatusItems(): Array<SelectItem> {
    return StudentStatusTypeUtils.values.map(it => new SelectItem(
        this.translationService.studentStatusType().translate(it),
        it
    ));
  }

  public isStudentFilled(student: Student): boolean {
    return true; // StudentUtils.isValid(student);
  }

  public onFilterChange(
    nameFilter: string,
    managerLoginFilter: string,
    statusFilter: StudentStatusType
  ) {
    this.nameFilter = nameFilter === undefined ? this.nameFilter : nameFilter;
    this.managerLoginFilter = managerLoginFilter === undefined ? this.managerLoginFilter : managerLoginFilter;
    this.statusFilter = statusFilter === undefined ? this.statusFilter : statusFilter;

    this.students = this.getFilteredStudents();
  }

  private getFilteredStudents(): Array<Student> {
    return this.allStudents
      .filter(it => {
        let nameMatches = it.person.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
        let phoneMatches = it.person.contacts.phones.filter(phone => phone.value.indexOf(this.nameFilter) != -1).length != 0;

        return nameMatches || phoneMatches;
      })
      .filter(it => this.managerLoginFilter === null || it.managerLogin === this.managerLoginFilter)
      .filter(it => !this.statusFilter || it.statusType === this.statusFilter)
      .sort((s1, s2) => {
        const s1ActiveGroups = this.studentGroupsService.getStudentActiveGroups(s1);
        const s2ActiveGroups = this.studentGroupsService.getStudentActiveGroups(s2);

        if (s1ActiveGroups.length == 0 && s2ActiveGroups.length == 0) {
          return 0;
        } else {
          if (s1ActiveGroups.length == 0) {
            return 1;
          } else if (s2ActiveGroups.length === 0) {
            return -1;
          } else {
            return s1ActiveGroups[0].groupId - s2ActiveGroups[0].groupId;
          }
        }
      })
      .sort((o1, o2) => StudentStatusTypeUtils.compare(o1.statusType, o2.statusType));
  }
}
