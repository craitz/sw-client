import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CharactersPageComponent } from './pages/characters-page/characters-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { StarWarsService } from './services/star-wars/star-wars.service';


@NgModule({
  declarations: [
    AppComponent,
    CharactersPageComponent,
    StatisticsPageComponent,
    HomePageComponent,
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
