export class Note {
    constructor(
        public title: string,
        public content: string,
        public userId: number,
        public id?: number,
    ) {}
}