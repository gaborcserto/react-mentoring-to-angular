import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MovieService } from "../../../services/movie/movie.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnDestroy {
  movieId$: Observable<string | null>;
  queryParams$: Observable<any>;
  @Input() movieId!: number;
  @Input() movieTitle!: string;
  @Input() moviePosterPath!: string;
  @Input() movieGenres!: string[];
  @Input() movieReleaseYear!: string;

  isMenuOpen = false;
  filter: string | null = null;
  sort: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.movieId$ = this.route.paramMap.pipe(
      map(params => params.get('movieId'))
    );

    // Get the current search query parameters
    this.queryParams$ = this.route.queryParamMap.pipe(
      map(params => {
        const queryParams: any = {};
        const filter = params.get('filter');
        const sorting = params.get('sorting');

        if (filter) queryParams.filter = filter;
        if (sorting) queryParams.sorting = sorting;

        return queryParams;
      })
    );

  }

  private queryParamsSubscription!: Subscription;

  setErrorImage(event: Event) {
    this.movieService.getErrorImage(event);
  }

  getLink(genre: string, sorting?: string): Observable<{path: string[], queryParams: any}> {
    return this.movieId$.pipe(
      map(movieId => {
        const path = movieId ? ['/movie', movieId] : ['/search'];

        return this.queryParams$.pipe(
          map(existingParams => {
            const queryParams = {...existingParams, filter: this.encodeGenre(genre)};
            if (sorting) queryParams.sorting = sorting;
            return { path, queryParams };
          })
        );
      }),
      switchMap(val => val)
    );
  }

  encodeGenre(genre: string): string {
    return genre.toLowerCase().replace(/ /g, '+');
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
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

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
