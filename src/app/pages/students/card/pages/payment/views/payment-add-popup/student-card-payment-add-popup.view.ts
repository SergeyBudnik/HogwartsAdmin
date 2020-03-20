import {Component, EventEmitter, Output} from '@angular/core';
import {NewStudentPayment, StaffMember, StudentPayment} from '../../../../../../../data';
import {StudentPaymentHttp} from '../../../../../../../http';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';

export class StudentCardPaymentAddPopupManager {
  private static popup: StudentCardPaymentAddPopupView = null;

  public static register(popup: StudentCardPaymentAddPopupView) {
    this.popup = popup;
  }

  public static show(
    studentId: number,
    staffMembers: Array<StaffMember>
  ) {
    if (!!this.popup) {
      this.popup.show(
        studentId,
        staffMembers
      );
    }
  }
}

@Component({
  selector: 'app-student-payment-add-popup',
  templateUrl: './student-card-payment-add-popup.view.html',
  styleUrls: ['./student-card-payment-add-popup.view.less']
})
export class StudentCardPaymentAddPopupView {
  @Output() public paymentAdded: EventEmitter<StudentPayment> = new EventEmitter<StudentPayment>();

  public modalStatus = new ModalStatus(false);

  public newStudentPayment = NewStudentPayment.createNew();

  public staffMembers: Array<StaffMember> = [];

  public constructor(
    private studentPaymentHttp: StudentPaymentHttp
  ) {
    StudentCardPaymentAddPopupManager.register(this);
  }

  public show(studentId: number, staffMember: Array<StaffMember>) {
    this.newStudentPayment.studentId = studentId;
    this.newStudentPayment.time = new Date().getTime();

    this.staffMembers = staffMember;

    this.modalStatus.visible = true;
  }

  public onAmountChange(amountString: string): void {
    const amount = Number.parseInt(amountString);

    if (!!amount && amount > 0) {
      this.newStudentPayment.amount = amount;
    } else {
      this.newStudentPayment.amount = null;
    }
  }

  public addPayment(): void {
    this.studentPaymentHttp
      .addPayment(this.newStudentPayment)
      .then(paymentId => {
        this.paymentAdded.emit(StudentPayment.createNew(paymentId, this.newStudentPayment));

        this.hideModal();
      });
  }

  public cancel(): void {
    this.hideModal();
  }

  private hideModal(): void {
    this.modalStatus.visible = false;
  }
}
