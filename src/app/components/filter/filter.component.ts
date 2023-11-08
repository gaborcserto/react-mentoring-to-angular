import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sortOptions, genresFilter } from '../../../data';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  selectedOption = new FormControl('title');
  @Input() sortOptions = sortOptions;
  @Input() genresFilter = genresFilter;
  @Input() filter: string | null = null;
  @Input() sort: string | null = null;
  @Input() movieId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] || null;
      this.sort = params['sorting'] || null;
      this.selectedOption.setValue(this.getReplace(this.sort || 'title'), { emitEvent: false });
    });

    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('movieId') ? parseInt(<string>params.get('movieId'), 10) : null;
    });

    this.selectedOption.valueChanges.subscribe(value => {
      if (value !== null) {
        this.handleSelectChange(value);
      }
    });
  }

  /*onValueChange(newValue: string): void {
    this.change.emit(newValue);// Emit the new value
  }*/

  getReplace(text: string): string {
    return text.replace(/_/g, ' ');
  }

  getRouterLink(genre: string): any[] {
    return this.movieId ? ['/movie', this.movieId] : ['/search'];
  }

  handleSelectChange(selectedValue: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sorting: selectedValue, filter: this.filter },
      queryParamsHandling: 'merge',
    }).then();
  }

  get selected() {
    return this.selectedOption.value;
  }

  /*set selected(val: string | null) {
    if (val !== null) {
      this.selectedOption.setValue(val);
    }
  }*/
}
