import {Group, Age, EducationLevel} from '../data';
import {Injectable} from '@angular/core';
import {GroupsHttp} from '../http';

@Injectable()
export class GroupsService {
  public constructor(
    private groupsHttp: GroupsHttp
  ) {}

  public getAllGroups(): Promise<Array<Group>> {
    return this.groupsHttp.getAllGroups();
  }

  public getMatchingGroups(educationLevel: EducationLevel, age: Age): Promise<Array<Group>> {
    return this.groupsHttp
      .getAllGroups()
      .then(it => it.filter(group => group.educationLevel === educationLevel && group.age === age));
  }

  public getGroup(groupId: number): Promise<Group> {
    return this.groupsHttp.getGroup(groupId);
  }

  public createGroup(group: Group): Promise<number> {
    return this.groupsHttp.createGroup(group);
  }

  public editGroup(group: Group): Promise<void> {
    return this.groupsHttp.editGroup(group);
  }

  public deleteGroup(groupId: number): Promise<void> {
    return this.groupsHttp.deleteGroup(groupId);
  }
}
