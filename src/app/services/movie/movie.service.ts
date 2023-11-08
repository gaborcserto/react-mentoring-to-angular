import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movies, Movie, URLParams } from "./movie.interface";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = environment.apiUrl;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  public movieList$ = this.router.queryParams.pipe(
    map(
      params => {
        const urlParams: any = {};

        urlParams.searchBy = params['searchBy'] ?? 'title';
        urlParams.sortBy = params['sortBy'] ?? 'title'
        urlParams.sortOrder = params['sortOrder'] ?? 'asc'
        urlParams.search = params['search'] ?? '';
        urlParams.sort = params['sortBy'] ?? 'title';

        if (params['filter']) {
          const genresArray = params['filter'].split(',');
          if (genresArray.length > 0) {
            urlParams.filter = genresArray;
          }
          urlParams.filter = params['filter'];
        } else {
          urlParams.filter = '';
        }

        return urlParams;
      }
    ),
    switchMap(this.getMovies.bind(this)),
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


  getErrorImage(event: Event) {
    const element = event.target as HTMLImageElement;
    if (element) {
      element.src = '/assets/img/noimage.png';
    }
  }

  getMovies(urlParams: URLParams): Observable<Movies> {
    const params: URLParams = urlParams;
    console.log(params);
    return this.http.get<Movies>(`${this.apiUrl}/movies/`, { params });
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  createMovie(data: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, data);
  }

  updateMovie(data: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies`, data);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/movies/${id}`);
  }
}
