import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../select-item';
import {Cabinet} from '../../../data';

@Component({
  selector: 'app-select-cabinet-control',
  templateUrl: './app-select-cabinet.control.html',
  styleUrls: ['./app-select-cabinet.control.less']
})
export class AppSelectCabinetControl {
  public items: Array<SelectItem> = [];

  @Input('cabinetId') public cabinetId: number = null;

  @Input('items') set setCabinets(cabinets: Array<Cabinet>) {
    this.items = cabinets.map(it => new SelectItem(it.info.name, "" + it.id));
  }

  @Output('onChange') public emitter = new EventEmitter<number>();

  public onValueChanged(value: number) {
    this.emitter.emit(value);
  }
}
