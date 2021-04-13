import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild( IonList ) lista:IonList;

  constructor( public deseosService:DeseosService ,
               private router:Router,
               private alertController: AlertController) { 
                 this.deseosService.cargarStorage();
               }

  
  async agregarLista(){
    
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name:'titulo',
          type:'text',
          placeholder:'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text:'Crear',
          handler: ( data ) => {
            if ( data.titulo.length === 0) {
              return;
            }

            // Crear la lista
            const listaId = this.deseosService.crearLista(data.titulo);

            // this.router.navigateByUrl('/tabs/tab1/agregar');
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

  
  

}
