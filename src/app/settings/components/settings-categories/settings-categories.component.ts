import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';

@Component({
  selector: 'app-settings-categories',
  templateUrl: './settings-categories.component.html',
})
export class SettingsCategoriesComponent implements OnInit {
  data: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.loadBookForEdit(3).subscribe((response) => {
      this.data = response;
    });
  }
}
