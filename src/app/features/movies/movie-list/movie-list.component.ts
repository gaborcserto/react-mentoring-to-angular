import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  error: string | null = null;
  filter: string | null = null;

  constructor(private movieService: MovieService) {}

  movieList$ = this.movieService.movieList$;
}
