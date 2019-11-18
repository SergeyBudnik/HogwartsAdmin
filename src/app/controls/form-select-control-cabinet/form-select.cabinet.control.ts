import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cabinet} from '../../data';
import {SelectItem} from '../select-item';

@Component({
  selector: 'app-form-select-control-cabinet',
  templateUrl: './form-select.cabinet.control.html',
  styleUrls: ['./form-select.cabinet.control.less']
})
export class FormSelectCabinetControl {
  public allCabinetsItems: Array<SelectItem> = [];

  @Input('cabinetId') public cabinetId: number = null;

  @Input('allCabinets') set setAllCabinets(allCabinets: Array<Cabinet>) {
    this.allCabinetsItems = allCabinets.map(it => new SelectItem(it.name, "" + it.id));
  }

  @Output('onValueChanged') public emitter = new EventEmitter<number>();

  public onValueChanged(value: number) {
    this.emitter.emit(value);
  }
}
