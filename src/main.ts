import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AnalyticsService } from './app/components/shared/analytics.service';

bootstrapApplication(AppComponent, {
  providers: [AnalyticsService],
});
