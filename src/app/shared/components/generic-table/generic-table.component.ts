import { Component, Input, inject } from '@angular/core';
import { Fertilizer } from '../../../fertilizer/interfaces';
import { FertilizerService } from '../../../fertilizer/services/fertilizer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {

  @Input()
  public fertilizers: Fertilizer[] = [];

  private fertilizerService = inject( FertilizerService );


  public delete(id: number):void {
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
            this.fertilizers = this.fertilizers.filter(fertilizer => fertilizer.id != id);
          },
          error: () => Swal.fire('Error', `Fertilizante ${id} no pudo ser eliminado!`, 'error'),
        });
      }
    });

  }

}
