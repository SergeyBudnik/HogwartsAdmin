import {CommonPage} from '../common/common.page';
import {Component} from '@angular/core';
import {StudentAttendanceHttp, StudentsHttp, StudentStatusHttp} from '../../http';
import {Student, StudentStatus, StudentStatusType} from '../../data';

@Component({
  selector: 'app-students-statistics-page',
  templateUrl: './students-statistics.page.html',
  styleUrls: ['./students-statistics.page.less']
})
export class StudentsStatisticsPageComponent extends CommonPage {
  private students: Array<Student>;
  private studentsStatuses: Array<StudentStatus>;

  public studyingStatistics: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public leftStatistics: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public constructor(
    private studentsHttp: StudentsHttp,
    private studentsStatusHttp: StudentStatusHttp
  ) {
    super();

    Promise.all([
      studentsHttp.getAllStudents(),
      studentsStatusHttp.getAllStatuses()
    ]).then(it => {
      this.students = it[0];
      this.studentsStatuses = it[1];

      this.studyingStatistics = this.getStudyingStudentsStatistics('STUDYING');
      this.leftStatistics = this.getStudyingStudentsStatistics('LEFT');
    });
  }

  public getChartData(): any {
    return [
      {data: this.studyingStatistics, label: 'Учащиеся'},
      {data: this.leftStatistics, label: 'Покинули'}
    ];
  }

  private getStudyingStudentsStatistics(status: StudentStatusType): Array<number> {
    let statistics = Array<number>(13);

    let currentDate = new Date();

    statistics[0] = this.getStudentsStatistics(currentDate.getTime(), status);

    for (let i = 0; i < 12; i++) {
      if (currentDate.getMonth() == 1) {
        currentDate.setUTCFullYear(currentDate.getFullYear() - 1, 12, 1);
      } else {
        currentDate.setUTCFullYear(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      }

      statistics[i + 1] = this.getStudentsStatistics(currentDate.getTime(), status);
    }

    return statistics;
  }

  private getStudentsStatistics(before: number, status: StudentStatusType): number {
    let latestStatuses = this
      .getLatestStatusesBefore(before)
      .values();

    return Array.from(latestStatuses).filter(it => it.status === status).length;
  }

  private getLatestStatusesBefore(before: number): Map<number, StudentStatus> {
    let latestStatuses: Map<number, StudentStatus> = new Map();

    this.studentsStatuses
      .filter(it => it.creationTime <= before)
      .forEach(it => {
        let previousStatus = latestStatuses.get(it.studentId);

        if (!previousStatus || previousStatus.creationTime < it.creationTime) {
          latestStatuses.set(it.studentId, it);
        }
      });

    return latestStatuses;
  }

  public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
  public lineChartOptions:any = {responsive: true};

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderColor: 'rgba(0, 255, 0, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}
