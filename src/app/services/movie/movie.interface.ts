import { HttpParams } from "@angular/common/http";

export interface URLParams extends HttpParams {
  search?: string;
  sort?: string;
  genres?: string[];
}

export interface Movie {
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: string[];
  id: number;
}

export interface Movies {
  totalAmount: number;
  data: Movie[];
  offset: number;
  limit: number;
}
