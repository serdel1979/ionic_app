import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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

  public page = 1;
  public resultsCount = 3;
  public totalPages = 1;

  public data: any[] = [
    {
      "Name":"Enzo Díaz",
      "ingreso" : "8:00",
      "salida" : "14:00"
    },
    {
      "Name":"Pablo Aimar",
      "ingreso" : "8:00",
      "salida" : "14:00"
    },
    {
      "Name":"Juancho Psico",
      "ingreso" : "14:00",
      "salida" : "20:00"
    }
  ];
  public bulkEdit: boolean = false;

  public sortDirection: number = 0;

  constructor(private http: HttpClient, private alertController: AlertController) { }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    // this.http.get(`https://localhost:7071/users/getusers/${this.page}/${this.resultsCount}`).subscribe((data:any)=>{
    //     this.data = data.results;
    //     console.log(data);
    // })
  }

  sortBy(key: any){
    console.log(key);
  }

  toggleBulkEdit(){
    this.bulkEdit = !this.bulkEdit;
  }

  bulkDelete(){

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
  


}
