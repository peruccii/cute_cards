import { Replace } from '@application/helpers/replace';
import { randomUUID } from 'crypto';
import { PaymentStatus } from './enums/paymentStatus';

export interface PaymentProps {
  status_payment: PaymentStatus;
  email_user: string;
  createdAt: Date;
}

export class Payment {
  private props: PaymentProps;
  private _id: string;

  constructor(props: Replace<PaymentProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this.createdAt;
  }

  public set email_user(email_user: string) {
    this.props.email_user = email_user;
  }

  public get email_user(): string {
    return this.props.email_user;
  }

  public set status_payment(status_payment: PaymentStatus) {
    this.props.status_payment = status_payment;
  }

  public get status_payment(): PaymentStatus {
    return this.props.status_payment;
  }
}
