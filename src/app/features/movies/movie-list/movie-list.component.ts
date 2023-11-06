import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie, Movies, URLParams} from '../../../services/movie/movie.interface';
import {MovieService} from '../../../services/movie/movie.service';
import {catchError} from 'rxjs/operators';
import {map, Observable, of} from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  moviesData$: Observable<{ movies: Movie[], amount: number }> | undefined;
  amount: number = 0;
  error: string | null = null;
  sort: string = 'title';
  filter: string | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      const urlParams: any = {};

      if (params['search']) {
        urlParams.search = params['search'];
      }

      if (params['sortBy'] && params['sortBy'] !== 'title') {
        urlParams.sort = params['sortBy'];
      }

      if (params['filter']) {
        const genresArray = params['filter'].split(',');
        if (genresArray.length > 0) {
          urlParams.genres = genresArray;
          this.filter = params['filter'];
        } else {
          this.filter = null;
        }
      }

      this.getList(urlParams);
    });
  }

  getList(urlParams?: URLParams) {
    this.moviesData$ = this.movieService.getMovies(urlParams).pipe(
      catchError(error => {
        this.error = 'Error fetching movies';
        return of({
          data: [],
          totalAmount: 0,
          offset: 0,
          limit: 0
        });
      }),
      map((response:Movies) => ({
        movies: response.data,
        amount: response.totalAmount
      }))
    );
  }
}
