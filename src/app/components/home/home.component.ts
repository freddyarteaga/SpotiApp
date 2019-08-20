import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];

  loading: boolean;

  error: boolean = false;

  mensajeError: String;

  // paises: any[] = [];

  constructor( private spotify: SpotifyService ) { 

    this.loading = true;
    this.spotify.getNewReleases()
    .subscribe( (data:any) => {
      console.log(data)

      this.loading=false;

      this.nuevasCanciones = data
    }, ( errorService ) => {

      this.loading=false;
      this.error = true;
      this.mensajeError = errorService.error.error.message;

    } );

    // console.log('constructor del home hecho');
    // // peticion get
    // this.http.get('https://restcountries.eu/rest/v2/lang/es')
    //   .subscribe( (resp: any) => {
    //     this.paises = resp;
    //     console.log(resp)
    //   } );

  }


}
