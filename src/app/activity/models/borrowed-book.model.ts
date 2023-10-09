import { Book } from "src/app/book/models/book.model";
import { Librarian } from "src/app/librarian/models/librarian.model";
import { Student } from "src/app/student/models/student.model";

export class BorrowedBook {
    id: number;
    student: Student;
    knjiga: Book;
    bibliotekar0: Librarian;
    bibliotekar1: null;
    borrow_date: string;
    return_date: string;
    status: string;
    action_date: string;
}