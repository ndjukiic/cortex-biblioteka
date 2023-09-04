import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentTabDetailComponent } from './components/student-detail/student-tab-detail/student-tab-detail.component';

const routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: ':id',
    component: StudentDetailComponent,
    children: [
      {
        path: 'details',
        component: StudentTabDetailComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StudentRoutingModule {}
