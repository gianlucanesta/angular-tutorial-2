import { Component } from '@angular/core';
import { WelcomeComponent } from './components/welcome/welcome.component';

@Component({
  standalone: true,
  imports: [WelcomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
