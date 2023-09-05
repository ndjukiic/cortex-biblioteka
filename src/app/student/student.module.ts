import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentTopBarComponent } from './components/student-detail/student-top-bar/student-top-bar.component';
import { StudentTabDetailComponent } from './components/student-detail/student-tab-detail/student-tab-detail.component';
import { StudentAddComponent } from './components/student-add/student-add.component';




@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentTopBarComponent,
    StudentTabDetailComponent,
    StudentAddComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule
  ]
})
export class StudentModule { }
