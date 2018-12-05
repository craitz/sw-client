import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  public planets: any = [];
  public species: any = [];
  public films: any = [];
  public characters: any = [];

  constructor(private http: HttpClient) { }

  private GetData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data);
       });
    });
  }
}
