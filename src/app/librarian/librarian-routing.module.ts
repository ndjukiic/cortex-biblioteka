import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibrarianListComponent } from './components/librarian-list/librarian-list.component';
import { LibrarianDetailComponent } from './components/librarian-detail/librarian-detail.component';


const routes = [
  {
    path: '',
    component: LibrarianListComponent,
  },
  {
    path: ':id',
    component: LibrarianDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class LibrarianRoutingModule {}
