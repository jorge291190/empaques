import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './componentes/menu/menu.component';
import { EtiquetadorComponent } from './componentes/etiquetador/etiquetador.component';
import { LotesComponent } from './componentes/lotes/lotes.component';


const routes: Routes = [
{ path: "etiquetador",component: EtiquetadorComponent},
{ path: "menu",       component: MenuComponent},
{path: "lotes", component: LotesComponent},
{ path: "**", pathMatch:'full',redirectTo:'menu'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
