import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-returned-list',
  templateUrl: './activity-returned-list.component.html',
  styleUrls: ['./activity-returned-list.component.css']
})
export class ActivityReturnedListComponent implements OnInit{
  returnedBooks: any;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.loadReturnedBooks().subscribe(
      returnedBook => {
        this.returnedBooks = returnedBook;
      }
    )
  }
}
