import {Component, EventEmitter, Output} from '@angular/core';
import {TranslatableComponent} from '../../translation/translation.component';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.less']
})
export class WeekSelectorComponent extends TranslatableComponent {
  private currentWeek = 0;

  @Output("onWeekChanged") public emitter = new EventEmitter<number>();

  public getCurrentWeek(): number {
    return this.currentWeek;
  }

  public setCurrentWeek(currentWeek: number) {
    this.currentWeek = currentWeek;

    this.emitter.emit(currentWeek);
  }
}
