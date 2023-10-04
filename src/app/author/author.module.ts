import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorService } from './services/author.service';


@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorAddComponent,
    AuthorDetailComponent,
    AuthorEditComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthorService
  ]
})
export class AuthorModule { }
