import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { IndexDBService, Stuff } from '../services/index-db.service';

interface Data {
  info: any,
  results: any[]
}

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {



  handlerMessage = '';
  roleMessage = '';

  stuffs!: Stuff[];

  public page = 1;
  public resultsCount = 3;
  public totalPages = 1;

  public bulkEdit: boolean = false;

  public sortDirection: number = 0;

  constructor(private http: HttpClient, private alertController: AlertController,private indexDB: IndexDBService) { }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.indexDB.getStuffs().then(stuffs=>{
      this.stuffs = stuffs;
      console.log(stuffs);
    })
  }

  sortBy(key: any){
    console.log(key);
  }

  toggleBulkEdit(){
    this.bulkEdit = !this.bulkEdit;
  }

  bulkDelete(i: number){
  }

  async removeRow(index: number){
    const alert = await this.alertController.create({
      header: `¿Está seguro de borrar a ${index+1}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  

  addStuff(){
    this.indexDB.addStuff({id: 1, name: "pepe", date_start: "12:08",date_end: "13:00"}).then(()=>{
      this.loadData();
      console.log;
    }).catch(console.error);
  }


}
