import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarianListComponent } from './components/librarian-list/librarian-list.component';
import { RouterModule } from '@angular/router';
import { LibrarianRoutingModule } from  './librarian-routing.module';
import { LibrarianDetailComponent } from './components/librarian-detail/librarian-detail.component';
import { LibrarianTopBarComponent } from './components/librarian-detail/librarian-top-bar/librarian-top-bar.component';
import { LibrarianAddComponent } from './components/librarian-add/librarian-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LibrarianService } from './services/librarian.service';
import { LibrarianEditComponent } from './components/librarian-edit/librarian-edit.component';



@NgModule({
  declarations: [
    LibrarianListComponent,
    LibrarianDetailComponent,
    LibrarianTopBarComponent,
    LibrarianAddComponent,
    LibrarianEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LibrarianRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LibrarianService
  ]
})
export class LibrarianModule { }
