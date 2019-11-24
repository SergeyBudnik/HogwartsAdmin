export class Person {
  constructor(
    public name: String = '',
    public contacts: PersonContacts = new PersonContacts()
  ) {}
}

export class PersonContacts {
  constructor(
    public phones: Array<PersonContact> = [],
    public vkLinks: Array<PersonContact> = []
  ) {}
}

export class PersonContact {
  constructor(
    public name: String = '',
    public value: String = ''
  ) {}
}
