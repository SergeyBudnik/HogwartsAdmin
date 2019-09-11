import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {Cabinet} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp} from '../../../http';

@Component({
  selector: 'app-filter-cabinets',
  templateUrl: './cabinets-filter.component.html',
  styleUrls: ['./cabinets-filter.component.less']
})
export class CabinetsFilterComponent extends TranslatableComponent {
  @Output('onChange') public emitter: EventEmitter<number> = new EventEmitter();

  public items: Array<SelectItem> = [new SelectItem('Все', '')];

  public constructor(
    private cabinetsHttp: CabinetsHttp,
  ) {
    super();

    cabinetsHttp.getAllCabinets().then(cabinets => this.items = this.getItems(cabinets));
  }

  public onChange(value: string) {
    this.emitter.emit(Number(value));
  }

  private getItems(cabinets: Array<Cabinet>): Array<SelectItem> {
    const res = [new SelectItem('Все', null)];

    cabinets.forEach(it => res.push(new SelectItem(it.name, String(it.id))));

    return res;
  }
}
