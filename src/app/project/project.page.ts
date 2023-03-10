import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Developed_activity, IndexDBService, Stuff } from '../services/index-db.service';

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

  public stuffs: Stuff[] = [];
  public activitiesDeveloped: Developed_activity[] = [];

  public page = 1;
  public resultsCount = 3;
  public totalPages = 1;



  constructor(
    private http: HttpClient, 
    private alertController: AlertController,
    private indexDB: IndexDBService
    ) { }


  ngOnInit() {
    this.loadUsersAfectados();
    this.loadActivitiesDeveloped();
  }

  async loadUsersAfectados(){
    this.indexDB.getStuffs().then(stuffs=>{
      this.stuffs = stuffs;
    })
  }

  async loadActivitiesDeveloped(){
    this.indexDB.getActivities().then(activities=>{
      this.activitiesDeveloped = activities;
    })
  }


  async stuffDelete(stuff: Stuff){
    const alert = await this.alertController.create({
      header: `¿Está seguro de borrar a ${stuff.name}?`,
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
            let msg:any;
            this.indexDB.deletStuff(stuff)
            .then(()=>{
              this.loadUsersAfectados();
            })
            .catch((e:any)=>{
              msg = e;
              this.loadUsersAfectados();
            });
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
    this.indexDB.addStuff({id: this.stuffs.length+1, name: "pepe", date_start: "12:08",date_end: "13:00"}).then(()=>{
      this.loadUsersAfectados();
      console.log;
    }).catch(console.error);
  }


  async addActivitiesDeveloped(){
    const alert = await this.alertController.create({
      header: 'Nueva actividad',
      buttons: ['OK'],
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Describa la actividad desarrollada',
        },
      ],
    });
    alert.present().then(() => {
      alert.onDidDismiss().then((data) => {
        const { values } = data.data;
        let activity = {
          id : this.activitiesDeveloped.length,
          description: values[0],
          reportid: 1
        }
        this.indexDB.addActivityDeveloped(activity)
        .then(()=>{
                  this.loadActivitiesDeveloped();
                })
        .catch(console.error);
      });
    });
  }


  async deletActivityDev(activityDev: Developed_activity){
    const alert = await this.alertController.create({
      header: `Está por eliminar una actividad desarrollada!!!`,
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
            let msg:any;
            this.indexDB.deletActivity(activityDev)
            .then(()=>{
              this.loadActivitiesDeveloped();
            })
            .catch((e:any)=>{
              msg = e;
              this.loadActivitiesDeveloped();
            });
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
