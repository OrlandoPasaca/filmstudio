import { Component, OnInit,DoCheck ,HostListener, ViewChild, ElementRef } from '@angular/core';
import { BuscarService } from './services/buscar.service';
import {debounceTime,distinctUntilChanged} from 'rxjs/operators';
import { NgModel, FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/servicios/navbar.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {

  forma:FormGroup;
  peliculas;
  nav:ElementRef;
  readonly searchNav={isVisible:false}
  constructor(private service:BuscarService,private fb:FormBuilder,public navService:NavbarService,private route:ActivatedRoute) 
  {
    this.crearForm();
    this.onValueChanges();
  }
  @ViewChild('nav',{static:false}) set navBar(v:ElementRef)
  {
    if(v)
    {
      this.nav=v;
      this.navService.addHeight=v.nativeElement.offsetHeight;
    }
  }
  @ViewChild('search') input_search:ElementRef<HTMLInputElement>;
  @HostListener('click',['$event']) 
  onClickInputSearch(event)
  {
    if(event.target==this.input_search.nativeElement)
    {
      this.searchNav.isVisible=true;
      event.stopPropagation();
    }
  }
  @HostListener('body:click',['$event']) 
  onClickBody(event)
  {
    this.searchNav.isVisible=false;
  }
  ngOnInit(): void {
  }
  ngDoCheck():void
  {
    if(this.nav)
    this.navService.addHeight=this.nav.nativeElement.offsetHeight;
  }
  crearForm()
  {
    this.forma=this.fb.group(
      {
        buscar:["",Validators.required]
      }
    )
  }
  onValueChanges()
  {
    this.forma.get("buscar").valueChanges
    .pipe(debounceTime(800),distinctUntilChanged())
    .subscribe(res=>this.buscar(res));
  }
  buscar(dato)
  {
    if(this.forma.get("buscar").valid)
    this.service.buscar(dato).subscribe((res:any)=>
      {
        this.peliculas=res
      });
    else
    this.peliculas=[]
  }

  

}
