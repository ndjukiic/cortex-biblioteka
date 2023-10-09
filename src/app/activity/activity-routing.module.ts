import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityBorrowedListComponent } from './components/activity-borrowed-list/activity-borrowed-list.component';
import { ActivityReturnedListComponent } from './components/activity-returned-list/activity-returned-list.component';

const routes = [
  {
    path: '',
    component: ActivityComponent,
    children: [
      {
        path: '',
        component: ActivityBorrowedListComponent,
      },
      {
        path: 'borrowed',
        component: ActivityBorrowedListComponent,
      },
      {
        path: 'returned',
        component: ActivityReturnedListComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ActivityRoutingModule {}
