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
  ],
  imports: [CommonModule, SettingsRoutingModule, RouterModule],
})
export class SettingsModule {}
