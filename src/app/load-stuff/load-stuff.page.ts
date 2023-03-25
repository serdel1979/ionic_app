import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, LoadingController, IonInfiniteScroll} from '@ionic/angular';
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
export class LoadStuffPage implements OnInit {



  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  public users : User[] = [];
  public textFind = '';
  public activities : Developed_activity[] = [];

  public userSelect!: User;

  public stuff : Stuff = {
    id: '',
    name: '',
    responsability :'',
    date_start: '',
    date_end: '',
    activities : []
  }

  totalUsers = 0;
  limit = 3;
  loading: any;

  public horaEntrada: string = '08:00';
  public horaSalida: string = '16:00';
  constructor(private modalCtrl: ModalController, private stuffs: StuffService,
    private alertController: AlertController, public loadingController: LoadingController, private indexDbService: IndexDBService) { }

  ngOnInit() {
    this.getUsers();
    this.indexDbService.getActivities().then(activities=>{
      this.activities = activities;
    })
  }




  async getUsers(){

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
    this.users = this.stuffs.getUsers();
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

  filterList(event:any){
    this.textFind = event.target.value;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }



  private hideLoading() {
    this.loading.dismiss();
  }



  volver(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // add(){
  //   let ionDatetime = this.horaEntrada; 
  //   //Obtener la fecha desde el string 
  //   let dateObj = new Date(ionDatetime); 
  //   //Obtener solo la hora desde el objeto Date 
  //   let hour = dateObj.getHours();
  //   let minuts = dateObj.getMinutes();
  //   console.log(`${hour}:${minuts}`);
  // }

  select(user: User){
    //busco por email para ver si el usuario ya lo tengo agregado
    this.indexDbService.getStuff(user.email).then(async st=>{
      if(st){
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Selección erronea',
            message: `El personal ${user.name} ${user.surname} ya está asignado`,
            buttons: ['OK'],
          });
          await alert.present();
      }else{
        this.userSelect = user;
      }
    });    
  }
 



  confirm(){
    this.stuff.id = this.userSelect.email;
    this.stuff.name = this.userSelect.surname;
    this.stuff.responsability = this.userSelect.responsability;
    this.stuff.date_start = this.horaEntrada;
    this.stuff.date_end = this.horaSalida;
 
    this.indexDbService.addStuff(this.stuff).then(()=>{
      for(let activity of this.stuff.activities){
        this.indexDbService.addStuffToActivity(activity,this.stuff);
      }
      return this.modalCtrl.dismiss();
    })
  }

  addActivity(activitie: Developed_activity, i: number){
    this.stuff.activities.push(activitie);
    this.activities.splice(i,1);
  }


  removeActivitie(activitie: Developed_activity,i: number){
    this.activities.push(activitie);
    this.stuff.activities.splice(i,1);
  }

}
