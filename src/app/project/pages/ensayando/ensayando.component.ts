import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-ensayando',
  templateUrl: './ensayando.component.html',
  styleUrl: './ensayando.component.css'
})
export class EnsayandoComponent {

  public url?: string;
  private projectService = inject( ProjectService );

  public upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('access_token');
      this.projectService.uploadFile(formData, token)
      .subscribe(response => {
        console.log('response', response);
        this.url = response.url;
      });
    }
  }

}
