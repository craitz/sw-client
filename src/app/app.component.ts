import { Component, Injectable } from '@angular/core';
import {StarWarsService} from './star-wars.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StarWarsService]
})

export class AppComponent {
  title = 'Star Wars Client';
}
