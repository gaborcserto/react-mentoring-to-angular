import {Component, OnInit} from '@angular/core';
import {Movie} from "../../../services/movie/movie.interface";
import {MovieService} from "../../../services/movie/movie.service";
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  amount: number = 0;
  error: string | null = null;
  sort: string = 'title';

  constructor(private movieService: MovieService) {
  }

  getGenreLinks(genres: string[]): string {
    return genres.map(genre => `<a [routerLink]="[]" [queryParams]="?filter=${genre.toLowerCase().replace(/ /g, '+')}&sorting=${this.sort}">${genre}</a>`).join(', ');
  }

  get moviesData() {
    return this.movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      genreLinks: this.getGenreLinks(movie.genres),
      releaseYear: movie.release_date.substring(0, 4)
    }));
  }

  ngOnInit(): void {
    this.movieService.getMovies()
      .pipe(
        catchError(() => {
          this.error = 'Error fetching movies';
          return of({data: [], totalAmount: 0, offset: 0, limit: 0});
        })
      )
      .subscribe(
        movies => {
          this.movies = movies.data;
          this.amount = movies.totalAmount;
        }
      );
  }
}
