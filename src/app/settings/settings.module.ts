import { NgModule } from '@angular/core';
import { SettingsBaseComponent } from './components/settings-base/settings-base.component';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { SettingsBookbindsComponent } from './components/settings-bookbinds/settings-bookbinds.component';
import { SettingsCategoriesComponent } from './components/settings-categories/settings-categories.component';
import { SettingsFormatsComponent } from './components/settings-formats/settings-formats.component';
import { SettingsGenresComponent } from './components/settings-genres/settings-genres.component';
import { SettingsPolicyComponent } from './components/settings-policy/settings-policy.component';
import { SettingsPublishersComponent } from './components/settings-publishers/settings-publishers.component';
import { SettingsScriptsComponent } from './components/settings-scripts/settings-scripts.component';
import { SettingsCategoriesAddComponent } from './components/settings-categories-add/settings-categories-add.component';
import { SettingsGenresAddComponent } from './components/settings-genres-add/settings-genres-add.component';
import { SettingsPublishersAddComponent } from './components/settings-publishers-add/settings-publishers-add.component';
import { SettingsBookbindsAddComponent } from './components/settings-bookbinds-add/settings-bookbinds-add.component';
import { SettingsFormatsAddComponent } from './components/settings-formats-add/settings-formats-add.component';
import { SettingsScriptsAddComponent } from './components/settings-scripts-add/settings-scripts-add.component';

@NgModule({
  declarations: [
    SettingsBaseComponent,
    SettingsBookbindsComponent,
    SettingsCategoriesComponent,
    SettingsFormatsComponent,
    SettingsGenresComponent,
    SettingsPolicyComponent,
    SettingsPublishersComponent,
    SettingsScriptsComponent,
    SettingsCategoriesAddComponent,
    SettingsGenresAddComponent,
    SettingsPublishersAddComponent,
    SettingsBookbindsAddComponent,
    SettingsFormatsAddComponent,
    SettingsScriptsAddComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, RouterModule],
})
export class SettingsModule {}
