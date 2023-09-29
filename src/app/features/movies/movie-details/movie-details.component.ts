import {Component, OnInit, Input, inject} from '@angular/core';
import { catchError} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'
import { of } from "rxjs";
import { Movie } from '../../../services/movie/movie.interface';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  error: string | null = null;

  constructor(private movieService: MovieService) {
  }
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('movieId'));
    if (id) {
      console.log(id);
    }

    this.movieService.getMovie(id)
      .pipe(
        catchError(() => {
          this.error = 'Error fetching movies';
          return of({});
        })
      )
      .subscribe(
        movieData => {
        }
      );
  }
}
