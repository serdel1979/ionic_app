import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../interfaces/users.interface';
import { StuffService } from '../services/stuff.service';

@Component({
  selector: 'app-load-stuff',
  templateUrl: './load-stuff.page.html',
  styleUrls: ['./load-stuff.page.scss'],
})
export class LoadStuffPage implements OnInit {


  public users : User[] = [];

  public hora: string = '';
  constructor(private modalCtrl: ModalController, private stuffs: StuffService) { }

  ngOnInit() {
    this.stuffs.getUsers().subscribe((users)=>{
      this.users = users;
      console.log(this.users);
    })
  }


  volver(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  add(){
    console.log(this.hora);
    let ionDatetime = this.hora; 
    //Obtener la fecha desde el string 
    let dateObj = new Date(ionDatetime); 
    //Obtener solo la hora desde el objeto Date 
    let hour = dateObj.getHours();
    let minuts = dateObj.getMinutes();
    console.log(`${hour}:${minuts}`);
  }

  confirm(){

  }

}
