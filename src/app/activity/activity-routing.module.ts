import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityTableContainerComponent } from './components/activity-table-container/activity-table-container.component';
import { ActivityActiveReservationsComponent } from './components/activity-table-container/activity-active-reservations/activity-active-reservations.component';
import { ActivityArchivedReservationsComponent } from './components/activity-table-container/activity-archived-reservations/activity-archived-reservations.component';
import { ActivityBorrowedListComponent } from './components/activity-table-container/activity-borrowed-list/activity-borrowed-list.component';
import { ActivityOverdueListComponent } from './components/activity-table-container/activity-overdue-list/activity-overdue-list.component';
import { ActivityReturnedListComponent } from './components/activity-table-container/activity-returned-list/activity-returned-list.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
    children: [
      {
        path: '',
        component: ActivityTableContainerComponent,
        children: [
          {
            path: '',
            redirectTo: 'borrowed',
            pathMatch: 'full',
          },
          {
            path: 'borrowed',
            component: ActivityBorrowedListComponent,
          },
          {
            path: 'returned',
            component: ActivityReturnedListComponent,
          },
          {
            path: 'overdue',
            component: ActivityOverdueListComponent,
          },
          {
            path: 'active-reservations',
            component: ActivityActiveReservationsComponent,
          },
          {
            path: 'archived-reservations',
            component: ActivityArchivedReservationsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ActivityRoutingModule {}
