import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo: Boolean = false;
  id: string;

  constructor(
              private _heroesService: HeroesService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe( parametros => {
      this.id = parametros['id'];
      if ( this.id !== 'nuevo') {
        this._heroesService.getHeroe( this.id ).subscribe( data => this.heroe = data );
      }
    });
  }

  guardar() {
    console.log(this.heroe);
    // tslint:disable-next-line:triple-equals
    if ( this.id == 'nuevo' ) {
      // insertando
      this._heroesService.nuevoHeroe( this.heroe )
        .subscribe( data => {
          this.router.navigate(['/heroe', data.name]);
        },
          error => console.log(error));
    } else {
      // actualizando
      this._heroesService.actualizarHeroe( this.heroe, this.id )
        .subscribe( data => {
          console.log(data);
        },
          error => console.log(error));
    }
  }

  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }

}
