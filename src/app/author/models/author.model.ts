export class Author{
    id: number;
    name: string;
    surname: string;
    biography?: string;
    image?: string;

    constructor(
        id: number,
        name: string,
        surname: string,
        biography: string,
        image: string) {
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.biography = biography;
            this.image = image;
        }
}

