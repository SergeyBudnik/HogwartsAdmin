import {StudentReferralSource} from './student';

export type EventParticipantStatus = 'REQUEST' | 'EARLY_CONFIRMATION' | 'LATE_CONFIRMATION' | 'ATTENDED' | 'NOT_ATTENDED' | 'CANCELED'

export class EventParticipant {
  public id: number = null;
  public eventId: number = null;
  public name: string = '';
  public status: EventParticipantStatus = 'REQUEST';
  public phone: string = '';
  public referralSource: StudentReferralSource = 'UNKNOWN';

  public constructor(eventId: number) {
    this.eventId = eventId;
  }
}
