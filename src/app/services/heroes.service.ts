import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interface/heroe.interface';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesURL = 'https://heroesapp-1972.firebaseio.com/heroes.json';
  heroeURL = 'https://heroesapp-1972.firebaseio.com/heroes/';

  constructor(private http: Http) { }

  nuevoHeroe( heroe: Heroe ) {
    const body = JSON.stringify( heroe );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.heroesURL, body, { headers} )
      .map( res => {
        console.log(res.json());
        return res.json();
      });
  }
  actualizarHeroe( heroe: Heroe, key$: string ) {
    const body = JSON.stringify( heroe );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.put( url, body, { headers} )
      .map( res => {
        console.log(res.json());
        return res.json();
      });
  }

  getHeroe( key$: string ) {
    const url = `${ this.heroeURL }/${ key$ }.json`;
    return this.http.get( url ).map( res => res.json() );
  }

  getHeroes( ) {
    return this.http.get( this.heroesURL ).map( res => res.json() );
  }

  borrarHeroe( key$: string ) {
    const url = `${ this.heroeURL }/${ key$ }.json`;
    return this.http.delete( url )
      .map( res => res.json());
  }
}
