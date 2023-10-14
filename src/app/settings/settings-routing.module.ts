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
        path: 'categories',
        component: SettingsCategoriesComponent
      },
      {
        path: 'publishers',
        component: SettingsPublishersComponent,
      },
      {
        path: 'bookbinds',
        component: SettingsBookbindsComponent,
      },
      {
        path: 'formats',
        component: SettingsFormatsComponent,
      },
      {
        path: 'scripts',
        component: SettingsScriptsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule {}
