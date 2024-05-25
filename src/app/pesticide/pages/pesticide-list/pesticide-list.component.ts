import { Component, EventEmitter, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PesticideService } from '../../services/pesticide.service';
import Swal from 'sweetalert2';
import { Pesticide } from '../../interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { PageStateService } from '../../../shared/services/page-state.service';

@Component({
  selector: 'app-pesticide-list',
  templateUrl: './pesticide-list.component.html',
  styleUrl: './pesticide-list.component.css'
})
export class PesticideListComponent {

  private pesticideService = inject( PesticideService );
  private pageStateService = inject ( PageStateService );
  private activatedRoute   = inject( ActivatedRoute );
  private router           = inject( Router );
  public baseRoute         = '/pesticide';
  public listTitle         = 'Pesticidas';
  public pesticideList: Pesticide[] = [];
  public paginator!:    Pagination<Pesticide>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];

  public columns = [
    { key: 'name',         label: 'Nombre' },
    { key: 'brand',        label: 'Marca' },
    { key: 'pricePerGram', label: 'Precio/gr' }
  ];

  ngOnInit(): void {
    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

      this.setupActions();
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page')! || 0;
        this.loadPesticides(page);
      });
    });
  }

  loadPesticides(page: number): void {
    var token = localStorage.getItem('access_token')
    this.pesticideService.getPesticidePaginated(page, this.pageSize!, token)
      .subscribe( response => {
        this.pesticideList = response.content
        this.paginator = response;
      });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Editar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-info'
      },
      {
        label: 'Eliminar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },
      {
        label: 'Agregar',
        type: 'generalAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-add'
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onEdit(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.onDelete(id!));
    this.actionsConfig[2].emitEvent.subscribe(() => this.onCreate());

  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadPesticides(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onCreate(): void {
    this.router.navigateByUrl(`${this.baseRoute}/new`);
  }

  public onDelete(id: number): void {
    let token = localStorage.getItem('access_token');
    this.pesticideService.getRelatedCropTypes(id, token).subscribe({
      next: (relatedCropTypes) => {
        let warningMessage = relatedCropTypes.length > 0
        ? `Desea eliminar el Pesticida? Está relacionado a ${relatedCropTypes.length} tipo${relatedCropTypes.length > 1 ? 's' : ''} de cultivo.
        ${relatedCropTypes.length > 1 ? 'Estos' : 'Este'} quedará${relatedCropTypes.length > 1 ? 'n' : ''} sin pesticida asociado.`
        : `Desea eliminar el Pesticida?`;

        this.showDeletionDialog(id, warningMessage);
      },
      error: (error) => {
        console.error('Error al obtener tipos de cultivo relacionados:', error);
        Swal.fire('Error', 'Error obteniendo tipos de cultivo relacionados al Pesticida', 'error');
      }
    });
  }

  private showDeletionDialog(id: number, message: string): void {
    Swal.fire({
      title: 'Está seguro?',
      html: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePesticideById(id);
      }
    });
  }

  private deletePesticideById(id: number): void {
    let token = localStorage.getItem('access_token');
    this.pesticideService.deletePesticideById(id, token).subscribe({
      next: () => {
        Swal.fire('Eliminado', `Pesticida ${id} eliminado con éxito!`, 'success');
        this.pesticideList = this.pesticideList.filter(pesticide => pesticide.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el Pesticida:', error);
        Swal.fire('Error', `Pesticida ${id} no pudo ser eliminado!`, 'error');
      }
    });
  }

}
