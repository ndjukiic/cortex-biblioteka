import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-overdue-list',
  templateUrl: './activity-overdue-list.component.html',
  styleUrls: ['./activity-overdue-list.component.css']
})
export class ActivityOverdueListComponent implements OnInit {
  overdueBooks: BorrowedBook[];
  
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.loadOverdueBooks().subscribe(
      overdueBooks => {
        this.overdueBooks = overdueBooks;
      }
    )
  }
}
