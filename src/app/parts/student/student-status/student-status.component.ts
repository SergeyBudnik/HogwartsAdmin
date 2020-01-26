import {Component, Input} from '@angular/core';
import {StudentStatusType} from '../../../data';
import {TranslationService} from '../../../service';

@Component({
  selector: '[app-student-status]',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.less']
})
export class StudentStatusComponent {
  @Input() public studentStatusType: StudentStatusType;

  constructor(private translationService: TranslationService) {}
}
