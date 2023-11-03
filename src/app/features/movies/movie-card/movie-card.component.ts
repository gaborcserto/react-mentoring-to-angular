import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input() movieId!: number;
  @Input() movieTitle!: string;
  @Input() moviePosterPath!: string;
  @Input() movieGenres!: string;
  @Input() movieReleaseYear!: string;

  isMenuOpen = false;
  filter: string | null = null;
  sort: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private queryParamsSubscription!: Subscription;

  setErrorImage(event: Event) {
    const element = event.target as HTMLImageElement; // Cast to the correct type
    if (element) {
      element.src = '/assets/img/noimage.png';
    }
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.filter = params['filter'];
      this.sort = params['sorting'];
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // this.store.dispatch({ type: '[Modal] Set Movie', payload: this.movie });
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openModal(type: string): void {
    // this.store.dispatch({ type: '[Modal] Set Open', payload: true });
    // this.store.dispatch({ type: '[Modal] Set Type', payload: type });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
