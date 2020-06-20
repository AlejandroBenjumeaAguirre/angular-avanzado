import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PipePipe } from './pipe.pipe';





@NgModule({
  declarations: [ImagenPipe, PipePipe],
  exports: [
    PipePipe,
    ImagenPipe
  ],
  imports: [
  ]
})
export class PipesModule { }
