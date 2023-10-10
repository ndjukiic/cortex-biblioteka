import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-archived-reservations',
  templateUrl: './activity-archived-reservations.component.html',
  styleUrls: ['./activity-archived-reservations.component.css'],
})
export class ActivityArchivedReservationsComponent implements OnInit {
  archivedReservations: BorrowedBook[];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService
      .loadArchivedReservations()
      .subscribe((archivedReservations) => {
        this.archivedReservations = archivedReservations;
      });
  }
}
