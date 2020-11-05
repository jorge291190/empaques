import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css']
})
export class LotesComponent implements OnInit {

 
  facturas: any = new Array();
  @ViewChild(MatTable,null) table: MatTable<any>;
  lectura: any;
  tiles: any[] = [
    {id: 1, text: 'One', cols: 3, rows: 6, color: ''},
    {id: 2, text: 'Two', cols: 1, rows: 6, color: ''}
  ];
  displayedColumns: string[] = ['folio', 'fecha', 'razon', 'uuid', 'contrato', 'pdf', 'xml', 'ver'];
  dataSource;
  constructor(private router: Router,
              private http: HttpClient) {

              }
  ngOnInit() {
    Swal.fire({
      title: 'Cargando Facturas',
      icon: 'info'
    });
    Swal.showLoading();
    this.lectura = JSON.parse(localStorage.getItem('credencial'));
    const credencial = {rfc: this.lectura.rfc};
    this.http.post('https://tciconsultoria.com/portalarrenda/facturas.php', JSON.stringify(credencial)).subscribe(
      (data: any) => {
        
        data.data.forEach(element => {

          this.facturas.push(element);
        });

        this.dataSource = new MatTableDataSource(this.facturas);

        Swal.close();
        
        });
      }

  navegar(codigo, ruta) {
    localStorage.setItem('factura', JSON.stringify(codigo));

  
    this.router.navigateByUrl(ruta);
      
  }

  internet(url: string) {

    window.open(url);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
