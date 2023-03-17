import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IndexDBService } from '../services/index-db.service';
import { Activities_to_develop, Developed_activity, NeedNextDay, Observation, Stuff } from '../interfaces/reg.interface';
import { LoadObservationsPage } from '../load-observations/load-observations.page';
import { uuId } from '../utils/uuid.function';



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
    this.loadObservations();
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
          handler: () => {
            let msg: any;
            this.indexDBService.deletStuff(stuff)
              .then(() => {
                this.loadUsersAfectados();
              })
              .catch((e: any) => {
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




  addStuff() {
    this.indexDBService.addStuff({ id: uuId(), name: "Ermindo Onega", responsability: "Especialista", date_start: "12:08", date_end: "13:00" }).then(() => {
      this.loadUsersAfectados();
      console.log;
    }).catch(console.error);
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
          let activity = {
            id: uuId(),
            description: values[0],
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


  puedeEnviar(): boolean {
    if (this.stuffs.length > 0 && this.activitiesDeveloped.length > 0) return true;
    return false;
  }



}
