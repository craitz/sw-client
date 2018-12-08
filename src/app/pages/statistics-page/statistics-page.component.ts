import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../../services/star-wars/star-wars.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {
  // variáveis da classe
  private statistics = null;

  constructor(private swService: StarWarsService) { }

  ngOnInit() {
    // busca a lista de filmes com as estatísticas
    this.getStatistics();
  }

  private async getStatistics() {
    // se já carregaou os filmes da SWAPI, não precisa carregar de novo
    if (this.statistics) {
      return;
    }

    setTimeout(() => {
      // checa se o serviço em background já carregou os filmes
      if (!this.swService.loadingFilms) {
        // atribui à variável da classe
        this.statistics = this.swService.films;
      }
    }, 50);
  }
}
