import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, LoadingController, IonInfiniteScroll, NavParams } from '@ionic/angular';
import { Developed_activity, Stuff } from '../interfaces/reg.interface';
import { User } from '../interfaces/users.interface';
import { IndexDBService } from '../services/index-db.service';
import { StuffService } from '../services/stuff.service';
import { uuId } from '../utils/uuid.function';

@Component({
  selector: 'app-load-stuff',
  templateUrl: './load-stuff.page.html',
  styleUrls: ['./load-stuff.page.scss'],
})
export class LoadStuffPage {



  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  public users: User[] = [];
  public textFind = '';
  public activities: Developed_activity[] = [];

  edition: boolean = false;

  public userSelect!: User;

  public stuff: Stuff = {
    id: '',
    name: '',
    surname: '',
    responsability: '',
    date_start: '',
    date_end: '',
    activities: []
  }

  totalUsers = 0;
  limit = 3;
  loading: any;

  public horaEntrada: string = '08:00';
  public horaSalida: string = '16:00';
  constructor(
    private modalCtrl: ModalController,
    private stuffs: StuffService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private indexDbService: IndexDBService,
    private navParams: NavParams) { }

  ionViewWillEnter() {
    this.edition = this.navParams.get('edition');
    if (!this.edition) {
      this.getUsers();
      this.indexDbService.getActivities().then(activities => {
        this.activities = activities;
      })
    } else {
      this.stuff = this.navParams.get('stuff');
      this.horaEntrada = this.stuff.date_start;
      this.horaSalida = this.stuff.date_end;
      this.userSelect = {
        name: this.stuff.name,
        surname: this.stuff.surname,
        email: this.stuff.id,
        dni: 0,
        responsability: this.stuff.responsability,
        leader: false
      }
      this.indexDbService.getActivities().then(activities => {
        this.activities = activities.filter(el => !this.stuff.activities.some(act => act.id === el.id));
      })
    }
  }




  async getUsers() {

    this.loading = await this.loadingController.create({
      message: 'Espere...',
      spinner: 'crescent',
      duration: 2000
    });

    await this.loading.present();
    // this.stuffs.getUsers().subscribe((users)=>{
    //     this.users = users;
    //     this.totalUsers = users.length;
    //     this.hideLoading();
    // })
    this.users = this.stuffs.getUsers().sort((a, b) => (a.surname > b.surname ? 1 : -1));
    this.totalUsers = this.users.length;
    this.hideLoading();
  }



  loadMoreUsers(event: any) {
    setTimeout(() => {

      if (this.users.length > this.limit) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      const nuevoArr = Array(10);
      this.users.push(...nuevoArr);
      event.target.complete();
    }, 500);
  }
  //

  filterList(event: any) {
    this.textFind = event.target.value;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }



  private hideLoading() {
    this.loading.dismiss();
  }



  volver() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  select(user: User) {
    //busco por email para ver si el usuario ya lo tengo agregado
    this.indexDbService.getStuff(user.email).then(async st => {
      if (st) {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Selección erronea',
          message: `El personal ${user.name} ${user.surname} ya está asignado`,
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        this.userSelect = user;
      }
    });
  }




  confirm() {
    this.stuff.id = this.userSelect.email;
    this.stuff.name = this.userSelect.name;
    this.stuff.surname = this.userSelect.surname;
    this.stuff.responsability = this.userSelect.responsability;
    this.stuff.date_start = this.horaEntrada;
    this.stuff.date_end = this.horaSalida;
    if (!this.edition) {
      //estoy agregando un nuevo stuff, hay que agregar el stuff a las actividades asignadas
      this.indexDbService.addStuff(this.stuff).then(async () => {
        for (let activity of this.stuff.activities) {
          await this.indexDbService.addStuffToActivity(activity, this.stuff)
        }
      }).then(() => {
        return this.modalCtrl.dismiss();
      })
    } else {
      this.indexDbService.updateStuff(this.stuff).then(async () => {
        for (let activity of this.stuff.activities) {
          await this.indexDbService.addStuffToActivity(activity, this.stuff)
        }
        console.log('nuevas actividades de usuario ',this.stuff.activities);
        //falta eliminar usuarios de las actividades
        let activitiesCurrent = [];
        this.indexDbService.getActivities().then(async activities => {
          activitiesCurrent = activities.filter(el => !this.stuff.activities.some(act => act.id === el.id));
          console.log('actividades actuales donde hay que eliminar usuario ',activitiesCurrent);
          for (let activityCurrent of activitiesCurrent) {
            await this.indexDbService.deletStuffFromActivity(activityCurrent, this.stuff)
          }
        })
      }).then(() => {
        return this.modalCtrl.dismiss();
      })
    }
  }

  addActivity(activitie: Developed_activity, i: number) {
    this.stuff.activities.push(activitie);
    this.activities.splice(i, 1);
  }


  removeActivitie(activitie: Developed_activity, i: number) {
    this.activities.push(activitie);
    this.stuff.activities.splice(i, 1);
  }

}
