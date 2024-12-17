import { makeInvite } from '@test/factories/invite-factory';
import { UrlMusic } from './fieldsValidations/url_music';
import { PhotoLimitExceeded } from '@application/usecases/errors/photo-limit-exceeded';
import { InvitePlan } from './enums/invitePlan';

describe('INVITE TEST', () => {
  it('should be able to create a invite', () => {
    const invite = makeInvite();
    expect(invite).toBeTruthy();
  });

  it('should be not able to create a invite because url_music is invalid', () => {
    expect(() => {
      makeInvite({ url_music: new UrlMusic('@') });
    }).toThrow(Error);
  });

  it('should not be able to create invite with more photos than invite plan BASIC require', async () => {
    const invite = makeInvite({ imageUrls: new Array(8).fill('') });

    expect(() => {
      invite.verifyQuantityOfPhothosByInvitePlan(
        invite.invite_plan,
        invite.imageUrls,
      );
    }).toThrow(PhotoLimitExceeded);
  });

  it('should not be able to create invite with more photos than invite plan PREMIUM require', async () => {
    const invite = makeInvite({
      invite_plan: InvitePlan.PREMIUM,
      imageUrls: new Array(8).fill(''),
    });

    expect(() => {
      invite.verifyQuantityOfPhothosByInvitePlan(
        invite.invite_plan,
        invite.imageUrls,
      );
    }).toThrow(PhotoLimitExceeded);
  });

  it('should be not able to create invite with url music as a invite of type basic', () => {
    const invite = makeInvite({
      invite_plan: InvitePlan.BASIC,
      url_music: new UrlMusic('https://www.youtube.com/watch?v=hTWKbfoikeg'),
    });

    expect(() => {
      invite.varifyIfUserCanPutUrlMusic(invite.invite_plan);
    }).toThrow(Error);
  });
});
