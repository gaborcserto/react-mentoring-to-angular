import { Component, Input, OnDestroy } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'
import { Observable, of, Subscription } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  error: string | null = null;
  //movieData$ = this.movieService.movieData$;
  movieData$ = this.route.paramMap.pipe(
    switchMap(params => {
      const movieId = params.get('movieId');
      return movieId ? this.movieService.getMovie(movieId) : of(null);
    }),
    catchError(error => {
      // handle error
      return of(null);
    })
  );

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
  ) {
  }

  setErrorImage(event: Event) {
    this.movieService.getErrorImage(event);
  }
}
