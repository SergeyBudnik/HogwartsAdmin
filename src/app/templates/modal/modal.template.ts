import {Component, Input} from '@angular/core';

export class ModalStatus {
  constructor(public visible: boolean) {
  }
}

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal.template.html',
  styleUrls: ['./modal.template.less']
})
export class ModalTemplateComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() modalStatus: ModalStatus = new ModalStatus(false);
}
