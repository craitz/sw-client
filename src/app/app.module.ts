import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {CharactersPageComponent} from './characters-page/characters-page.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';

import { StarWarsService } from '../app/star-wars.service';

@NgModule({
  declarations: [
    AppComponent,
    CharactersPageComponent,
    StatisticsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
