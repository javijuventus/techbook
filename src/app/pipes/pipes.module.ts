import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitazer.pipe';
import { ImageSanitazerPipe } from './image-sanitazer.pipe';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, ImageSanitazerPipe, ImagenPipe],
  exports: [ DomSanitizerPipe, ImageSanitazerPipe, ImagenPipe ]
})
export class PipesModule { }
