import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  botones: any  = [
    {texto: 'Impresion de Etiquetas',
      ruta: 'etiquetador'},
      {texto: 'Carga de Produccion',
      ruta: 'lotes'}
  ];
  
  tiles: any[] = [
    {id: 1, text: 'One', cols: 3, rows: 6, color: ''},
    {id: 2, text: 'Two', cols: 1, rows: 6, color: ''}
  ];
  constructor(private router:Router) { }

  ngOnInit() {
  }

  navegar(ruta: string){

      this.router.navigateByUrl(ruta);
  }

}
