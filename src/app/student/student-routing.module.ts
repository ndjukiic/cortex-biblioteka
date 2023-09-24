import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentTabDetailComponent } from './components/student-detail/student-tab-detail/student-tab-detail.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentTabHistoryComponent } from './components/student-detail/student-tab-history/student-tab-history.component';

const routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: 'add',
    component: StudentAddComponent,
  },
  {
    path: ':id',
    component: StudentDetailComponent,
    children: [
      {
        path: 'details',
        component: StudentTabDetailComponent,
      },
      {
        path: 'history',
        component: StudentTabHistoryComponent,
      },
    ],
  },
  {
    path: ':id/edit',
    component: StudentEditComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StudentRoutingModule {}
