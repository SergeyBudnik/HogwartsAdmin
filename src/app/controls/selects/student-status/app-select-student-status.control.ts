import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentStatusType, StudentStatusTypeUtils} from '../../../data';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';

@Component({
  selector: 'app-select-student-status-control',
  templateUrl: './app-select-student-status.control.html',
  styleUrls: ['./app-select-student-status.control.less']
})
export class AppSelectStudentStatusControl {
  public items = [];

  @Input('value') public value: StudentStatusType = null;
  @Output('onChange') public emitter = new EventEmitter<StudentStatusType>();

  constructor(public translationService: TranslationService) {
    this.items = StudentStatusTypeUtils.values.map(it => new SelectItem(this.translationService.studentStatusType().translate(it), it));
  }

  public onValueChanged(value: StudentStatusType) {
    this.emitter.emit(value);
  }
}
