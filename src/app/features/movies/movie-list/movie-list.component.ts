import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, Movies } from '../../../services/movie/movie.interface';
import { MovieService } from '../../../services/movie/movie.service';
import { catchError } from 'rxjs/operators';
import { of, Observable, map } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  movieData$: Observable<{ movies: Movie[], amount: number }> | undefined;
  amount: number = 0;
  error: string | null = null;
  sort: string = 'title';

  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {
    this.getList();
  }

  getGenreLinks(genres: string[]): string {
    return genres.map(genre => `<a [routerLink]="[]" [queryParams]="?filter=${genre.toLowerCase().replace(/ /g, '+')}&sorting=${this.sort}">${genre}</a>`).join(', ');
  }

  getList() {
    this.movieData$ = this.movieService.getMovies().pipe(
      catchError(error => {
        this.error = 'Error fetching movies';
        return of({
          data: [],
          totalAmount: 0,
          offset: 0,
          limit: 0 // Assuming these are the default values for offset and limit
        });
      }),
      map((response:Movies) => ({
        movies: response.data,
        amount: response.totalAmount
      }))
    );
  }
}
