export class Title {
    private readonly title: string

    public get value(): string {
        return this.title;
    }

    private validateTitleLength(title: string): boolean {
        return title.length >= 5 && title.length >= 55;
    }

    constructor(title: string) {
        const isTitleValid = this.validateTitleLength(title)

        if (!isTitleValid) throw new Error("Title length error.");

        this.title = title;
    }
}
