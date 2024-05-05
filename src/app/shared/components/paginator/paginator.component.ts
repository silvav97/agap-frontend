import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pagination } from '../../interfaces/pagination.interface';

@Component({
  selector: 'shared-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  public paginador!: Pagination<any>;
  @Input()
  public pageRoute?: string = ''; // Ruta base para construir los enlaces

  paginas?: number[];
  desde?: number;
  hasta?: number;

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginador'].currentValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    if (!this.paginador) {  //|| !this.paginador.number || !this.paginador.totalPages) {
      return; // Agrega esta línea para asegurarte de que paginador y sus propiedades requeridas están definidas
    }

    this.desde = Math.min( Math.max(1, this.paginador.number-4), this.paginador.totalPages-5 );
    this.hasta = Math.max( Math.min(this.paginador.totalPages, this.paginador.number+4), 6 );

    if (this.paginador.totalPages>5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde!);

    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }

}
