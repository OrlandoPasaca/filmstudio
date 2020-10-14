import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinopsisgeneral',
  pure: false
})
export class SinopsisgeneralPipe implements PipeTransform {

  transform(value: string="",limite:number): unknown {
    let nuevotexto:String;
    if(value.length>limite)
    {
      nuevotexto=value.substring(0,limite)+"...";
    }
    else
    {
      nuevotexto=value;
    }
    return nuevotexto;
  }

}
