import { Component, inject } from '@angular/core';
import { FertilizerService } from '../../services/fertilizer.service';
import { Fertilizer } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fertilizer-list',
  templateUrl: './fertilizer-list.component.html',
  styleUrl: './fertilizer-list.component.css'
})
export class FertilizerListComponent {

  private fertilizerService = inject(FertilizerService);
  private activatedRoute    = inject( ActivatedRoute );
  public fertilizerList     : Fertilizer[] = []
  public fertilizerSelected?: Fertilizer;
  public paginador: any;
  public pageSize = 10;
  public pageSizes = [5, 10, 15];


  constructor() {}

  ngOnInit(): void {
    var token = localStorage.getItem('access_token')

    this.activatedRoute.paramMap.subscribe( params =>  {
      let page: number = +params.get('page')!;
      page = isNaN(page) ? 0 : page;

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
    });
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.ngOnInit();  // Recargar la lista con el nuevo pageSize
  }

}
