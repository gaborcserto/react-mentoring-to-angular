import { Component } from '@angular/core';
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
  moviesData$: Observable<{ movies: Movie[], amount: number }> | undefined;
  amount: number = 0;
  error: string | null = null;
  sort: string = 'title';

  constructor(private movieService: MovieService) {
    this.getList();
  }

  getGenreLinks(genres: string[]): string {
    return this.movieService.getCreateGenreLinks(genres, this.sort);
  }

  getList() {
    this.moviesData$ = this.movieService.getMovies().pipe(
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
