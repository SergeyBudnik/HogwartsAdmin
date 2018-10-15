import {Injectable} from '@angular/core';
import {Group, Lesson, Student, TimeUtils} from '../data';

@Injectable()
export class StudentPaymentService {
  public getGroupPayment(group: Group, lessons: Array<Lesson>, students: Array<Student>) {
    let payment = 0;

    lessons.forEach(lesson => {
      let difference = TimeUtils.index(lesson.finishTime) - TimeUtils.index(lesson.startTime);

      if (group.type === 'INDIVIDUAL') {
        if (difference === 2) {
          payment += 1100
        } else if (difference === 3) {
          payment += 1650
        } else if (difference === 4) {
          payment += 2200
        }
      } else {
        if (difference == 2) {
          if (students.length == 1) {
            payment += 700
          } else {
            payment += students.length * 470
          }
        } else if (difference == 3) {
          if (students.length == 1) {
            payment += 1050
          } else {
            payment += students.length * 700
          }
        } else if (difference == 4) {
          payment += students.length * 930
        }
      }
    });

    return payment;
  }
}
