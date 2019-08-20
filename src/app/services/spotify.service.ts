import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('spotify service listo')
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAC-4nI83jTlfA8IKbHaDW55tVEN7qSZ6gQpDmWe9_C2vCm0IDuXn0yCHhE97wQbQttgHdhdvcgTEvkgtU'
    })

    return this.http.get(url, {  headers });
  }

  getNewReleases() {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQA_TrPRR769NWrdIPr710Pihe9XOdGs7POFiIlPuflLRgO-0ihwgD7q9iXJkwdltVoqHk0q32V_vNXmigw'
    // })

    return this.getQuery('browse/new-releases')
    .pipe( map( data => data['albums'].items ) );

    // this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers } )
    //   .pipe( map( data => data['albums'].items ) )
  }

  getArtistas(termino: string) {



    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( data => data['artists'].items));
      
    // http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers } )
    //   .pipe( map( data => data['artists'].items))

  }

  getArtista(id: string) {

    return this.getQuery(`artists/${ id }`);
    // no hace el pipe map porque la informacion ya viene como la necesito
    // .pipe( map( data => data['artists'].items));
      

  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
          .pipe( map( data => data['tracks']));
           

  }

}
