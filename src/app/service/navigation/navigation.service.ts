import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {
  NavigationStudentsService,
  NavigationGroupsService,
  NavigationStaffMembersService,
  NavigationCabinetsService,
  NavigationExecutor, NavigationNewStudentsService
} from '.';

@Injectable()
export class NavigationService {
  constructor(private router: Router) {}

  public login(): NavigationExecutor {
    return new NavigationExecutor(this.router, `login`);
  }

  public students(): NavigationStudentsService {
    return new NavigationStudentsService(this.router);
  }

  public groups(): NavigationGroupsService {
    return new NavigationGroupsService(this.router);
  }

  public staffMembers(): NavigationStaffMembersService {
    return new NavigationStaffMembersService(this.router);
  }

  public cabinets(): NavigationCabinetsService {
    return new NavigationCabinetsService(this.router);
  }

  public newStudents(): NavigationNewStudentsService {
    return new NavigationNewStudentsService(this.router);
  }
}
