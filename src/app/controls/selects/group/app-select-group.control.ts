import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EducationLevel, Group, StaffMember, Student} from '../../../data';
import {SelectItem} from '../../select-item';
import {GroupService} from '../../../service';

@Component({
  selector: 'app-select-group-control',
  templateUrl: './app-select-group.control.html',
  styleUrls: ['./app-select-group.control.less']
})
export class AppSelectGroupControl {
  public items: Array<SelectItem> = [];

  private staffMembers: Array<StaffMember> = null;
  private students: Array<Student> = null;
  private groups: Array<Group> = null;

  @Input('staffMembers') set setStaffMembers(staffMembers: Array<StaffMember>) {
    this.staffMembers = staffMembers;

    this.items = this.getItems();
  }

  @Input('groups') set setGroups(groups: Array<Group>) {
    this.groups = groups;

    this.items = this.getItems();
  }

  @Input('students') set setStudents(students: Array<Student>) {
    this.students = students;

    this.items = this.getItems();
  }

  @Input('value') public value: number = null;

  @Output('onChange') public emitter = new EventEmitter<number>();

  constructor(private groupService: GroupService) {}

  public onValueChanged(value: number) {
    this.emitter.emit(value);
  }

  private getItems(): Array<SelectItem> {
    if (this.staffMembers != null && this.students != null && this.groups != null) {
      return this.groups.map(group => new SelectItem(
        this.groupService.getGroupName(
          group,
          this.groupService.getGroupHeadTeacher(group, this.staffMembers),
          this.groupService.getGroupActiveStudents(group, this.students, new Date().getTime())
        ),
        `${group.id}`
      ));
    } else {
      return [];
    }
  }
}

