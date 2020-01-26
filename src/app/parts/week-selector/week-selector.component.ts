import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.less']
})
export class WeekSelectorComponent {
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
