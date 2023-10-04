import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorListComponent } from './components/author-list/author-list.component';


const routes = [
    {
      path: '',
      component: AuthorListComponent,
    },
    {
      path: 'add',
      component: AuthorAddComponent,
    },
    {
      path: ':id',
      component: AuthorDetailComponent,
      children: [
        {
          path: 'details',
          component: AuthorDetailComponent,
        },
    
      ],
    },
    {
      path: ':id/edit',
      component: AuthorEditComponent,
    },
  ]
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes), 
      RouterModule.forRoot(routes)
    ],
    
  })
  export class AuthorRoutingModule {}
  