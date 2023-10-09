import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityRoutingModule } from './activity-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivitySidebarComponent } from './components/activity-sidebar/activity-sidebar.component';
import { ActivityBorrowedListComponent } from './components/activity-borrowed-list/activity-borrowed-list.component';
import { ActivityReturnedListComponent } from './components/activity-returned-list/activity-returned-list.component';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivitySidebarComponent,
    ActivityBorrowedListComponent,
    ActivityReturnedListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
