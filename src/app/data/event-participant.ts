import {StudentReferralSource} from './student';

export type EventParticipantStatus = 'REQUEST' | 'EARLY_CONFIRMATION' | 'LATE_CONFIRMATION' | 'ATTENDED' | 'NOT_ATTENDED' | 'CANCELED'

export class EventParticipant {
  public constructor(
    public id: number = null,
    public eventId: number = null,
    public name: String = null,
    public status: EventParticipantStatus = null,
    public phone: String = null,
    public referralSource: StudentReferralSource = null
  ) {}
}
