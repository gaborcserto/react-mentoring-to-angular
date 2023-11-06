import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';

import { PageSearchComponent } from './pages/page-search/page-search.component';
import { PageMovieComponent } from './pages/page-movie/page-movie.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './features/movies/movie-list/movie-list.component';
import { MovieCardComponent } from './features/movies/movie-card/movie-card.component';
import { NgOptimizedImage } from "@angular/common";
import { MovieDetailsComponent } from './features/movies/movie-details/movie-details.component';
import { FilterComponent } from './components/filter/filter.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PageSearchComponent,
    PageSearchComponent,
    PageMovieComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MovieListComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    MovieCardComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
