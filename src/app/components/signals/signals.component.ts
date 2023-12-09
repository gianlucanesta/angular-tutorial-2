import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  // actions: string[] = [];
  actions = signal<string[]>([]);
  counter = signal(0);

  increment() {
    // this.counter.update((oldCounter) => oldCounter + 1);
    this.counter.set(this.counter() + 1);
    this.actions.mutate((oldActions: any) => oldActions.push('INCREMENT'));
    // this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    // this.counter.set(this.counter() - 1);

    // this.actions.push('DECREMENT');
    // this.actions.mutate((oldActions: any) => oldActions.push('DECREMENT'))
    this.actions.update((oldActions) => [...oldActions, 'DECREMENT']);
  }
}
