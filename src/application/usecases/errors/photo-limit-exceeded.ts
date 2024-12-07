export class PhotoLimitExceeded extends Error {
    constructor(plan: string, qntd: string) {
        super(`INVITE OF TYPE ${plan} BASIC CANNOT SELECT ${qntd}+ PHOTOS`)
    }
}
