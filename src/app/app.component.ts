import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarWarsService } from './services/star-wars/star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StarWarsService]
})

export class AppComponent implements OnInit {
  title = 'Star Wars Client';

  constructor(private router: Router, private swService: StarWarsService) {
    //this.swService.init();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    console.log('Entroou');
  }
}
