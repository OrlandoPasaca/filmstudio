import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageActor'
})
export class ImageActorPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer)
  {

  }
  transform(value:any) {
    if(value)
    return this.sanitizer.bypassSecurityTrustStyle(`url(https://image.tmdb.org/t/p/w185${value})`);
    else
    return this.sanitizer.bypassSecurityTrustStyle(`url(../../../../assets/image/no-image.jpg)`);
  }

}
