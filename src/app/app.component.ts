import { Component, Injectable } from '@angular/core';
import { StarWarsService } from './services/star-wars/star-wars.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StarWarsService]
})

export class AppComponent {
  title = 'Star Wars Client';

  constructor(private swService: StarWarsService) {
    this.swService.init();
  }
}
