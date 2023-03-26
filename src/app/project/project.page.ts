import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IndexDBService } from '../services/index-db.service';
import { Activities_to_develop, Developed_activity, NeedNextDay, Observation, Stuff, TPhoto } from '../interfaces/reg.interface';
import { LoadObservationsPage } from '../load-observations/load-observations.page';
import { uuId } from '../utils/uuid.function';
import { DetailPhotoPage } from '../detail-photo/detail-photo.page';
import { LoadStuffPage } from '../load-stuff/load-stuff.page';



@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit, OnChanges {



  handlerMessage = '';
  roleMessage = '';

  message = 'This modal example uses the modalController to present and dismiss modals.';


  public stuffs: Stuff[] = [];
  public activitiesDeveloped: Developed_activity[] = [];
  public activitiesToDev: Activities_to_develop[] = [];
  public needsNextDay: NeedNextDay[] = [];
  public observations: Observation[] = [];

  public page = 1;
  public resultsCount = 3;
  public totalPages = 1;



  constructor(
    private alertController: AlertController,
    private indexDBService: IndexDBService,
    private modalCtrl: ModalController
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }


  ngOnInit() {
    this.loadNeeds();
    this.loadUsersAfectados();
    this.loadActivitiesDeveloped();
    this.loadActivitiesToDev();
    this.loadObservations();
  }

  refresh() {
    this.loadNeeds();
    this.loadUsersAfectados();
    this.loadActivitiesDeveloped();
    this.loadActivitiesToDev();
    this.loadObservations();
  }

  ionViewWillEnter() {
    this.refresh();
  }


  async deletObservation(observation: Observation) {
    const alert = await this.alertController.create({
      header: `Está por eliminar una observación y sus datos!!!`,
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
            let msg: any;
            this.indexDBService.deletObservations(observation)
              .then(() => {
                this.loadObservations();
              })
              .catch((e: any) => {
                msg = e;
                this.loadObservations();
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

  async loadObservations() {
    this.indexDBService.getObservations().then(observations => {
      this.observations = observations;
    })
  }



  async loadNeeds() {
    this.indexDBService.getNeeds().then(needs => {
      this.needsNextDay = needs;
    })
  }

  async loadUsersAfectados() {
    this.indexDBService.getStuffs().then(stuffs => {
      this.stuffs = stuffs;
    })
  }

  async loadActivitiesDeveloped() {
    this.indexDBService.getActivities().then(activities => {
      this.activitiesDeveloped = activities;
      console.log(activities);
    })
  }

  async loadActivitiesToDev() {
    this.indexDBService.getActivitiesToDevelop().then(activities => {
      this.activitiesToDev = activities;
    })
  }


  async stuffDelete(stuff: Stuff) {
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
          handler: async () => {
            let msg: any;
            for(let act of stuff.activities){
              await this.indexDBService.deletStuffFromActivity(act,stuff);
            }
            this.indexDBService.deletStuff(stuff)
              .then(async () => {
                await this.ionViewWillEnter();
              })
              .catch(async (e: any) => {
                msg = e;
                await this.ionViewWillEnter();
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




  async seeStuff(stuff: Stuff) {
    const alert = await this.alertController.create({
      header: 'Personal',
      subHeader: 'Datos del trabajador seleccionado',
      message: `Nombre: ${stuff.name}\n
      Responsabilidad: ${stuff.responsability}
      Entrada: ${stuff.date_start}\n
      Salida: ${stuff.date_end}\n
      `,
      buttons: ['OK'],
    });
    await alert.present();
  }



  async addActivitiesDeveloped() {
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
        if (data.data) {
          const { values } = data.data;
          if(values[0] == '')return;
          let activity = {
            id: uuId(),
            description: values[0],
            stuffs: [],
            reportid: 1
          }
          this.indexDBService.addActivityDeveloped(activity)
            .then(() => {
              this.loadActivitiesDeveloped();
            })
            .catch(console.error);
        }
      });
    });
  }


  //éste método hay que retocarlo para no poder editar una actividad si está asignada a usuarios
  async editActivitiesDeveloped(activityDev: Developed_activity) {
    const alert = await this.alertController.create({
      header: 'Edita actividad desarrollada',
      buttons: ['OK'],
      inputs: [
        {
          type: 'textarea',
          value: `${activityDev.description}`,
          placeholder: 'Ingrese una actividad desarrollada!!!',
        },
      ],
    });
    alert.present().then(() => {
      alert.onDidDismiss().then((data) => {
        if (data.data) {
          const { values } = data.data;
          let activity = {
            id: activityDev.id,
            description: values[0],
            stuffs: activityDev.stuffs, 
            reportid: 1
          }
          this.indexDBService.updateActivities(activity)
            .then(() => {
              this.loadActivitiesDeveloped();
            })
            .catch(console.error);
        }
      });

    });
  }


  async deletActivityDev(activityDev: Developed_activity) {
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
            let msg: any;
            this.indexDBService.deletActivity(activityDev)
              .then(() => {
                this.loadActivitiesDeveloped();
              })
              .catch((e: any) => {
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

  async addActivityToDev() {
    const alert = await this.alertController.create({
      header: 'Nueva actividad para desarrollar',
      buttons: ['OK'],
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Describa la actividad a desarrollar!!!',
        },
      ],
    });
    alert.present().then(() => {
      alert.onDidDismiss().then((data) => {
        if (data.data) {
          const { values } = data.data;
          if(values[0] == '')return;
          let activity = {
            id: uuId(),
            description: values[0],
            reportid: 1
          }
          this.indexDBService.addActivityToDevelop(activity)
            .then(() => {
              this.loadActivitiesToDev();
            })
            .catch(console.error);
        }
      });

    });
  }


  async deletActivityToDev(activityToDev: Activities_to_develop) {
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
            let msg: any;
            this.indexDBService.deletActivityToDevelop(activityToDev)
              .then(() => {
                this.loadActivitiesToDev();
              })
              .catch((e: any) => {
                msg = e;
                this.loadActivitiesToDev();
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

  async editActivityToDev(activityToDev: Activities_to_develop) {
    const alert = await this.alertController.create({
      header: 'Edita una actividad a desarrollar',
      buttons: ['OK'],
      inputs: [
        {
          type: 'textarea',
          value: `${activityToDev.description}`,
          placeholder: 'Ingrese una actividad a desarrollar!!!',
        },
      ],
    });
    alert.present().then(() => {
      alert.onDidDismiss().then((data) => {
        if (data.data) {
          const { values } = data.data;
          let activity = {
            id: activityToDev.id,
            description: values[0],
            reportid: 1
          }
          this.indexDBService.updateActivityToDevelop(activity)
            .then(() => {
              this.loadActivitiesToDev();
            })
            .catch(console.error);
        }
      });

    });
  }

  async addNeed() {
    const alert = await this.alertController.create({
      header: 'Agregar una necesidad',
      buttons: ['OK'],
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Describa lo que necesita para la próxima!!!',
        },
      ],
    });
    alert.present().then(() => {
      alert.onDidDismiss().then((data) => {
        if (data.data) {
          const { values } = data.data;
          if(values[0] == '')return;
          let need = {
            id: uuId(),
            description: values[0],
            reportid: 1
          }
          this.indexDBService.addNeed(need)
            .then(() => {
              this.loadNeeds();
            })
            .catch(console.error);
        }
      });

    });
  }

  async deletNeed(need: NeedNextDay) {
    const alert = await this.alertController.create({
      header: `Está por eliminar una necesidad!!!`,
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
            let msg: any;
            this.indexDBService.deletNeed(need)
              .then(() => {
                this.loadNeeds();
              })
              .catch((e: any) => {
                msg = e;
                this.loadNeeds();
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

  async addObservation() {
    const modal = await this.modalCtrl.create({
      component: LoadObservationsPage,
      componentProps: {
        edition: false
      }
    });
    modal.present();

    await modal.onDidDismiss().then(() => {
      this.loadObservations();
    })
  }

  async addStuffModal(){
    const modal = await this.modalCtrl.create({
      component: LoadStuffPage,
      componentProps: {
        edition: false
      }
    });
    modal.present();

    await modal.onDidDismiss().then(() => {
      this.ionViewWillEnter();
    })
  }

  async editObservation(obs: Observation) {
    const modal = await this.modalCtrl.create({
      component: LoadObservationsPage,
      componentProps: {
        observation: obs,
        edition: true
      }
    });
    modal.present();

    await modal.onDidDismiss().then(() => {
      this.loadObservations();
    })
  }

  async editStuff(stuff: Stuff) {
    const modal = await this.modalCtrl.create({
      component: LoadStuffPage,
      componentProps: {
        stuff: stuff,
        edition: true
      }
    });
    modal.present();

    await modal.onDidDismiss().then(() => {
      this.refresh();
    })

  }

  async seeDetailPhoto(description: string, photo: TPhoto){
    const modal = await this.modalCtrl.create({
      component: DetailPhotoPage,
      componentProps: {
        description: description,
        photo: photo
      }
    });
    modal.present();

    await modal.onDidDismiss().then(() => {
      this.loadObservations();
    })

  }

  async editNeed(needNextDay: NeedNextDay) {
    const alert = await this.alertController.create({
      header: 'Edita actividad desarrollada',
      buttons: ['OK'],
      inputs: [
        {
          type: 'textarea',
          value: `${needNextDay.description}`,
          placeholder: 'Ingrese una actividad desarrollada!!!',
        },
      ],
    });
    alert.present().then(() => {
      alert.onDidDismiss().then((data) => {
        if (data.data) {
          const { values } = data.data;
          let need = {
            id: needNextDay.id,
            description: values[0],
            reportid: 1
          }
          this.indexDBService.updateNeed(need)
            .then(() => {
              this.loadNeeds();
            })
            .catch(console.error);
        }
      });

    });
  }


  puedeEnviar(): boolean {
    if (this.stuffs.length > 0 && this.activitiesDeveloped.length > 0) return true;
    return false;
  }


  async seeDetail(detail: string, header: string, subHeader: string) {
    if(detail == ''){detail = 'No se especificó detalle!!!'};
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: detail,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async seeActDev(actDev: Developed_activity){
    console.log(actDev);
    let stuffas = '. Personal asignado: ';
    for(let stuff of actDev.stuffs){
      stuffas = stuffas +', '+ stuff.name;
    }
    const alert = await this.alertController.create({
      header: 'Tareas',
      subHeader: 'Tareas desarrolladas el día de hoy',
      message: actDev.description+stuffas,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
