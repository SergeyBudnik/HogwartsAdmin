import {Person} from './person';

export class StaffMember {
  constructor(
    public login: String = '',
    public person: Person = new Person(),
  ) {}
}
