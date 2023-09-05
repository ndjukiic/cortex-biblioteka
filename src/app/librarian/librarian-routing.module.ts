import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibrarianListComponent } from './components/librarian-list/librarian-list.component';
import { LibrarianDetailComponent } from './components/librarian-detail/librarian-detail.component';
import { LibrarianAddComponent } from './components/librarian-add/librarian-add.component';
import { LibrarianEditComponent } from './components/librarian-edit/librarian-edit.component';


const routes = [
  {
    path: '',
    component: LibrarianListComponent,
  },
  {
    path: 'add',
    component: LibrarianAddComponent,
  },
  
  {
    path: ':id',
    component: LibrarianDetailComponent,
  },
  {
    path: ':id/edit',
    component: LibrarianEditComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class LibrarianRoutingModule {}
