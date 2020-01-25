import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.part.component.html',
  styleUrls: ['./menu-item.part.component.less']
})
export class MenuItemPartComponent {
  @Input() isActive: boolean;
  @Input() title: string;
  @Input() icon: string;
}
