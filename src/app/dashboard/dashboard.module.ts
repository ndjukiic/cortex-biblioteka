import { NgModule } from '@angular/core';
import { DashboardActivitiesComponent } from './components/dashboard-activities/dashboard-activities.component';
import { DashboardGraphComponent } from './components/dashboard-graph/dashboard-graph.component';
import { DashboardReservationsComponent } from './components/dashboard-reservations/dashboard-reservations.component';
import { DashboardComponent } from './components/dashboard-base/dashboard.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardActivitiesComponent,
    DashboardGraphComponent,
    DashboardReservationsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
})
export class DashboardModule {}
