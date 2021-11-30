import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let  mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let geo: any = this.activatedRoute.snapshot.paramMap.get('geo');

    geo = geo.substring(4);

    geo = geo.split(',');

    this.latitud = Number(geo[0]);
    this.longitud = Number(geo[1]);

    console.log('latitud: ' , this.latitud);
    console.log('longitud: ', this.longitud);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmZvYiIsImEiOiJja3drd3BxMGkxY3R1MnhwazkxbGo4M3ByIn0.i6fNPk6c7OKGinkeFp-3sw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6
    });


    map.on('load', () => {
      map.resize();

      //marker
      new mapboxgl.Marker({

      })
      .setLngLat([this.longitud, this.latitud])
      .addTo(map);

    });

  }

}
