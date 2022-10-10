import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  
  // obtenemos la variable historial de búsqueda, usando el servicio
  get historial(){
    return this.gifsService.historial;
  }

  constructor( private gifsService:GifsService) {}

  public buscar( termino: string) {
    // console.log(termino);
    this.gifsService.buscarGifs(termino)
  }


}
