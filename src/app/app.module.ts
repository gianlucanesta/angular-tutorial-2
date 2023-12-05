import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WelcomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
