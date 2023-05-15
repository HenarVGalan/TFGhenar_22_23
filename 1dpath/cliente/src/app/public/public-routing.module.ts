import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { CrearRutaComponent } from './auth/login/containers/crear-ruta/crear-ruta.component';
import { MapNodosComponent } from '../core/shared/componentes/map-nodos/map-nodos.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      {
        path: '',
        redirectTo: 'crearRuta',
        pathMatch: 'full'
      },
      {
        path: 'crearRuta',
        component: CrearRutaComponent
      },
      {
        path: 'mapaNodos',
        component: MapNodosComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }