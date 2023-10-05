import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'librarians',
    loadChildren: () => import('./librarian/librarian.module').then((m) => m.LibrarianModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'authors',
    loadChildren: () => import('./author/author.module').then((m) => m.AuthorModule),
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
