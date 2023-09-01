import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookTabDetailsComponent } from './components/book-tab-details/book-tab-details.component';
import { BookTabSpecificationsComponent } from './components/book-tab-specifications/book-tab-specifications.component';
import { BookTabLogsComponent } from './components/book-tab-logs/book-tab-logs.component';
import { BookTabMultimediaComponent } from './components/book-tab-multimedia/book-tab-multimedia.component';

const routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: ':id',
    component: BookDetailComponent,
    children: [
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
      },
      {
        path: 'multimedia',
        component: BookTabMultimediaComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookRoutingModule {}
