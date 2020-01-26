import {Component} from '@angular/core';
import {LoginService, NavigationService} from '../../../../service';
import {PersonContact, StaffMember} from '../../../../data';
import {ActivatedRoute} from '@angular/router';
import {StaffMembersHttp} from '../../../../http';
import {ArrayUtils} from '../../../../utils/array-utils';

@Component({
  selector: 'app-staff-member-information-page',
  templateUrl: './staff-member-card-information.page.html',
  styleUrls: ['./staff-member-card-information.page.less']
})
export class StaffMemberCardInformationPageComponent {
  public staffMember: StaffMember = new StaffMember();
  public contacts: Array<PersonContact> = [];

  public loadingInProgress = true;

  public isNew = false;

  public constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const login = params.get('login');

        if (login === 'new') {
          this.isNew = true;
          this.loadingInProgress = false;
        } else {
          this.isNew = false;
          this.initStaffMember(login);
        }
      });
    });
  }

  public addNewPhone() {
    this.staffMember.person.contacts.phones.push(new PersonContact());
  }

  public removePhone(index: number) {
    this.staffMember.person.contacts.phones = ArrayUtils.removeElByIndex(this.staffMember.person.contacts.phones, index);
  }

  public addNewVkLink() {
    this.staffMember.person.contacts.vkLinks.push(new PersonContact());
  }

  public removeVkLink(index: number) {
    this.staffMember.person.contacts.vkLinks = ArrayUtils.removeElByIndex(this.staffMember.person.contacts.vkLinks, index);
  }

  public save(): void {
    this.loadingInProgress = true;

    if (this.isNew) {
      this.staffMembersHttp.createStaffMember(this.staffMember).then(() => {
        this.navigationService.staffMembers().id(this.staffMember.login).information().go();
      });
    } else {
      this.staffMembersHttp.editStaffMember(this.staffMember).then(() => {
        this.loadingInProgress = false;
      });
    }
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.staffMembersHttp.deleteStaffMember(this.staffMember.login).then(() => {
      this.navigationService.staffMembers().list().go();
    });
  }

  private initStaffMember(login: String): void {
    Promise.all([
      this.staffMembersHttp.getStaffMember(login)
    ]).then(it => {
      this.staffMember = it[0];
      this.contacts = this.staffMember.person.contacts.vkLinks;

      this.loadingInProgress = false;
    });
  }
}
