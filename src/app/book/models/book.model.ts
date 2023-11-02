export class Book {
  id?: number;
  title: string;
  photo?: string;
  description: string;
  categories: { id: number; name: string };
  genres: { id: number; name: string };
  authors: { id: number; name: string };
  pictures: [];
  publisher: { id: number; name: string };
  pDate: number;
  quantity: number;
  pages: number;
  script: { id: number; name: string };
  bookbind: { id: number; name: string };
  language: { id: number; name: string };
  cover?: string;
  format: { id: number; name: string };
  isbn: number;
  samples?: number;
  bSamples?: number;
  rSamples?: number;
  fSamples?: number;
  book?: Book;

  constructor(
    id: number,
    title: string,
    photo: string,
    description: string,
    categories: { id: number; name: string },
    genres: { id: number; name: string },
    authors: { id: number; name: string },
    pictures: [],
    publisher: { id: number; name: string },
    pDate: number,
    quantity: number,
    pages: number,
    script: { id: number; name: string },
    language: { id: number; name: string },
    bookbind: { id: number; name: string },
    cover: string,
    format: { id: number; name: string },
    isbn: number,
    samples: number,
    bSamples: number,
    rSamples: number,
    fSamples: number
  ) {
    this.id = id;
    this.title = title;
    this.photo = photo;
    this.description = description;
    this.categories = categories;
    this.genres = genres;
    this.authors = authors;
    this.pictures = pictures;
    this.publisher = publisher;
    this.pDate = pDate;
    this.quantity = quantity;
    this.pages = pages;
    this.script = script;
    this.bookbind = bookbind;
    this.language = language;
    this.cover = cover;
    this.format = format;
    this.isbn = isbn;
    this.samples = samples;
    this.bSamples = bSamples;
    this.rSamples = rSamples;
    this.fSamples = fSamples;
  }
}
