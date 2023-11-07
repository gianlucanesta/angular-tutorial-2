import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './components/server/server.component';
import { ServersComponent } from './components/servers/servers.component';
import { WarningalertComponent } from './components/warningalert/warningalert.component';
import { SuccessalertComponent } from './components/successalert/successalert.component';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { ServerElementComponent } from './components/server-element/server-element.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { InactiveUsersComponent } from './components/inactive-users/inactive-users.component';
import { CounterService } from './services/counter/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningalertComponent,
    SuccessalertComponent,
    CockpitComponent,
    ServerElementComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [CounterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
