import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  handleFormSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchQuery) {
      this.router.navigate(['/search'], {queryParams: {search: this.searchQuery}}).then();
     }
  }
}
