import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { DetailsComponent } from './components/welcome/details/details.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, DetailsComponent],
  imports: [BrowserModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
