import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { IndexDBService } from '../services/index-db.service';
import { Activities_to_develop, Developed_activity, NeedNextDay, Observation, Project, Stuff, TPhoto } from '../interfaces/reg.interface';
import { LoadObservationsPage } from '../load-observations/load-observations.page';
import { uuId } from '../utils/uuid.function';
import { DetailPhotoPage } from '../detail-photo/detail-photo.page';
import { LoadStuffPage } from '../load-stuff/load-stuff.page';
import { DetailStuffPage } from '../detail-stuff/detail-stuff.page';
import { DetailActivityDevelopedPage } from '../detail-activity-developed/detail-activity-developed.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


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

  private loading!: any;

  public dataProject!: Project;

  constructor(
    private alertController: AlertController,
    private indexDBService: IndexDBService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private router: Router
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
    let proj = localStorage.getItem('proj');
    if(proj){
      this.dataProject = JSON.parse(proj);
    } 
    else{
      this.authService.logout();
      this.router.navigateByUrl('/login');
    } 
  }

  refresh() {
    this.loadNeeds();
    this.loadUsersAfectados();
    this.loadActivitiesDeveloped();
    this.loadActivitiesToDev();
    this.loadObservations();
  }

  ionViewWillEnter() {
    let proj = localStorage.getItem('proj');
    if(proj){
      this.dataProject = JSON.parse(proj);
    } 
    else{
      this.authService.logout();
      this.router.navigateByUrl('/login');
    } 
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
    })
  }

  async loadActivitiesToDev() {
    this.indexDBService.getActivitiesToDevelop().then(activities => {
      this.activitiesToDev = activities;
    })
  }


  async stuffDelete(stuff: Stuff) {
    if (stuff.activities.length > 0){
      this.seeDetail("No puede eliminar un personal con actividades","Error","")
      return;
    }
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
      Entrada: ${stuff.entry_time}\n
      Salida: ${stuff.departure_time}\n
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

    if(activityDev.stuffs.length > 0){
      this.seeDetail('No puede eliminar una actividad con personal asignado','Error','');
      return;
    }
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
    const modal = await this.modalCtrl.create({
      component: DetailActivityDevelopedPage,
      componentProps: {
        activity: actDev,
      }
    });
    modal.present();
    await modal.onDidDismiss().then(() => {
      this.refresh();
    })
  }


  async seeDetaiStuff(stuff: Stuff){
    const modal = await this.modalCtrl.create({
      component: DetailStuffPage,
      componentProps: {
        stuff: stuff,
      }
    });
    modal.present();
    await modal.onDidDismiss().then(() => {
      this.refresh();
    })
  }


  isAdmin(){
    return this.authService.isAdmin;
  }

  async sendReport(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.dataService.sendReport(this.stuffs,this.dataProject.id).subscribe(
      async res=>{
        loading.dismiss();
        console.log(res);
      },
      error =>{
        loading.dismiss();
        console.log(error);
      })
  }

  async doAdmin(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.authService.doAdmin().subscribe(async res=>{
      loading.dismiss();
      console.log(res);
    },
    async error=>{
      loading.dismiss();
      console.log(error);
    })
  }

  async deleteAdmin(){
    await this.showLoading();
    this.authService.deleteAdmin().subscribe(async res=>{
      await this.finishLoading();
    },
    async error=>{
      await this.finishLoading();
    })
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
   await this.loading.present();
  }

  async finishLoading() {
    await this.loading.dismiss();
  }

}
