import { InvitePlan } from '@application/entities/enums/invitePlan';
import { InviteType } from '@application/entities/enums/inviteType';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, Length } from 'class-validator';

export class PrepareInviteCheckoutBody {
  @IsNotEmpty()
  @Length(5, 55)
  title: string;
  @IsNotEmpty()
  @Length(5, 55)
  sub_title: string;
  @IsNotEmpty()
  @Length(5, 55)
  email: string;
  @IsNotEmpty()
  @Length(5, 307)
  message: string;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  url_music: string | null;
  imageUrls: string[];
  @IsNotEmpty()
  invite_type: InviteType;
  @IsNotEmpty()
  invite_plan: InvitePlan;
  @IsNotEmpty()
  expirationDate: Date;
  @IsNotEmpty()
  card_color: string;
  @IsNotEmpty()
  names: string;
}
