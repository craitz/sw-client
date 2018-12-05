import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CharactersPageComponent} from './characters-page/characters-page.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';

const routes: Routes = [
  { path: 'characters', component: CharactersPageComponent },
  { path: 'statistics', component: StatisticsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
