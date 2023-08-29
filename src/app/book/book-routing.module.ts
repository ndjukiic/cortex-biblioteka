import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'add',
    component: BookDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookRoutingModule {}
