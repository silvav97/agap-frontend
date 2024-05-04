import { Component, EventEmitter, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PesticideService } from '../../services/pesticide.service';
import Swal from 'sweetalert2';
import { Pesticide } from '../../interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-pesticide-list',
  templateUrl: './pesticide-list.component.html',
  styleUrl: './pesticide-list.component.css'
})
export class PesticideListComponent {

  public pesticideList: Pesticide[] = [];
  public actionsConfig: ActionConfig[] = [];

  public columns = [
    { key: 'name',         label: 'Nombre' },
    { key: 'brand',        label: 'Marca' },
    { key: 'pricePerGram', label: 'Precio por gramo' }
  ];
  public baseRoute = '/pesticide';
  public listTitle = 'Pesticidas';
  public paginator: any;


  private activatedRoute   = inject( ActivatedRoute );
  private router           = inject( Router );
  private pesticideService = inject( PesticideService );

  public pageSize = 10;
  public pageSizes = [5, 10, 15];

  ngOnInit(): void {
    this.setupActions();
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page')! || 0;
      this.loadItems(page);
    });
  }

  loadItems(page: number): void {
    var token = localStorage.getItem('access_token')
    this.pesticideService.getPesticidePaginated(page, this.pageSize, token)
      .subscribe( response => {
        this.pesticideList = response.content
        this.paginator = {
                content: response.content,
                pageable: response.pageable,
                last: response.last,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                size: response.size,
                number: response.number,
                sort: response.sort,
                first: response.first,
                numberOfElements: response.numberOfElements,
                empty: response.empty
        };
      });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Editar',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>()
      },
      {
        label: 'Eliminar',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>()
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onEdit(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.onDelete(id!));
  }

  public onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadItems(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onDelete(id: number):void {
    Swal.fire({
      title: 'Está seguro',
      text: `Desea eliminar el pesticida con id: ${id}?`,
      icon: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if ( result.isConfirmed ) {
        let token = localStorage.getItem('access_token');
        this.pesticideService.deletePesticideById(id, token).subscribe({
          next: () =>  {
            Swal.fire('Eliminado', `Pesticida ${id} eliminado con éxito!`, 'success');
            this.pesticideList = this.pesticideList.filter(pesticide => pesticide.id != id);
          },
          error: () => Swal.fire('Error', `Pesticida ${id} no pudo ser eliminado!`, 'error'),
        });
      }
    });
  }

  public onCreate(): void {
    this.router.navigateByUrl(`${this.baseRoute}/new`);
  }

}
