import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit  {
  @Input() movieId!: number;
  @Input() movieTitle!: string;
  @Input() moviePosterPath!: string;
  @Input() movieGenres!: string;
  @Input() movieReleaseYear!: string;

  isMenuOpen = false;
  filter: string | null = null;
  sort: string | null = null;

  defaultPic: string = '../../../../static/noimage.png';

  setDefaultPic() {
    this.moviePosterPath = this.defaultPic;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'];
      this.sort = params['sorting'];
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // this.store.dispatch({ type: '[Modal] Set Movie', payload: this.movie });
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openModal(type: string): void {
    // this.store.dispatch({ type: '[Modal] Set Open', payload: true });
    // this.store.dispatch({ type: '[Modal] Set Type', payload: type });
  }
}
