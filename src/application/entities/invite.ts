import { randomUUID } from "crypto"
import { InvitePlan } from "./enums/invitePlan"
import { InviteType } from "./enums/inviteType"
import { Email } from "./fieldsValidations/email"
import { Message } from "./fieldsValidations/message"
import { SubTitle } from "./fieldsValidations/subTitle"
import { Title } from "./fieldsValidations/title"
import { UrlMusic } from "./fieldsValidations/url_music"
import { PhotoLimitExceeded } from "@application/usecases/errors/photo-limit-exceeded"

export interface InviteProps {
    date: Date
    url_music: UrlMusic | null
    // email: Email
    title: Title
    sub_title: SubTitle
    message: Message
    imageUrls: string[]
    invite_type: InviteType
    invite_plan: InvitePlan
}

export class Invite {
    private props: InviteProps;
    private _id: string

    constructor(props: InviteProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    public get id(): string {
        return this._id
    }

    public set date(date: Date) {
        this.props.date = date
    }

    public get date(): Date {
        return this.props.date
    }

    public set url_music(url_music: UrlMusic) {
        this.props.url_music = url_music;
    }

    public get url_music(): UrlMusic | null {
        return this.props.url_music
    }

    // public set email(email: Email) {
    //     this.props.email = email;
    // }

    // public get email(): Email {
    //     return this.props.email
    // }

    public set title(title: Title) {
        this.props.title = title;
    }

    public get title(): Title {
        return this.props.title
    }

    public set sub_title(sub_title: SubTitle) {
        this.props.sub_title = sub_title;
    }

    public get sub_title(): SubTitle {
        return this.props.sub_title
    }

    public set message(message: Message) {
        this.props.message = message;
    }

    public get message(): Message {
        return this.props.message
    }

    public set imageUrls(imageUrls: string[]) {
        this.props.imageUrls = imageUrls;
    }

    public get imageUrls(): string[] {
        return this.props.imageUrls
    }

    public set invite_type(invite_type: InviteType) {
        this.props.invite_type = invite_type;
    }

    public get invite_type(): InviteType {
        return this.props.invite_type
    }

    public set invite_plan(invite_plan: InvitePlan) {
        this.props.invite_plan = invite_plan;
    }

    public get invite_plan(): InvitePlan {
        return this.props.invite_plan
    }


    public verifyQuantityOfPhothosByInvitePlan(plan: InvitePlan, images: string[]) {
        switch (plan) {
            case InvitePlan.BASIC:
                if (images.length > 3) { throw new PhotoLimitExceeded('BASIC', '3'); }
                break;

            case InvitePlan.PREMIUM:
                if (images.length > 7) { throw new PhotoLimitExceeded('PREMIUM', '7'); }
                break;

            default:
                break;
        }
    }
}
