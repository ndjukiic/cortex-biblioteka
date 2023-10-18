import { NgModule } from '@angular/core';
import { SettingsBaseComponent } from './components/settings-base/settings-base.component';
import { SettingsPolicyComponent } from './components/settings-policy/settings-policy.component';
import { SettingsGenresComponent } from './components/settings-genres/settings-genres.component';
import { SettingsPublishersComponent } from './components/settings-publishers/settings-publishers.component';
import { SettingsBookbindsComponent } from './components/settings-bookbinds/settings-bookbinds.component';
import { SettingsFormatsComponent } from './components/settings-formats/settings-formats.component';
import { SettingsScriptsComponent } from './components/settings-scripts/settings-scripts.component';
import { RouterModule } from '@angular/router';
import { SettingsCategoriesComponent } from './components/settings-categories/settings-categories.component';
import { SettingsCategoriesAddComponent } from './components/settings-categories-add/settings-categories-add.component';
import { SettingsGenresAddComponent } from './components/settings-genres-add/settings-genres-add.component';
import { SettingsPublishersAddComponent } from './components/settings-publishers-add/settings-publishers-add.component';
import { SettingsBookbindsAddComponent } from './components/settings-bookbinds-add/settings-bookbinds-add.component';
import { SettingsFormatsAddComponent } from './components/settings-formats-add/settings-formats-add.component';
import { SettingsScriptsAddComponent } from './components/settings-scripts-add/settings-scripts-add.component';

const routes = [
  {
    path: '',
    component: SettingsBaseComponent,
    children: [
      {
        path: 'policy',
        component: SettingsPolicyComponent,
      },
      {
        path: 'genres',
        component: SettingsGenresComponent,
      },
      {
        path: 'genres/add',
        component: SettingsGenresAddComponent,
      },
      {
        path: 'categories',
        component: SettingsCategoriesComponent
      },
      {
        path: 'categories/add',
        component: SettingsCategoriesAddComponent,
      },
      {
        path: 'publishers',
        component: SettingsPublishersComponent,
      },
      {
        path: 'publishers/add',
        component: SettingsPublishersAddComponent,
      },
      {
        path: 'bookbinds',
        component: SettingsBookbindsComponent,
      },
      {
        path: 'bookbinds/add',
        component: SettingsBookbindsAddComponent,
      },
      {
        path: 'formats',
        component: SettingsFormatsComponent,
      },
      {
        path: 'formats/add',
        component: SettingsFormatsAddComponent,
      },
      {
        path: 'scripts',
        component: SettingsScriptsComponent,
      },
      {
        path: 'scripts/add',
        component: SettingsScriptsAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule {}
