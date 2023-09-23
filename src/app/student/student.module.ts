import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentTopBarComponent } from './components/student-detail/student-top-bar/student-top-bar.component';
import { StudentTabDetailComponent } from './components/student-detail/student-tab-detail/student-tab-detail.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './services/student.service';
import { StudentTabHistoryComponent } from './components/student-detail/student-tab-history/student-tab-history.component';




@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentTopBarComponent,
    StudentTabDetailComponent,
    StudentAddComponent,
    StudentEditComponent,
    StudentTabHistoryComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
