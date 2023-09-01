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
  ],
  imports: [CommonModule, BookRoutingModule, RouterModule],
})
export class BookModule {}
