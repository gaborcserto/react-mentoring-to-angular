import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageSearchComponent } from './pages/page-search/page-search.component';
import { PageMovieComponent } from './pages/page-movie/page-movie.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: PageSearchComponent },
  { path: 'search/:searchQuery', component: PageSearchComponent },
  { path: 'movie/:movieId', component: PageMovieComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
