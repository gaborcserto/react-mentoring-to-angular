import { Component, inject, OnDestroy } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'
import { Observable, of, Subscription } from "rxjs";
import { Movie } from '../../../services/movie/movie.interface';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnDestroy{
  private subscription = new Subscription();
  movieData$: Observable<Movie> | undefined;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
  ) {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.getDetails(params['movieId']);
      })
    );
  }

  setErrorImage(event: Event) {
    this.movieService.getErrorImage(event);
  }

  getDetails(movieId: string) {
    this.movieData$ = this.movieService.getMovie(movieId).pipe(
      catchError(error => {
        this.error = 'Movies not found';
        return of({
            title: '',
            tagline: '',
            vote_average: 0,
            vote_count: 0,
            release_date: '',
            poster_path: '',
            overview: '',
            budget: 0,
            revenue: 0,
            runtime: 0,
            genres: [],
            id: 0,
          }
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
