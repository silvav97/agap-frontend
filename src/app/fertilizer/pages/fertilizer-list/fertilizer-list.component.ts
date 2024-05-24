import { Component, EventEmitter, inject } from '@angular/core';
import { FertilizerService } from '../../services/fertilizer.service';
import { Fertilizer } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { PageStateService } from '../../../shared/services/page-state.service';

@Component({
  selector: 'app-fertilizer-list',
  templateUrl: './fertilizer-list.component.html',
  styleUrl: './fertilizer-list.component.css'
})
export class FertilizerListComponent {

  private fertilizerService = inject( FertilizerService );
  private pageStateService  = inject ( PageStateService );
  private activatedRoute    = inject( ActivatedRoute );
  private router            = inject( Router );
  public baseRoute          = '/fertilizer';
  public listTitle          = 'Fertilizantes';
  public fertilizerList: Fertilizer[] = [];
  public paginator!:     Pagination<Fertilizer>;
  public actionsConfig:  ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];

  public columns = [
    { key: 'name',         label: 'Nombre' },
    { key: 'brand',        label: 'Marca' },
    { key: 'pricePerGram', label: 'Precio por gramo' }
  ];

  ngOnInit(): void {
    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

        this.setupActions();
        this.activatedRoute.paramMap.subscribe(params => {
          let page = +params.get('page')! || 0;
          this.loadFertilizers(page);
        });
      });
  }

  loadFertilizers(page: number): void {
    var token = localStorage.getItem('access_token')
    this.fertilizerService.getFertilizerPaginated(page, this.pageSize!, token)
      .subscribe( response => {
        this.fertilizerList = response.content
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
        label: 'Agregar ' + this.listTitle,
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

  onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadFertilizers(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onCreate(): void {
    this.router.navigateByUrl(`${this.baseRoute}/new`);
  }

  public onDelete(id: number): void {
    let token = localStorage.getItem('access_token');
    this.fertilizerService.getRelatedCropTypes(id, token).subscribe({
      next: (relatedCropTypes) => {

        let warningMessage = relatedCropTypes.length > 0
        ? `Desea eliminar el Fertilizante? Está relacionado a ${relatedCropTypes.length} tipo${relatedCropTypes.length > 1 ? 's' : ''} de cultivo.
        ${relatedCropTypes.length > 1 ? 'Estos' : 'Este'} quedará${relatedCropTypes.length > 1 ? 'n' : ''} sin fertilizante asociado.`
        : `Desea eliminar el Fertilizante?`;

        this.showDeletionDialog(id, warningMessage);
      },
      error: (error) => {
        console.error('Error al obtener tipos de cultivo relacionados:', error);
        Swal.fire('Error', 'Error obteniendo tipos de cultivo relacionados al Fertilizante', 'error');
      }
    });
  }

  private showDeletionDialog(id: number, message: string): void {
    Swal.fire({
      title: '¿Está seguro?',
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
    this.fertilizerService.deleteFertilizerById(id, token).subscribe({
      next: () => {
        Swal.fire('Eliminado', `Fertilizante ${id} eliminado con éxito!`, 'success');
        this.fertilizerList = this.fertilizerList.filter(fertilizer => fertilizer.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el Fertilizante:', error);
        Swal.fire('Error', `Fertilizante ${id} no pudo ser eliminado!`, 'error');
      }
    });
  }

}
