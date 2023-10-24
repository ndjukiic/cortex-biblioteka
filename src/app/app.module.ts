import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ActiveUserProvider } from './auth/services/active-user.provider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, RouterModule],
  providers: [
    ActiveUserProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: activeUserProviderFactory,
      deps: [ActiveUserProvider],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function activeUserProviderFactory(provider: ActiveUserProvider): any {
  return () => provider.getActiveUser();
}
