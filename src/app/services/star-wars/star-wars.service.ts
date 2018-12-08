import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  // variáveis da classe
  public planets = [];
  public species = [];
  public films = [];
  public characters = [];
  public loadingCharacters = false;
  public errorLoadingCharacters = false;
  public loadingFilms = false;
  public errorLoadingFilms = false;

  constructor(private http: HttpClient) { }

  public init() {
    this.loadCharactersData();
    this.loadFilmsData();
  }

  private async loadCharactersData() {
    try {
      // resset flag de erro
      this.errorLoadingCharacters = false;

      if (this.characters.length === 0) {
        // seta flag de carregamento
        this.loadingCharacters = true;
        console.log('loading chars...');

        // carrega data
        await this.getPage('https://swapi.co/api/planets', this.planets);
        await this.getPage('https://swapi.co/api/species', this.species);
        await this.getPage('https://swapi.co/api/people', this.characters);

        // reset flag de carregmento
        this.loadingCharacters = false;
        console.log('finished loading chars...');
      }
    } catch (error) {
      // reset flag de carregamento
      this.loadingCharacters = false;

      // seta flag de erro
      this.errorLoadingCharacters = true;
    }
  }

  private async loadFilmsData() {
    try {
      // resset flag de erro
      this.errorLoadingFilms = false;

      // checa se os filmes ainda não foram carregados da SWAPI
      if (this.films.length === 0) {
        // seta flag de carregamento
        this.loadingFilms = true;

        // carrega data
        await this.getPage('https://swapi.co/api/films', this.films);

        // reset flag de carregmento
        this.loadingFilms = false;
      }

    } catch (error) {
      // reset flag de carregamento
      this.loadingFilms = false;

      // seta flag de erro
      this.errorLoadingFilms = true;
    }
  }

  // // Método que inicializa a lista de personagens
  // public async initCharactersContent() {
  //   try {
  //     // se ainda não foram carregados os personagens
  //     if (this.characters.length === 0) {
  //       // seta flag de carregamento
  //       this.loading = true;

  //       // busca dados necessários na SWAPI
  //       await this.getPage('https://swapi.co/api/planets', this.planets);
  //       await this.getPage('https://swapi.co/api/species', this.species);
  //       await this.getPage('https://swapi.co/api/people', this.characters);

  //       // faz o lookup entre coleções para obter 'Planeta natal' e 'Espécie'
  //       await this.buildCharacteres();

  //       // reseta flag de carregamento
  //       this.loading = false;
  //     }
  //   } catch (err) {
  //       // reseta flag de carregamento
  //       this.loading = false;

  //       // loga o erro
  //       console.log(err);
  //   }
  // }

  // // Método que inicializa a lista de filmes
  // public async initStatisticsContent() {
  //   try {
  //     // se ainda não foram carregados os filmes
  //     if (this.films.length === 0) {
  //       // seta a flag de carregamento
  //       this.loading = true;

  //       // busca dados necessários na SWAPI
  //       await this.getPage('https://swapi.co/api/films', this.films);

  //       // reseta a flag de carregamento
  //       this.loading = false;
  //     }
  //   } catch (err) {
  //       // reseta a flag de carregamento
  //       this.loading = false;

  //       // loga o erro
  //       console.log(err);
  //   }
  // }

  // Método que monta a lista com os dados que aparecerão na tabela
  public buildCharacteres() {
    return new Promise((resolve, reject) => {
      try {
        // persorre o array de personagens
        for (let i = 0; i < this.characters.length; i++) {
          // faz o lookup entre coleções para buscar o nome do planeta natal
          this.characters[i].homeworld = this.getName(this.planets, this.characters[i].homeworld);

          // se o array de espécies do personagem não está vazia 
          if (this.characters[i].species && this.characters[i].species.length > 0) {
            // faz o lookup entre coleções para buscar o nome despécie
            this.characters[i].species[0] = this.getName(this.species, this.characters[i].species[0]);
          }

          // última iteração
          if ((this.characters.length - 1) === i) {
            resolve();
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // Método que percorre a lista e retorna apenas o nome do recurso
  private getName(list, url) {
    return list.filter(item => {
      return item.url === url;
    })[0].name;
  }

  // Métodos que retorna uma página de dados da SWAPI
  private async getPage(url, list) {
    try {
      // obtém a página
      const page = await this.GetData(url);

      // percorre os itens da página e os insere na lista principal
      for (let i = 0; i < page.results.length; i++) {
        list.push(page.results[i]);

        // última iteração
        if ((page.results.length - 1) === i) {
          // última página
          if (page.next === null) {
            return;
          }

          // chama o método recursivamente para obter a próxima página
          await this.getPage(page.next, list);
        }
      }
    } catch (err) {
      // loga o erro
      console.log(err);
    }
  }

  // Método que faz a chamada HTTP para a SWAPI
  private GetData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(url).subscribe(data => {
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
