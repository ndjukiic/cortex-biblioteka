import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookTabDetailsComponent } from './components/book-tab-details/book-tab-details.component';
import { BookTabSpecificationsComponent } from './components/book-tab-specifications/book-tab-specifications.component';
import { BookTabLogsComponent } from './components/book-tab-logs/book-tab-logs.component';
import { BookTabMultimediaComponent } from './components/book-tab-multimedia/book-tab-multimedia.component';
import { BookAddComponent } from './components/book-add/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit/book-edit.component';
import { BookIssueComponent } from './components/book-issue/book-issue.component';
import { BookTabBorrowedComponent } from './components/book-tab-logs/book-tab-borrowed/book-tab-borrowed.component';
import { BookTabReturnedComponent } from './components/book-tab-logs/book-tab-returned/book-tab-returned.component';
import { BookTabOverdueComponent } from './components/book-tab-logs/book-tab-overdue/book-tab-overdue.component';
import { BookTabActiveReservationsComponent } from './components/book-tab-logs/book-tab-active-reservations/book-tab-active-reservations.component';
import { BookTabArchivedReservationsComponent } from './components/book-tab-logs/book-tab-archived-reservations/book-tab-archived-reservations.component';
import { BookDismissComponent } from './components/book-dismiss/book-dismiss.component';
import { BookReturnComponent } from './components/book-return/book-return.component';
import { BookReserveComponent } from './components/book-reserve/book-reserve.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'add',
    component: BookAddComponent,
  },
  {
    path: ':id',
    component: BookDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: BookTabDetailsComponent,
      },
      {
        path: 'specs',
        component: BookTabSpecificationsComponent,
      },
      {
        path: 'logs',
        component: BookTabLogsComponent,
        children: [
          {
            path: '',
            redirectTo: 'borrowed',
            pathMatch: 'full',
          },
          {
            path: 'borrowed',
            component: BookTabBorrowedComponent,
          },
          {
            path: 'returned',
            component: BookTabReturnedComponent,
          },
          {
            path: 'overdue',
            component: BookTabOverdueComponent,
          },
          {
            path: 'active-reservations',
            component: BookTabActiveReservationsComponent,
          },
          {
            path: 'archived-reservations',
            component: BookTabArchivedReservationsComponent,
          },
        ],
      },
      {
        path: 'dismiss',
        component: BookDismissComponent,
      },
      {
        path: 'issue',
        component: BookIssueComponent,
      },
      {
        path: 'multimedia',
        component: BookTabMultimediaComponent,
      },
    ],
  },
  {
    path: ':id/edit',
    component: BookEditComponent,
  },
  {
    path: ':id/return',
    component: BookReturnComponent,
  },
  {
    path: ':id/reserve',
    component: BookReserveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookRoutingModule {}
