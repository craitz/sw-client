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
    // chama o serviço para carregar os personagens
    await this.swService.initCharactersContent();

    // atribui à variável da classe
    this.characters = this.swService.characters;
  }
}
