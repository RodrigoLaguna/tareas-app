import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  // Referencia a un componente
  @ViewChild( IonList ) lista: IonList;

  @Input() terminada:boolean = true;

  constructor(public deseosService:DeseosService,
              private router:Router,
              private alertController:AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }


  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
  }

  async editar(lista:Lista){
    const alertEdit = await this.alertController.create({
      header: 'Editar',
      inputs: [
        {
          name:'titulo',
          value: lista.titulo,
          type:'text',
          placeholder:'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler: () => {
            // Cerrar el sliding
            this.lista.closeSlidingItems();
          }
        },
        {
          text:'Guardar',
          handler: ( data ) => {
            if ( data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alertEdit.present();
  }



}
