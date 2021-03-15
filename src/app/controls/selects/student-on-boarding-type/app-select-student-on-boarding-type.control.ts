import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../select-item';
import {StudentOnBoardingType, StudentOnBoardingTypeUtils} from '../../../data';
import {TranslationService} from '../../../service';

@Component({
  selector: 'app-select-student-on-boarding-type-control',
  templateUrl: './app-select-student-on-boarding-type.control.html',
  styleUrls: ['./app-select-student-on-boarding-type.control.less']
})
export class AppSelectStudentOnBoardingTypeControl {
  public items: Array<SelectItem> = [];

  @Input('studentOnBoardingType') public value: StudentOnBoardingType = null;
  @Input('editable') public editable = true;

  @Output('onChange') public emitter = new EventEmitter<StudentOnBoardingType>();

  constructor(public translationService: TranslationService) {
    this.items = StudentOnBoardingTypeUtils.values.map(
      it => new SelectItem(
        this.translationService.studentOnBoardingType().translate(it),
        it
      )
    );
  }

  public onValueChanged(value: StudentOnBoardingType) {
    this.emitter.emit(value);
  }
}
