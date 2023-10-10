import { Component, OnInit } from '@angular/core';
import { BorrowedBook } from '../../../models/borrowed-book.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-active-reservations',
  templateUrl: './activity-active-reservations.component.html',
  styleUrls: ['./activity-active-reservations.component.css']
})

export class ActivityActiveReservationsComponent implements OnInit {
  activeReservations: BorrowedBook[];
  
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.loadActiveReservations().subscribe(
      activeReservations => {
        this.activeReservations = activeReservations;
      }
    )
  }
}