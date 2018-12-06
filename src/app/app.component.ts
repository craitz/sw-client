import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StarWarsService } from './services/star-wars/star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StarWarsService]
})

export class AppComponent {
  constructor(private router: Router, private swService: StarWarsService) {
    // a cada refresh ou rebuild, o aplicativo volta para a página inicial
    this.router.navigateByUrl('/');
  }
}
