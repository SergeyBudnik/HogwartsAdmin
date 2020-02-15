import {Router} from '@angular/router';
import {NavigationExecutor} from './common';

export class NavigationNewStudentsService {
  constructor(private router: Router) {}

  public list(): NavigationExecutor {
    return new NavigationExecutor(this.router, `new-students`);
  }

  public new(): NavigationExecutor {
    return new NavigationExecutor(this.router, `new-students/new`);
  }

  public card(login: string) {
    return new NavigationNewStudentCardService(this.router, login);
  }
}

export class NavigationNewStudentCardService {
  constructor(private router: Router, private login: string) {}

  public information(): NavigationExecutor {
    return new NavigationExecutor(this.router, `new-students/${this.login}/information`);
  }

  public actions(): NavigationExecutor {
    return new NavigationExecutor(this.router, `new-students/${this.login}/actions`);
  }
}
