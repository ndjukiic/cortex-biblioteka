import { Component } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-settings-genres',
  templateUrl: './settings-genres.component.html',
})
export class SettingsGenresComponent {
  data: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.loadBookForEdit(3).subscribe((response) => {
      this.data = response;
    });
  }
}
