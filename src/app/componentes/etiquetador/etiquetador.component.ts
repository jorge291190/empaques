import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ElementRef, ViewChild
} from '@angular/core';
import { VERSION, MatTable } from '@angular/material';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  id: number;
}
export interface PeriodicElement {
  id: string;
  hue: string;
  huerta: string;
  cajas: number;
  status: string;
  peso: number;
  idtrans:string;
}

export interface Lotes {
  no: string;
  hue: string;
  huerta: string;
}

@Component({
  selector: 'app-etiquetador',
  templateUrl: './etiquetador.component.html',
  styleUrls: ['./etiquetador.component.css']
})
export class EtiquetadorComponent implements OnInit {
  showFiller = false;
  calibreSeleccionado ="";
  myControl = new FormControl();
  options:Lotes[] = [
    {no: '123',hue:'HUE389042222',huerta:'La Joya'},
    {no: '124',hue:'HUE389041111',huerta:'La jornada'},
    {no: '125',hue:'HUE389043343',huerta:'La mamalona'}
];

  calibres = ["32","36","40","48","60","70","80","84"];
 ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', 
  hue: 'HUE8976538', 
  huerta: 'La Joya', 
  cajas: 10 , 
  status:'Armado',
  peso:0,
  idtrans:'123456789'},
];

  tiles: Tile[] = [
    {text: 'Formulario Alta Pallets', cols: 2, rows: 2, color: '#E2E2E2', id: 1},
    {text: 'Tabla Paletizado', cols: 4, rows: 6, color: 'darkgreen', id: 2 },
    {text: 'Etiqueta', cols: 1, rows: 2, color: 'white' , id: 3},
    {text: 'QR', cols: 1, rows: 2, color: 'white' , id: 4},
    {text: 'Botonera', cols: 2, rows: 1, color: 'ligthgrey' , id: 5},
    {text: 'Menu Principal', cols: 2, rows: 1, color: 'lightgreen' , id: 6}
   
  ];

  displayedColumns: string[] = ['No. Lote','Id Etiqueta', 'HUE','Huerta', 'Cajas', 'Status','Peso','Imprimir','Eliminar','Seleccionar'];
  dataSource = this.ELEMENT_DATA;
  stateCtrl = new FormControl();
  inputCajas = new FormControl();
  filteredStates: Observable<Lotes[]>;

  states: Lotes[] = [
    {
      no: '5655',
      hue: 'HUE9090987',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      huerta: 'https://www.muyinteresante.com.mx/wp-content/uploads/2018/05/httpstved-prod.adobecqms.netcontentdameditorialTelevisamexicomuyinteresantemxpreguntas-y-respuestas1403beneficios-del-aguacate-1080x986.imgo_.jpg'
    },
    {
      no: '5787',
      hue: 'HUE909098',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      huerta: 'https://www.muyinteresante.com.mx/wp-content/uploads/2018/05/httpstved-prod.adobecqms.netcontentdameditorialTelevisamexicomuyinteresantemxpreguntas-y-respuestas1403beneficios-del-aguacate-1080x986.imgo_.jpg'
    },
    {
      no: '8987',
      hue: 'HUE98098098',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      huerta: 'https://www.muyinteresante.com.mx/wp-content/uploads/2018/05/httpstved-prod.adobecqms.netcontentdameditorialTelevisamexicomuyinteresantemxpreguntas-y-respuestas1403beneficios-del-aguacate-1080x986.imgo_.jpg'
    },
    {
      no: '8876',
      hue: 'HUE890980',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      huerta: 'https://www.muyinteresante.com.mx/wp-content/uploads/2018/05/httpstved-prod.adobecqms.netcontentdameditorialTelevisamexicomuyinteresantemxpreguntas-y-respuestas1403beneficios-del-aguacate-1080x986.imgo_.jpg'
    }
  ];
  @ViewChild(MatTable,null) table: MatTable<any>;
  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): Lotes[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.no.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }
  
  eliminar(dato: string){

    alert(dato);
  }

  imprimir(dato: string){
      alert(dato);
  }

  qrdata: string = "Inicial";
  elemento:any = {id: "Seleccionar Proceso"};
  seleccionar(dato: string){
    const etiqueta = this.dataSource.filter(valor => valor.idtrans === dato);
    this.elemento = etiqueta[0];
    console.log(JSON.stringify(this.elemento.id));
    
    this.qrdata = JSON.stringify(etiqueta[0]);
  }

  temp: any;
  cantidad: number;
  seleccionarLote(){

   let dato:string = this.stateCtrl.value;
    this.temp = this.states.filter(valor => valor.no === dato);
  }

  agregar(){
      if(!this.temp){
        alert('No has seleccionado Lote');
      }
      let ahora = new Date();
      let milisegundos = ahora.getMilliseconds().toString();
      var today = new Date();
var date = today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDate().toString();
var time = today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
var id = date+time+milisegundos;
      let opt: PeriodicElement = {
       id: this.temp[0].no,
       hue: this.temp[0].hue,
       huerta: 'Prueba',
       cajas: this.inputCajas.value,
       peso: 0,
       status: 'Armando',
       idtrans: id
     };
     
      this.dataSource.push(opt);
      this.table.renderRows();
      this.stateCtrl.reset();
      this.inputCajas.reset();
  }

}
