import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Stuff {
  id: number,
  name: string,
  date_start: string,
  date_end: string
}

const STUFF_KEYS = 'my-stuffs';

export interface Developed_activity{
  id: number,
  description: string,
  reportid: number
}

const ACT_DEV_KEYS = 'my-activity-dev'



@Injectable({
  providedIn: 'root'
})
export class IndexDBService {

  constructor(private storage: Storage) { }


  //// actividades desarrolladas

  addActivityDeveloped(activity: Developed_activity): Promise<any>{
    return this.storage.get(ACT_DEV_KEYS).then((activities: Developed_activity[])=>{
        if(activities){
          activities.push(activity);
          return this.storage.set(ACT_DEV_KEYS,activities);
        }else{
          return this.storage.set(ACT_DEV_KEYS,[activity]);
        }
    });
  }

  getActivities():Promise<Developed_activity[]>{
    return this.storage.get(ACT_DEV_KEYS);
  }


  updateActivities(activity: Developed_activity): Promise<any>{
    return this.storage.get(ACT_DEV_KEYS).then((activities: Developed_activity[]) => {
      if (!activities || activities.length === 0) {
        return null;
      }
      let newActivity: Developed_activity[] = [];
      for (let i of activities) {
        if (i.id === activity.id) {
          newActivity.push(activity);
        } else {
          newActivity.push(i);
        }
      }
      return this.storage.set(ACT_DEV_KEYS, newActivity);
    });
  }

  
  deletActivity(activity: Developed_activity): Promise<any>{
    return this.storage.get(ACT_DEV_KEYS).then((activities: Developed_activity[]) => {
      if (!activities || activities.length === 0) {
        return null;
      }
      let toKeep: Developed_activity[] = [];
      for (let i of activities) {
        if (i.id !== activity.id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ACT_DEV_KEYS, toKeep);
    });
  }






  //// personal afectado
  addStuff(stuff: Stuff): Promise<any>{
    return this.storage.get(STUFF_KEYS).then((stuffs: Stuff[])=>{
        if(stuffs){
          stuffs.push(stuff);
          return this.storage.set(STUFF_KEYS,stuffs);
        }else{
          return this.storage.set(STUFF_KEYS,[stuff]);
        }
    });
  }

  getStuffs():Promise<Stuff[]>{
    return this.storage.get(STUFF_KEYS);
  }

  updateStuff(stuff: Stuff): Promise<any>{
    return this.storage.get(STUFF_KEYS).then((stuffs: Stuff[]) => {
      if (!stuffs || stuffs.length === 0) {
        return null;
      }
      let newStuff: Stuff[] = [];
      for (let i of stuffs) {
        if (i.id === stuff.id) {
          newStuff.push(stuff);
        } else {
          newStuff.push(i);
        }
      }
      return this.storage.set(STUFF_KEYS, newStuff);
    });
  }


  deletStuff(stuff: Stuff): Promise<Stuff>{
    return this.storage.get(STUFF_KEYS).then((stuffs: Stuff[]) => {
      if (!stuffs || stuffs.length === 0) {
        return null;
      }
      let toKeep: Stuff[] = [];
      for (let i of stuffs) {
        if (i.id !== stuff.id) {
          toKeep.push(i);
        } 
      }
      return this.storage.set(STUFF_KEYS, toKeep);
    });
  }


}
