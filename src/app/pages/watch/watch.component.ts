import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchServiceService } from './services/watch-service.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  error:boolean=false;
  id_tmdb:string;
  pelicula=[];
  titulo:string;
  name_cap:string;
  overview:string;
  temporada:string;
  capitulo:string="1";
  categoria:string;
  urls:string[];
  year;
  option_select=0;
  backdrop_path:string;
  view_seasons:boolean=false;
  view_episodes:boolean=false;
  disabled_next:boolean;
  disabled_after:boolean;
  isLoading:boolean;
  isLoadingEpisodes:boolean;
  temporad_temporal
  episodes_temporales;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private serviceWatch:WatchServiceService) 
  { 
    this.capturarParams();
  }

  capturarParams()
  {
    //capturar parametro de ruta :id
    this.route.paramMap.subscribe(params=>
      {
        this.option_select=0;
        this.id_tmdb=params.get("id");
      });

    //capturar parametros de consulta, si existieran
    this.route.queryParamMap.subscribe(params=>
      {
        this.isLoading=true;
        this.option_select=0;
        this.disabled_next=true;
        this.disabled_after=true;
        this.view_episodes=false;
        this.view_seasons=false;
        if(params.get("temporada"))
        {
          this.categoria="serie";
          this.temporada=params.get("temporada");
          if(params.get("capitulo"))
          this.capitulo=params.get("capitulo");
          else
          this.router.navigate([`watch/${this.id_tmdb}`],{queryParams:{temporada:this.temporada,capitulo:1}});
          this.buscarTemporada();
          this.buscarUrlsSerie();      
        }
        else
        {
          this.router.navigate([`watch/${this.id_tmdb}`]);
          this.categoria="pelicula";
          this.buscarUrlsMovie()
        }
      });

  }
  async buscarTemporada()
  {
    await this.serviceWatch.buscarTemporadas(this.id_tmdb).toPromise()
    .then((res:any)=>
      {
        this.backdrop_path=`url(https://image.tmdb.org/t/p/original/${res.backdrop_path})`;
        this.titulo=res.name;
        const seasons=res.seasons.map(res2=>({nombre:res.name,temporada:res2.season_number}));
        this.pelicula=seasons;
      },err=>this.noExist());

    await Promise.all(this.pelicula.map(async (res,i)=>
      {
        await this.serviceWatch.buscarCapitulos(this.id_tmdb,res.temporada).toPromise()
        .then((res2:any)=>
          {
            const episodes=res2.episodes.map(res3=>res3.episode_number);
            this.pelicula[i].capitulos=episodes;
                
          },err=>this.noExist())
      }));

     if(this.pelicula&&this.pelicula.length>0)
     {
     this.isDisabledNextEpisode();
     this.isDisableAfterEpisode();
     }
  }
  async buscarUrlsSerie()
  {
    await this.serviceWatch.buscarUrlsSerie(this.id_tmdb,this.temporada,this.capitulo).toPromise()
    .then((res:any)=>
      {
        if(!res.url)
        {
        this.error=true;
        return;
        }
        else
        this.urls=res.url;
      }).catch(res=>this.noExist());


    await this.serviceWatch.detailsCap(this.id_tmdb,this.temporada,this.capitulo).toPromise()
    .then((res:any)=>
      {
        const date=new Date(Date.parse(res.air_date));
        this.year=date.getFullYear()
        console.log(this.year)
        this.name_cap=res.name;
        this.overview=res.overview;
      }).catch(res=>this.noExist());
    
      this.isLoading=false;
  }
  async buscarUrlsMovie()
  {
    
    await this.serviceWatch.buscarUrlsPelicula(this.id_tmdb).toPromise()
    .then((res:any)=>
      {
        if(!res.id)
        this.error=true;
        else
        this.urls=res.url;

      },(err)=>this.noExist());
    
      await this.serviceWatch.detailsMovie(this.id_tmdb).toPromise()
    .then((res:any)=>
      {
        const date=new Date(Date.parse(res.release_date));
        this.year=date.getFullYear()
        this.titulo=res.title;
        this.overview=res.overview;
        this.backdrop_path=`url(https://image.tmdb.org/t/p/original/${res.backdrop_path})`;
      }).catch(res=>this.noExist());
    
    this.isLoading=false;

  }
  getdDetailsCap(temporada)
  {
    this.isLoadingEpisodes=true;
    this.view_episodes=true;
    this.temporad_temporal=temporada;
    this.serviceWatch.buscarCapitulos(this.id_tmdb,temporada)
    .subscribe((res:any)=>
    {
      this.episodes_temporales=res.episodes
      this.isLoadingEpisodes=false;
    },(err)=>this.noExist());
  }
 
  isUltimateEpisodeOfUltimateSeason()
  {
    const ultimate_seasons=this.pelicula[this.pelicula.length-1];
    const ultimate_episode=ultimate_seasons.capitulos[ultimate_seasons.capitulos.length-1];
    
    return this.temporada==ultimate_seasons.temporada&&this.capitulo==ultimate_episode?true:false;
  }
  isDisabledNextEpisode()
  {
    if(this.isUltimateEpisodeOfUltimateSeason())
    this.disabled_next=true;
    else
    this.disabled_next=false
  }
  
  isFirstEpisodeOfFirstSeason()
  {
    const first_season=this.pelicula[0].temporada;
    const first_episode=this.pelicula[0].capitulos[0];

    return this.temporada==first_season&&this.capitulo==first_episode?true:false;
  }
  isDisableAfterEpisode()
  {
    if(this.isFirstEpisodeOfFirstSeason())
    this.disabled_after=true;
    else
    this.disabled_after=false;
  }

  noExist()
  {
    this.error=true;
    this.isLoading=false;
    return;
  }
  nextEpisode()
  {
    let navigate_temp:any=this.pelicula.filter(res=>res.temporada==this.temporada);
    navigate_temp=navigate_temp[0];
    let navigate_capitulo=navigate_temp.capitulos.filter(res=>res==parseInt(this.capitulo)+1);
    if(navigate_capitulo.length>0)
    {
    navigate_capitulo=navigate_capitulo[0];
    this.router.navigate(["watch",this.id_tmdb],{queryParams:{temporada:navigate_temp.temporada,capitulo:navigate_capitulo}});
    }
    else
    this.router.navigate(["watch",this.id_tmdb],{queryParams:{temporada:navigate_temp.temporada+1,capitulo:1}});
    
  }
  afterEpisode()
  {
    let navigate_temp:any=this.pelicula.filter(res=>res.temporada==this.temporada);
    navigate_temp=navigate_temp[0];
    let navigate_capitulo=navigate_temp.capitulos.filter(res=>res==parseInt(this.capitulo)-1);
    if(navigate_capitulo.length>0)
    {
      navigate_capitulo=navigate_capitulo[0];
      this.router.navigate(["watch",this.id_tmdb],{queryParams:{temporada:navigate_temp.temporada,capitulo:navigate_capitulo}});
    }
    else
    {
      navigate_temp=this.pelicula.filter(res=>res.temporada==parseInt(this.temporada)-1);
      navigate_temp=navigate_temp[0];
      navigate_capitulo=navigate_temp.capitulos[navigate_temp.capitulos.length-1];
      this.router.navigate(["watch",this.id_tmdb],{queryParams:{temporada:navigate_temp.temporada,capitulo:navigate_capitulo}});
    }
  }
  ngOnInit(): void {
  }

}
