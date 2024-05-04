import { Component, EventEmitter, inject } from '@angular/core';
import { FertilizerService } from '../../services/fertilizer.service';
import { Fertilizer } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-fertilizer-list',
  templateUrl: './fertilizer-list.component.html',
  styleUrl: './fertilizer-list.component.css'
})
export class FertilizerListComponent {

  public fertilizerList: Fertilizer[] = []
  public actionsConfig: ActionConfig[] = [];

  public columns = [
    { key: 'name',         label: 'Nombre' },
    { key: 'brand',        label: 'Marca' },
    { key: 'pricePerGram', label: 'Precio por gramo' }
  ];
  public baseRoute = '/fertilizer';
  public listTitle = 'Fertilizantes';
  public paginator: any;


  private activatedRoute   = inject( ActivatedRoute );
  private router           = inject( Router );
  private fertilizerService = inject( FertilizerService );

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
    this.fertilizerService.getFertilizerPaginated(page, this.pageSize, token)
      .subscribe( response => {
        this.fertilizerList = response.content
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

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadItems(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onDelete(id: number):void {
    Swal.fire({
      title: 'Está seguro',
      text: `Desea eliminar el fertilizer con id: ${id}?`,
      icon: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if ( result.isConfirmed ) {
        let token = localStorage.getItem('access_token');
        this.fertilizerService.deleteFertilizerById(id, token).subscribe({
          next: () =>  {
            Swal.fire('Eliminado', `Fertilizante ${id} eliminado con éxito!`, 'success');
            this.fertilizerList = this.fertilizerList.filter(fertilizer => fertilizer.id != id);
          },
          error: () => Swal.fire('Error', `Fertilizante ${id} no pudo ser eliminado!`, 'error'),
        });
      }
    });
  }

  public onCreate(): void {
    this.router.navigateByUrl(`${this.baseRoute}/new`);
  }

}
