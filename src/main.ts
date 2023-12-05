import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule)],
});
