import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movies, Movie, URLParams} from "./movie.interface";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMovies(urlParams?: URLParams): Observable<Movies> {
    let params: URLParams = new HttpParams().set('searchBy', 'title').set('sortOrder', 'asc');

    if (urlParams) {
      params = params
        .set('search', urlParams.search ?? '')
        .set('sortBy', urlParams.sort ?? '')
        .set('filter', urlParams.genres ? JSON.stringify(urlParams.genres) : '');
    }

    return this.http.get<Movies>(`${this.apiUrl}/movies`, { params });
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
