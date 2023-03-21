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

  confirm(){

  }

}
