import {PersonContact, PersonContacts} from '../../../data';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArrayUtils} from '../../../utils/array-utils';

@Component({
  selector: 'app-person-contacts',
  templateUrl: './person-contacts.view.html',
  styleUrls: ['./person-contacts.view.less']
})
export class PersonContactsView {
  @Input() public personContacts: PersonContacts;

  @Output('onPersonContactsChanged') public onPersonContactsChanged = new EventEmitter<PersonContacts>();

  public addPhone() {
    this.personContacts.phones.push(new PersonContact());

    this.notifyPersonContactsChanged();
  }

  public removePhone(index: number) {
    this.personContacts.phones = ArrayUtils.removeElByIndex(this.personContacts.phones, index);

    this.notifyPersonContactsChanged();
  }

  public addVkLink() {
    this.personContacts.vkLinks.push(new PersonContact());

    this.notifyPersonContactsChanged();
  }

  public removeVkLink(index: number) {
    this.personContacts.vkLinks = ArrayUtils.removeElByIndex(this.personContacts.vkLinks, index);

    this.notifyPersonContactsChanged();
  }

  public notifyPersonContactsChanged() {
    this.onPersonContactsChanged.emit(this.personContacts);
  }
}
