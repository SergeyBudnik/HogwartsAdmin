import {NavigationExtras, Router} from '@angular/router';

export class NavigationExecutor {
  constructor(private router: Router, private url: string, private extras: NavigationExtras = null) {}

  public go() {
    if (this.extras === null) {
      this.router.navigate([this.url]).then(() => {});
    } else {
      this.router.navigate([this.url], this.extras).then(() => {});
    }
  }
}
