import { Component, inject } from '@angular/core';
import { FertilizerService } from '../../services/fertilizer.service';
import { Fertilizer } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fertilizer-list',
  templateUrl: './fertilizer-list.component.html',
  styleUrl: './fertilizer-list.component.css'
})
export class FertilizerListComponent {


  public fertilizerList     : Fertilizer[] = []
  //public fertilizerSelected?: Fertilizer;
  public paginador: any;
  public pageSize = 10;
  public pageSizes = [5, 10, 15];
  public baseRoute = '/fertilizer';
  public columns = [
    { key: 'name',         label: 'Nombre' },
    { key: 'brand',        label: 'Marca' },
    { key: 'pricePerGram', label: 'Precio por gramo' }
  ];
  private fertilizerService = inject( FertilizerService );
  private activatedRoute    = inject( ActivatedRoute );
  private router            = inject( Router );

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page')! || 0;
      this.loadFertilizers(page);
    });
  }

  loadFertilizers(page: number): void {
    var token = localStorage.getItem('access_token')
    this.fertilizerService.getFertilizerPaginated(page, this.pageSize, token)
      .subscribe( response => {
        this.fertilizerList = response.content
        this.paginador = {
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

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadFertilizers(0);
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

}
