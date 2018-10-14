import {TranslatableComponent} from '../../../translation/translation.component';
import {Component} from '@angular/core';
import {LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../../data';
import {GroupsHttp} from '../../../http';

@Component({
  selector: 'app-group-timetable-page',
  templateUrl: './group-timetable.page.html',
  styleUrls: ['./group-timetable.page.less']
})
export class GroupTimetablePageComponent extends TranslatableComponent {
  public group: Group = new Group();

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.group.id = Number(params.get('id'));

        this.groupsHttp
          .getGroup(this.group.id)
          .then(group => {
            this.group = group;
            this.loadingInProgress = false;
          });
      });
    }
  }
}
