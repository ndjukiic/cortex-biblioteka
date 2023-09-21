export class Book {
  id?: number;
  title: string;
  photo?: string;
  description: string;
  category: { id: number; name: string };
  genre: { id: number; name: string };
  authors: { id: number; name: string };
  publisher: { id: number; name: string };
  publishingYear: number;
  quantity: number;
  pages: number;
  writingSystem: string;
  bookbind: string;
  language: string;
  cover?: string;
  format: string;
  isbn: number;

  constructor(
    id: number,
    title: string,
    photo: string,
    description: string,
    category: { id: number; name: string },
    genre: { id: number; name: string },
    authors: { id: number; name: string },
    publisher: { id: number; name: string },
    publishingYear: number,
    quantity: number,
    pages: number,
    writingSystem: string,
    language: string,
    bookbind: string,
    cover: string,
    format: string,
    isbn: number
  ) {
    this.id = id;
    this.title = title;
    this.photo = photo;
    this.description = description;
    this.category = category;
    this.genre = genre;
    this.authors = authors;
    this.publisher = publisher;
    this.publishingYear = publishingYear;
    this.quantity = quantity;
    this.pages = pages;
    this.writingSystem = writingSystem;
    this.bookbind = bookbind;
    this.language = language;
    this.cover = cover;
    this.format = format;
    this.isbn = isbn;
  }
}
