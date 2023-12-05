import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DetailsComponent } from './components/welcome/details/details.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [BrowserModule, DetailsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
