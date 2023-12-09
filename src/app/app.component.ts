import { Component } from '@angular/core';
import { DefaultComponent } from './components/default/default.component';
import { SignalsComponent } from './components/signals/signals.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DefaultComponent, SignalsComponent],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
