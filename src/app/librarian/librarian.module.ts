import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarianListComponent } from './components/librarian-list/librarian-list.component';
import { RouterModule } from '@angular/router';
import { LibrarianRoutingModule } from  './librarian-routing.module';
import { LibrarianDetailComponent } from './components/librarian-detail/librarian-detail.component';
import { LibrarianTopBarComponent } from './components/librarian-detail/librarian-top-bar/librarian-top-bar.component'



@NgModule({
  declarations: [
    LibrarianListComponent,
    LibrarianDetailComponent,
    LibrarianTopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LibrarianRoutingModule
  ]
})
export class LibrarianModule { }
