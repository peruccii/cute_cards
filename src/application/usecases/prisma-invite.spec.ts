import { makeInvite } from '@test/factories/invite-factory';
import { InMemoryInviteRepository } from '@test/repositories/in-memory-invite-repository';

describe('PRISMA INVITE TESTS', () => {
  it('should be able to persist invite on database', () => {
    //
    const inMemoryDatabase = new InMemoryInviteRepository();
    const invite = makeInvite();

    expect(() => inMemoryDatabase.create(invite));
  });
});
