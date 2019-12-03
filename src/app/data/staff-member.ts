import {Person} from './person';

export class StaffMember {
  constructor(
    public login: string = '',
    public person: Person = new Person(),
  ) {}
}
