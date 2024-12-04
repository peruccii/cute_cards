import { InvitePlan } from "./enums/invitePlan"
import { InviteType } from "./enums/inviteType"
import { Message } from "./fieldsValidations/message"
import { SubTitle } from "./fieldsValidations/subTitle"
import { Title } from "./fieldsValidations/title"
import { UrlMusic } from "./fieldsValidations/url_music"

interface InviteProps {
    id: string
    date: Date
    url_music: UrlMusic | null
    email: string
    title: Title
    sub_title: SubTitle
    message: Message
    imageUrls: string
    invite_type: InviteType
    invite_plan: InvitePlan
}

export class Invite {

    constructor(props: InviteProps) {}
}
