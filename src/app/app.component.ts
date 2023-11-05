import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `
      h3 {
        color: dodgerblue;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-tutorial-2';

  serverElements = [
    { type: 'server', name: 'Testserver', content: 'Just a test!' },
  ];
  newServerName = '';
  newServerContent = '';
}
