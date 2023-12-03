import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesModule } from './components/recipes/recipes.module';
import { ShoppingListModule } from './components/shopping-list/shopping-list.module';
import { SharedModule } from './components/shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './authentication/auth.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService],
})
export class AppModule {}
