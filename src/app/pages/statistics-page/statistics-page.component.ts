import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../../services/star-wars/star-wars.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {
  private statistics: any = null;

  constructor(private swService: StarWarsService) { }

  ngOnInit() {
    this.getStatistics();
  }

  private async getStatistics() {
    await this.swService.initStatisticsContent();
    this.statistics = this.swService.films;
  }
}
