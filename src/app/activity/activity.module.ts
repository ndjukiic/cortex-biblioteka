import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityRoutingModule } from './activity-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivitySidebarComponent } from './components/activity-sidebar/activity-sidebar.component';
import { ActivityBorrowedListComponent } from './components/activity-table-container/activity-borrowed-list/activity-borrowed-list.component';
import { ActivityReturnedListComponent } from './components/activity-table-container/activity-returned-list/activity-returned-list.component';
import { ActivityOverdueListComponent } from './components/activity-table-container/activity-overdue-list/activity-overdue-list.component';
import { ActivityActiveReservationsComponent } from './components/activity-table-container/activity-active-reservations/activity-active-reservations.component';
import { ActivityTableContainerComponent } from './components/activity-table-container/activity-table-container.component';
import { ActivityArchivedReservationsComponent } from './components/activity-table-container/activity-archived-reservations/activity-archived-reservations.component';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivitySidebarComponent,
    ActivityBorrowedListComponent,
    ActivityReturnedListComponent,
    ActivityOverdueListComponent,
    ActivityActiveReservationsComponent,
    ActivityArchivedReservationsComponent,
    ActivityTableContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
