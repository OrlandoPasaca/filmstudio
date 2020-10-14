import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {debounceTime} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  constructor(private http:HttpClient) { }

  buscar(dato:string)
  {
    return this.http.get(`https://www.hiddensoft.net/api_filmstudioSPA/nav/?dato=${dato}`)
  }
}
