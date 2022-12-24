import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  {path: '', redirectTo: 'listadoMascotas', pathMatch: 'full'},
  {path: 'listadoMascotas', component: ListadoMascotaComponent},
  {path: 'agregar', component: AgregarEditarMascotaComponent},
  {path: 'verMascota/:id', component: VerMascotaComponent},
  {path: 'editar/:id', component: AgregarEditarMascotaComponent},
  {path: '**', redirectTo: 'listadoMascotas', pathMatch: 'full'},
  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
