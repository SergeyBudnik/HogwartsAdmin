import {TranslatableComponent} from '../../../translation/translation.component';
import {Component, Input} from '@angular/core';
import {StudentStatusType} from '../../../data';

@Component({
  selector: '[app-student-status]',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.less']
})
export class StudentStatusComponent extends TranslatableComponent {
  @Input() public studentStatusType: StudentStatusType
}
