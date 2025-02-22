import { randomUUID } from 'crypto';
import { InvitePlan } from './enums/invitePlan';
import { InviteType } from './enums/inviteType';
import { Email } from './fieldsValidations/email';
import { Message } from './fieldsValidations/message';
import { SubTitle } from './fieldsValidations/subTitle';
import { Title } from './fieldsValidations/title';
import { UrlMusic } from './fieldsValidations/url_music';
import { PhotoLimitExceeded } from '@application/usecases/errors/photo-limit-exceeded';
import { Replace } from '@application/helpers/replace';
import { PaymentMethod } from './enums/paymentMethod';

export interface InviteProps {
  date: Date | null;
  url_music: UrlMusic | null;
  email: Email;
  title: Title;
  sub_title: SubTitle;
  message: Message;
  image_urls: string[];
  invite_type: InviteType;
  invite_plan: InvitePlan;
  names: string;
  payment_method: PaymentMethod;
  expirationDate: Date;
  card_color: string;
  bg_color: string;
  createdAt: Date;
}

export class Invite {
  private props: InviteProps;
  private _id: string;

  constructor(props: Replace<InviteProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set date(date: Date | null) {
    this.props.date = date;
  }

  public get expirationDate(): Date {
    return this.props.expirationDate;
  }

  public set expirationDate(expirationDate: Date) {
    this.props.expirationDate = expirationDate;
  }

  public get date(): Date | null {
    return this.props.date;
  }

  public set url_music(url_music: UrlMusic | null) {
    this.props.url_music = url_music;
  }

  public get url_music(): UrlMusic | null {
    return this.props.url_music;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set payment_method(payment_method: PaymentMethod) {
    this.props.payment_method = payment_method;
  }

  public get payment_method(): PaymentMethod {
    return this.props.payment_method;
  }

  public set title(title: Title) {
    this.props.title = title;
  }

  public get title(): Title {
    return this.props.title;
  }

  public set sub_title(sub_title: SubTitle) {
    this.props.sub_title = sub_title;
  }

  public get sub_title(): SubTitle {
    return this.props.sub_title;
  }

  public set message(message: Message) {
    this.props.message = message;
  }

  public get message(): Message {
    return this.props.message;
  }

  public set card_color(card_color: string) {
    this.props.card_color = card_color;
  }

  public get card_color(): string {
    return this.props.card_color;
  }

  public set bg_color(bg_color: string) {
    this.props.bg_color = bg_color;
  }

  public get bg_color(): string {
    return this.props.bg_color;
  }

  public set names(names: string) {
    this.props.names = names;
  }

  public get names(): string {
    return this.props.names;
  }

  public set image_urls(image_urls: string[]) {
    this.props.image_urls = image_urls;
  }

  public get image_urls(): string[] {
    return this.props.image_urls;
  }

  public set invite_type(invite_type: InviteType) {
    this.props.invite_type = invite_type;
  }

  public get invite_type(): InviteType {
    return this.props.invite_type;
  }

  public set invite_plan(invite_plan: InvitePlan) {
    this.props.invite_plan = invite_plan;
  }

  public get invite_plan(): InvitePlan {
    return this.props.invite_plan;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public varifyIfUserCanPutUrlMusic(
    invitePlan: InvitePlan,
    url_music: string | null | undefined,
  ) {
    if (invitePlan != InvitePlan.PREMIUM && url_music != null)
      throw new Error(`Type ${invitePlan} cannot select music.`);
  }

  public verifyQuantityOfPhothosByInvitePlan(
    plan: InvitePlan,
    images: string[],
  ) {
    switch (plan) {
      case InvitePlan.BASIC:
        console.log(images);
        if (images.length > 3) {
          throw new PhotoLimitExceeded('BASIC', '3');
        }
        break;

      case InvitePlan.PREMIUM:
        if (images.length > 7) {
          console.log(images);
          throw new PhotoLimitExceeded('PREMIUM', '7');
        }
        break;

      default:
        break;
    }
  }
}
