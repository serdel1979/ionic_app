import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, LoadingController, IonInfiniteScroll} from '@ionic/angular';
import { Stuff } from '../interfaces/reg.interface';
import { User } from '../interfaces/users.interface';
import { StuffService } from '../services/stuff.service';

@Component({
  selector: 'app-load-stuff',
  templateUrl: './load-stuff.page.html',
  styleUrls: ['./load-stuff.page.scss'],
})
export class LoadStuffPage implements OnInit {



  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  public users : User[] = [];
  public textFind = '';

  public userSelect!: User;

  totalUsers = 0;
  limit = 3;
  loading: any;

  public horaEntrada: string = '';
  public horaSalida: string = '';
  constructor(private modalCtrl: ModalController, private stuffs: StuffService,
    private alertController: AlertController, public loadingController: LoadingController ) { }

  ngOnInit() {
    this.getUsers();
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
   this.userSelect = user;
  }
 



  confirm(){

  }

}
