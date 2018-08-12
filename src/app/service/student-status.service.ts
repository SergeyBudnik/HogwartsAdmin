import {Injectable} from '@angular/core';
import {StudentStatus} from '../data';
import {StudentStatusHttp} from '../http';

@Injectable()
export class StudentStatusService {
  public constructor(
    private studentStatusHttp: StudentStatusHttp
  ) {}

  public getStatuses(studentId: number): Promise<Array<StudentStatus>> {
    return this.studentStatusHttp.getStatuses(studentId);
  }
}
