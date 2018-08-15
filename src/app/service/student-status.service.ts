import {Injectable} from '@angular/core';
import {StudentStatus, StudentStatusType} from '../data';
import {StudentStatusHttp} from '../http';

@Injectable()
export class StudentStatusService {
  public constructor(
    private studentStatusHttp: StudentStatusHttp
  ) {}

  public changeStudentStatus(studentId: number, status: StudentStatusType, actionTime: number): Promise<void> {
    return this.studentStatusHttp.changeStudentStatus(studentId, status, actionTime);
  }

  public getStatuses(studentId: number): Promise<Array<StudentStatus>> {
    return this.studentStatusHttp.getStatuses(studentId);
  }
}
