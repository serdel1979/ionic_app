import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { SqliteService } from '../services/sqlite.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { JsonPipe } from '@angular/common';
import { RegistroDTO, RegistroRespon } from '../interfaces/registro.interface';
import { DataService } from '../services/data.service';

const base64 = 'data:image/png;base64,';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  public registros: RegistroRespon[] = [];
  public showRegs: boolean = false;
  public src: string | ArrayBuffer | null = '';
  public load: boolean = false;
  public loadCoords: boolean = false;
  public imgBlobBase64: any = '';

  public reg: RegistroDTO = {
    UserName: "",
    Latitud: 0,
    Longitude: 0,
    Imagen: new Blob
  }

  public coordenadas: [number, number] = [0, 0];

  public imagenBlob!: Blob;

  public registroEnMemoria: RegistroDTO[] = [];


  constructor(
    private platform: Platform,
    private loadingCtl: LoadingController,
    private authService: AuthService,
    private sqlService: SqliteService,
    private dataService: DataService,
    public alertController: AlertController) {
    this.iniciar();
  }

  async ngOnInit() {
    const geoLocation = new Geolocation();
    geoLocation.getCurrentPosition().then(geolocation => {
      this.coordenadas[0] = geolocation.coords.latitude;
      this.coordenadas[1] = geolocation.coords.longitude;
      console.log(this.coordenadas);
      this.reg.Latitud = this.coordenadas[0];
      this.reg.Longitude = this.coordenadas[1];
      this.reg.UserName = this.authService.getUserName;
      this.reg.Imagen = new Blob;
      this.loadCoords = true;
    }).catch(e => console.error);
  }

  async iniciar() {
    this.loadingCtl.create();
    this.platform.ready().then(() => {
      this.sqlService.creaDataBase().then(() => {
        //this.load = true;
        console.log("Base de datos creada!!!");
      }).catch(e => { console.error(e) });
    }).catch(e => { console.error(e) });
    await this.getMyRegistros();
  }




  async guardaBd() {
    this.loadingCtl.create();
    this.sqlService.guardaDb(this.reg).then(
      async () => {
        console.log("Registro agregado");
        this.loadingCtl.dismiss();
        await this.presentAlert('Guardado','Guardado en sqlite','El registro se guardó correctamente');
      }
    ).catch(async e => {
      console.error(e);
      this.loadingCtl.dismiss();
      await this.presentAlert('Error','Error al guardar',e);
    });
    await this.getMyRegistros();
  }


  async presentAlert(header:string, subheader:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async guardaEnRam() {
    console.log('guardar en ram ', this.reg);
    this.registroEnMemoria.push(this.reg);
    console.log(this.registroEnMemoria);
    await this.presentAlert('Guardado','Guardado en sqlite','El registro se guardó correctamente');
  }



  public cargo(): boolean {
    return this.load;
  }



  async cargaImg() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    console.log(image);
    if (image.base64String != undefined) {
      this.src = `${base64}${image.base64String}`;
      let blob = new Blob([image.base64String], { type: 'image/png' });
      this.imagenBlob = blob;
      this.reg.Imagen = blob;
      this.load = true;
    }
  }

  blobToImgBase64(fileBlob: Blob) {
    const self = this;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      let fotobase64: string | ArrayBuffer | null = reader.result;
      self.imgBlobBase64 = fotobase64;
    }
  }


  async enviar(data: RegistroDTO) {
    (await this.dataService.enviarDatos(data)).subscribe(async () => {
      // manejar resultado exitoso
      await this.presentAlert('Enviado','Enviado a base de datos','El registro se envió a la base de datos remota');
    },
    async (error: { message: string; }) => {
      // manejar error
      console.error(error);
      await this.presentAlert('Error','Error al enviar',error.message);
    });
  }



  eliminar(id: number) {
    this.loadingCtl.create();
    this.sqlService.deleteReg(id).then(async ()=>{
      this.loadingCtl.dismiss();
      this.getMyRegistros();
      await this.presentAlert('Eliminado','Borrado de registro','El registro se borró');
    })
    .catch(async err=>{
      this.loadingCtl.dismiss();
      await this.presentAlert('Error','Borrado de registro',err);
    })
  }


  getMyRegistros() {
    this.sqlService.getMyRegs(this.authService.getUserName).then(resp => {
      this.registros = resp;
      this.showRegs = true;
    }).catch(async err => {
      this.showRegs = false;
      console.error(err);
      await this.presentAlert('Error','Error al traer datos guardados',err);
    });
  }



}
