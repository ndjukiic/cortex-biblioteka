import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookTabDetailsComponent } from './components/book-tab-details/book-tab-details.component';
import { BookTabSpecificationsComponent } from './components/book-tab-specifications/book-tab-specifications.component';
import { BookTabLogsComponent } from './components/book-tab-logs/book-tab-logs.component';
import { BookTabMultimediaComponent } from './components/book-tab-multimedia/book-tab-multimedia.component';
import { BookAddComponent } from './components/book-add/book-add/book-add.component';
import { BookAddDetailsComponent } from './components/book-add/book-add-details/book-add-details.component';
import { BookAddSpecsComponent } from './components/book-add/book-add-specs/book-add-specs.component';
import { BookAddMultimediaComponent } from './components/book-add/book-add-multimedia/book-add-multimedia.component';
import { BookEditComponent } from './components/book-edit/book-edit/book-edit.component';
import { BookEditDetailsComponent } from './components/book-edit/book-edit-details/book-edit-details.component';
import { BookEditSpecsComponent } from './components/book-edit/book-edit-specs/book-edit-specs.component';
import { BookEditMultimediaComponent } from './components/book-edit/book-edit-multimedia/book-edit-multimedia.component';

const routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'add',
    component: BookAddComponent,
    children: [
      {
        path: '',
        component: BookAddDetailsComponent,
      },
      {
        path: 'specs',
        component: BookAddSpecsComponent,
      },
      {
        path: 'multimedia',
        component: BookAddMultimediaComponent,
      },
    ],
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
        component: BookTabMultimediaComponent,
      },
    ],
  },
  {
    path: ':id/edit',
    component: BookEditComponent,
    children: [
      {
        path: '',
        component: BookEditDetailsComponent,
      },
      {
        path: 'specs',
        component: BookEditSpecsComponent,
      },
      {
        path: 'multimedia',
        component: BookEditMultimediaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookRoutingModule {}
