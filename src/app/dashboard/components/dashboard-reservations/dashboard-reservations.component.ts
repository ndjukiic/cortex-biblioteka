import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from 'src/app/activity/models/borrowed-book.model';
import { ActivityService } from 'src/app/activity/services/activity.service';

@Component({
  selector: 'app-dashboard-reservations',
  templateUrl: './dashboard-reservations.component.html'
})
export class DashboardReservationsComponent implements OnInit {

  activeReservations: BorrowedBook[];
  rowsToShow: number = 4;
  filteredActiveReservations: BorrowedBook[];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.loadActiveReservations().subscribe(
      activeReservations => {
        this.activeReservations = activeReservations;
        this.filteredActiveReservations = activeReservations.slice(0, this.rowsToShow);
      }
    )
  }
}
