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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './services/student.service';




@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentTopBarComponent,
    StudentTabDetailComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
