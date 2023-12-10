import { Component } from '@angular/core';
import { CounterControlsComponent } from './components/counter-controls/counter-controls.component';
import { CounterOutputComponent } from './components/counter-output/counter-output.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CounterOutputComponent, CounterControlsComponent],
})
export class AppComponent {}
