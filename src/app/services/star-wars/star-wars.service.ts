import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  public planets: any = [];
  public species: any = [];
  public films: any = [];
  public characters: any = [];
  public loading: boolean = false;
  public charactersContentTsksCount: number = 3;

  constructor(private http: HttpClient) { }

  public initCharactersContent() {
    return new Promise((resolve, reject) => {
      if (this.characters.length === 0) {
        this.loading = true;
        this.getPage('https://swapi.co/api/planets', this.planets);
        this.getPage('https://swapi.co/api/species', this.species);
        this.getPage('https://swapi.co/api/people', this.characters);

        setInterval(() => {
          if (this.charactersContentTsksCount === 0) {
            this.buildCharacteres();
            this.loading = false;
            resolve();
          }
        }, 100);
      } else {
        resolve();
      }
    });
  }

  public async initStatisticsContent() {
    if (this.films.length === 0) {
      this.loading = true;
      await this.getPage('https://swapi.co/api/films', this.films);
      this.loading = false;
    }
  }

  private buildCharacteres() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i].homeworld = this.getName(this.planets, this.characters[i].homeworld);

        if (this.characters[i].species && this.characters[i].species.length > 0) {
          this.characters[i].species[0] = this.getName(this.species, this.characters[i].species[0]);
        }

        // última iteração
        if ((this.characters.length - 1) === i) {
          this.charactersContentTsksCount--;
          resolve();
        }
      }
    });
  }

  private getName(list, url) {
    return list.filter(item => {
      return item.url === url;
    })[0].name;
  }

  private async getPage(url, list) {
    const page = await this.GetData(url);
    for (let i = 0; i < page.results.length; i++) {
      list.push(page.results[i]);

      // última iteração
      if ((page.results.length - 1) === i) {
        // última página
        if (page.next === null) {
          this.charactersContentTsksCount--;
          return;
        }

        await this.getPage(page.next, list);
      }
    }
  }

  private GetData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      });
    });
  }
}
