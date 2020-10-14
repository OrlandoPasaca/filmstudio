import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  height:number;
  constructor() 
  {
  }
  set addHeight(v:number)
  {
    this.height=v;
  }

}
