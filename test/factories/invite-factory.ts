import { InvitePlan } from "@application/entities/enums/invitePlan";
import { InviteType } from "@application/entities/enums/inviteType";
import { Email } from "@application/entities/fieldsValidations/email";
import { Message } from "@application/entities/fieldsValidations/message";
import { SubTitle } from "@application/entities/fieldsValidations/subTitle";
import { Title } from "@application/entities/fieldsValidations/title";
import { UrlMusic } from "@application/entities/fieldsValidations/url_music";
import { Invite, InviteProps } from "@application/entities/invite";

type Override = Partial<InviteProps>

export function makeInvite(override: Override = {}) {
    return new Invite({
        date: new Date('2024-12-05'),
        sub_title: new SubTitle('This is a sub_title text'),
        email: new Email('email@example.com'),
        title: new Title('This is a title text'),
        url_music: new UrlMusic('https://www.youtube.com/watch?v=hTWKbfoikeg'),
        message: new Message('This is a message text.'),
        imageUrls: [''],
        invite_plan: InvitePlan.BASIC,
        invite_type: InviteType.LOVE,
        ...override
    })
}
