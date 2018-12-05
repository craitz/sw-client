import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterList } from '../models/characterList.model';


@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})

@Injectable()
export class CharactersPageComponent implements OnInit {
  private characters: CharacterList = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.http.get('https://swapi.co/api/people?page=9').subscribe(data => {
      this.characters = <CharacterList>data;
    });
  }
}