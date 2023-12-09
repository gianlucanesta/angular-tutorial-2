import { Component } from '@angular/core';
import { DefaultComponent } from './components/default/default.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DefaultComponent],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
