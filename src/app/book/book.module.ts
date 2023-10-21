import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookRoutingModule } from './book-routing.module';
import { RouterModule } from '@angular/router';
import { BookTabDetailsComponent } from './components/book-tab-details/book-tab-details.component';
import { BookTabSpecificationsComponent } from './components/book-tab-specifications/book-tab-specifications.component';
import { BookTabLogsComponent } from './components/book-tab-logs/book-tab-logs.component';
import { BookTabMultimediaComponent } from './components/book-tab-multimedia/book-tab-multimedia.component';
import { BookTopBarComponent } from './components/book-top-bar/book-top-bar.component';
import { BookStatsComponent } from './components/book-sidebar/book-stats/book-stats.component';
import { BookLogsComponent } from './components/book-sidebar/book-logs/book-logs.component';
import { BookSidebarComponent } from './components/book-sidebar/book-sidebar.component';
import { BookAddComponent } from './components/book-add/book-add/book-add.component';
import { BookAddDetailsComponent } from './components/book-add/book-add-details/book-add-details.component';
import { BookAddSpecsComponent } from './components/book-add/book-add-specs/book-add-specs.component';
import { BookAddMultimediaComponent } from './components/book-add/book-add-multimedia/book-add-multimedia.component';
import { BookEditComponent } from './components/book-edit/book-edit/book-edit.component';
import { BookEditDetailsComponent } from './components/book-edit/book-edit-details/book-edit-details.component';
import { BookEditSpecsComponent } from './components/book-edit/book-edit-specs/book-edit-specs.component';
import { BookEditMultimediaComponent } from './components/book-edit/book-edit-multimedia/book-edit-multimedia.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookReserveComponent } from './components/book-reserve/book-reserve.component';
import { BookTabBorrowedComponent } from './components/book-tab-logs/book-tab-borrowed/book-tab-borrowed.component';
import { BookTabReturnedComponent } from './components/book-tab-logs/book-tab-returned/book-tab-returned.component';
import { BookTabOverdueComponent } from './components/book-tab-logs/book-tab-overdue/book-tab-overdue.component';
import { BookTabActiveReservationsComponent } from './components/book-tab-logs/book-tab-active-reservations/book-tab-active-reservations.component';
import { BookTabArchivedReservationsComponent } from './components/book-tab-logs/book-tab-archived-reservations/book-tab-archived-reservations.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookTabDetailsComponent,
    BookTabSpecificationsComponent,
    BookTabLogsComponent,
    BookTabMultimediaComponent,
    BookTopBarComponent,
    BookStatsComponent,
    BookLogsComponent,
    BookSidebarComponent,
    BookAddComponent,
    BookAddDetailsComponent,
    BookAddSpecsComponent,
    BookAddMultimediaComponent,
    BookEditComponent,
    BookEditDetailsComponent,
    BookEditSpecsComponent,
    BookEditMultimediaComponent,
    BookReserveComponent,
    BookTabBorrowedComponent,
    BookTabReturnedComponent,
    BookTabOverdueComponent,
    BookTabActiveReservationsComponent,
    BookTabArchivedReservationsComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BookModule {}
