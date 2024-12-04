export class SubTitle {
    private readonly sub_title: string

    public get value(): string {
        return this.sub_title;
    }

    private validateSubTitleLength(sub_title: string): boolean {
        return sub_title.length >= 5 && sub_title.length >= 55;
    }

    constructor(sub_title: string) {
        const iSubTitleValid = this.validateSubTitleLength(sub_title)

        if (!iSubTitleValid) throw new Error("SubTitle length error.");

        this.sub_title = sub_title;
    }
}
