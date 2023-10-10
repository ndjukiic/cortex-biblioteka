import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-borrowed-list',
  templateUrl: './activity-borrowed-list.component.html',
  styleUrls: ['./activity-borrowed-list.component.css']
})
export class ActivityBorrowedListComponent implements OnInit {
  borrowedBooks: BorrowedBook[];
  
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.loadBorrowedBooks().subscribe(
      borrowedBook => {
        this.borrowedBooks = borrowedBook;
      }
    )
  }
}
