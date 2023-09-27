import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-image-with-fallback',
  templateUrl: './image-with-fallback.component.html',
  styleUrls: ['./image-with-fallback.component.scss'],
})
export class ImageWithFallbackComponent implements OnChanges {

  @Input() public src!: string;
  @Input() public alt!: string;
  @Input() public placeholder: string = '../../../../assets/img/noimage.png';

  public cached = false;
  public loaded = false;
  public error = false;

  private lastSrc: string = '';

  constructor() { }

  public ngOnChanges() {
    if (this.src !== this.lastSrc) {
      this.lastSrc = this.src;
      this.loaded = false;
      this.error = false;
      this.cached = this.isCached(this.src);
    }

    if (!this.src) {
      this.error = true;
    }
  }

  public onLoad() {
    this.loaded = true;
  }

  public onError() {
    this.error = true;
  }

  private isCached(url: string): boolean {
    if (!url) {
      return false;
    }

    let image = new Image();
    image.src = url;
    return image.complete;
  }
}













