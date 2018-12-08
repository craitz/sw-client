import { Component, Injectable, OnInit } from '@angular/core';
import { StarWarsService } from '../../services/star-wars/star-wars.service';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})

@Injectable()
export class CharactersPageComponent implements OnInit {
  // variáveis da classe
  private characters = null;

  constructor(private swService: StarWarsService) { }

  ngOnInit() {
    // busca a lista de personagens
    this.getCharacters();
  }

  private async getCharacters() {
    // se já carregaou os personagems da SWAPI, não precisa carregar de novo
    if (this.characters) {
      return;
    }

    setTimeout(() => {
      // checa se o serviço em background já carregou os personagens
      if (!this.swService.loadingFilms) {
        // atribui à variável da classe
        this.characters = this.swService.characters;
      }
    }, 50);
  }
}
