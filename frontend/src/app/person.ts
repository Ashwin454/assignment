export class Person {
    _id?: string;
    constructor(
        public name: string,
        public age: number,
        public gender: string,
        public phone: number
    ) {}
}
