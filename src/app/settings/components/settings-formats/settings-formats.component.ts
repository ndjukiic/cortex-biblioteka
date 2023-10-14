import { Component } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-settings-formats',
  templateUrl: './settings-formats.component.html',
})
export class SettingsFormatsComponent {
  data: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.loadBookForEdit(3).subscribe((response) => {
      this.data = response;
    });
  }
}
