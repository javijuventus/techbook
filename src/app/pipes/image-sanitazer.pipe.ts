import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitazer'
})
export class ImageSanitazerPipe implements PipeTransform {

  constructor( private domSanitazer: DomSanitizer ) {}

  transform(img: any): any {
    return this.domSanitazer.bypassSecurityTrustUrl( img );
  }

}
