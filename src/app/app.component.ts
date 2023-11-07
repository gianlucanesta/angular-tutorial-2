import { AccountsService } from './services/accounts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];

  constructor(private AccountsService: AccountsService) {}

  ngOnInit(): void {
    this.accounts = this.AccountsService.accounts;
  }
}
