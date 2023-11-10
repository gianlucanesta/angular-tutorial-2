import { AuthGuard } from 'src/app/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EditServerComponent } from './components/servers/edit-server/edit-server.component';
import { ServerComponent } from './components/servers/server/server.component';
import { ServersComponent } from './components/servers/servers.component';
import { UserComponent } from './components/users/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { ServersService } from './components/servers/servers.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './components/servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ServersService, AuthGuard, AuthService, CanDeactivateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
