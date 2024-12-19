export class PhotoLimitExceeded extends Error {
  constructor(plan: string, qntd: string) {
    super(`INVITE OF TYPE ${plan} CANNOT SELECT ${qntd}+ PHOTOS`);
  }
}
