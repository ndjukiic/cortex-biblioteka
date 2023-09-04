import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StudentRoutingModule {}
