import {Person} from './person';
import {EducationInfo} from './education-info';

export class NewStudentOnBoarding {
  constructor(
    public info: StudentOnBoardingInfo = new StudentOnBoardingInfo(),
    public action: NewStudentOnBoardingAction = new NewStudentOnBoardingAction()
  ) {}
}

export class ExistingStudentOnBoarding {
  constructor(
    public info: StudentOnBoardingInfo,
    public actions: Array<ExistingStudentOnBoardingAction>,
    public result: StudentOnBoardingResult
  ) {}
}

export class StudentOnBoardingInfo {
  constructor(
    public login: string = '',
    public person: Person = new Person(),
    public educationInfo: EducationInfo = new EducationInfo(),
    public managerLogin: string = ''
  ) {}
}

export class StudentOnBoardingResult {
  constructor(
    public type: StudentOnBoardingType,
    public comment: string
  ) {}
}

export class NewStudentOnBoardingAction {
  constructor(
    public info: StudentOnBoardingActionInfo = new StudentOnBoardingActionInfo()
  ) {}
}

export class ExistingStudentOnBoardingAction {
  constructor(
    public info: StudentOnBoardingActionInfo,
    public creationTime: number,
    public completionTime: number
  ) {}
}

export class StudentOnBoardingActionInfo {
  constructor(
    public assigneeLogin: string = '',
    public actionTime: number = new Date().getTime(),
    public description: string = ''
  ) {}
}

export type StudentOnBoardingType = 'PROGRESS' | 'ON_BOARDED' | 'CANCELED';

export class StudentOnBoardingTypeUtils {
  public static values: Array<StudentOnBoardingType> = [
    'PROGRESS', 'ON_BOARDED', 'CANCELED'
  ];
}
