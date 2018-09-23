import {StudentReferralSource} from './student';

export type EventParticipantStatus = 'REQUEST' | 'EARLY_CONFIRMATION' | 'LATE_CONFIRMATION' | 'ATTENDED' | 'NOT_ATTENDED' | 'CANCELED'

export class EventParticipant {
  public constructor(
    public id: number,
    public eventId: number,
    public name: String,
    public status: EventParticipantStatus,
    public phone: String,
    public referralSource: StudentReferralSource
  ) {}
}
