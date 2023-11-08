import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() options: string[] = [];
  @Input() selectedOptions: string[] | null = [];
  @Input() isMultiSelect: boolean = false;
  @Input() placeholder: string = 'Select option';
  @Input() styleName?: string;
  @Input() styleId?: string;
  @Input() selected?: string;

  @Output() onChange = new EventEmitter<string[] | null>();
  @Output() valueChange = new EventEmitter<string>();

  public isOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onValueChange(newValue: string): void {
    this.valueChange.emit(newValue); // Emit the new value
  }

  toggling(): void {
    this.isOpen = !this.isOpen;
  }

  onOptionClicked(value: string): void {
    if (this.isMultiSelect) {
      const isSelected = this.selectedOptions?.includes(value);
      if (isSelected) {
        this.selectedOptions = this.selectedOptions?.filter(option => option !== value) || [];
      } else {
        this.selectedOptions = [...(this.selectedOptions || []), value];
      }
    } else {
      this.selectedOptions = [value];
      this.isOpen = false;
      //this.updateQueryParams(value);
    }
    this.onChange.emit(this.selectedOptions);
  }

  updateQueryParams(selectedSortOption?: string): void {
    const sortingValue = (selectedSortOption || 'title').toLowerCase();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sorting: sortingValue },
      queryParamsHandling: 'merge', // merge with existing query params
    }).then();
  }

  isSelected(option: string): boolean {
    return this.selectedOptions?.includes(option) || false;
  }

  getWrapperClasses() {
    const baseClasses: {[key: string]: boolean} = {
      'custom-select__wrapper': true,
      'custom-select--multiselect': this.isMultiSelect,
      'custom-select__wrapper--open': this.isOpen,
    };

    if (this.styleName) {
      baseClasses[this.styleName] = true;
    }

    return baseClasses;
  }
}
