import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient) { } 


  getFeature ()  {
   return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2020-07-01&primary_release_date.lte=2020-07-31&api_key=e01916badbd8b701542933b3e70fea3d&language=es&include_image_language=es`);      
  }




}
