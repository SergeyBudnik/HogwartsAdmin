import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal.template.html',
  styleUrls: ['./modal.template.less']
})
export class ModalTemplateComponent {
  @ViewChild('closeButton') closeButton: ElementRef;

  @Input() id: string;
  @Input() title: string;

  @Input('modalVisible') set modalVisible(value: boolean) {
    this.closeButton.nativeElement.click();
  }
}
