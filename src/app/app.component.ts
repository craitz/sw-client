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
    // inicializa o serviço Star Wars para o carregamento imediato, em background, dos dados da SWAPI
    this.swService.init();

    // a cada refresh ou rebuild, o aplicativo volta para a página inicial
    this.router.navigateByUrl('/');
  }

  public isLoading() {
    return this.swService.loadingCharacters || this.swService.loadingFilms;
  }

  public getCharactersIcon(): string {
    return this.swService.loadingCharacters ? 'fas fa-spinner fa-spin' : 'fas fa-user';
  }

  public getStatisticsIcon(): string {
    return this.swService.loadingFilms ? 'fas fa-spinner fa-spin' : 'fas fa-film';
  }
}
