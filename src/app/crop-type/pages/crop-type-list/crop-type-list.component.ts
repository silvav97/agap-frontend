import { Component, EventEmitter, inject } from '@angular/core';
import { CropType } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CropTypeService } from '../../services/crop-type.service';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';

@Component({
  selector: 'app-crop-type-list',
  templateUrl: './crop-type-list.component.html',
  styleUrl: './crop-type-list.component.css'
})
export class CropTypeListComponent {

  public cropTypeList: CropType[] = []
  public actionsConfig: ActionConfig[] = [];

  public columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'pesticide.name', label: 'Pesticida' },
    { key: 'fertilizer.name', label: 'Fertilizante' },
    { key: 'plantQuantityPerSquareMeter', label: '# de Plantas / m^2' },
    { key: 'harvestTime', label: 'Tiempo de Cosecha' },
    { key: 'weather', label: 'Tiempo de Cosecha' },

  ];


  public baseRoute = '/crop-type';
  public listTitle = 'Tipos de Cultivo';
  public paginator!: Pagination<CropType>;

  private cropTypeService = inject( CropTypeService );
  private activatedRoute  = inject( ActivatedRoute );
  private router          = inject( Router );
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
    this.cropTypeService.getCropTypePaginated(page, this.pageSize, token)
      .subscribe( response => {
        this.cropTypeList = response.content
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
        buttonClass: 'btn-primary'
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

  public onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadItems(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onDelete(id: number): void {
    let token = localStorage.getItem('access_token');
    this.cropTypeService.getRelatedProjects(id, token).subscribe({
      next: (relatedProjects) => {
        let projectNamesList = relatedProjects.map(project => `- ${project}`).join('<br>');
        let warningMessage = relatedProjects.length > 0
          ? `Desea eliminar el TipoDeCultivo con id: ${id}? Está asociado a los siguientes proyectos:<br>${projectNamesList}`
          : `Desea eliminar el TipoDeCultivo con id: ${id}?`;

        this.showDeletionDialog(id, warningMessage);
      },
      error: (error) => {
        console.error('Error al obtener proyectos relacionados:', error);
        Swal.fire('Error', 'Error obteniendo proyectos relacionados al Tipo de cultivo', 'error');
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
        this.deleteCropTypeById(id);
      }
    });
  }

  private deleteCropTypeById(id: number): void {
    let token = localStorage.getItem('access_token');
    this.cropTypeService.deleteCropTypeById(id, token).subscribe({
      next: () => {
        Swal.fire('Eliminado', `TipoDeCultivo ${id} eliminado con éxito!`, 'success');
        this.cropTypeList = this.cropTypeList.filter(cropType => cropType.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el TipoDeCultivo:', error);
        Swal.fire('Error', `TipoDeCultivo ${id} no pudo ser eliminado!`, 'error');
      }
    });
  }

  public onCreate(): void {
    this.router.navigateByUrl(`${this.baseRoute}/new`);
  }

}
