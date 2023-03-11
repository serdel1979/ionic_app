import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Activities_to_develop, Developed_activity, NeedNextDay, Stuff } from '../interfaces/reg.interface';


const NEED_KEYS = 'my-needs';
const STUFF_KEYS = 'my-stuffs';
const ACT_DEV_KEYS = 'my-activity-dev';
const ACT_TO_DEV_KEYS = 'my-activity-to-dev';
const OBSERVATIONS_KEYS = 'my-observations';




@Injectable({
  providedIn: 'root'
})
export class IndexDBService {

  constructor(private storage: Storage){ 

    //this.storage.remove('my-observation-dev').then(()=>console.log('borrado my-observation-dev'));
    this.storage.keys().then(c=>{
        c.find((k)=>{
          (k===STUFF_KEYS || k===NEED_KEYS || k===ACT_DEV_KEYS || k===OBSERVATIONS_KEYS || k===ACT_TO_DEV_KEYS)?console.log(`La clave ${k} ya estaba creada`):this.storage.set(k,[]);     
        })
    })

  }

  

  ///necesidades

  addNeed(need: NeedNextDay): Promise<any>{
    return this.storage.get(NEED_KEYS).then((needNextDay: NeedNextDay[])=>{
        if(needNextDay){
          needNextDay.push(need);
          return this.storage.set(NEED_KEYS,needNextDay);
        }else{
          return this.storage.set(NEED_KEYS,[need]);
        }
    });
  }

  getNeeds():Promise<NeedNextDay[]>{
    return this.storage.get(NEED_KEYS);
  }


  updateNeed(need: NeedNextDay): Promise<any>{
    return this.storage.get(NEED_KEYS).then((needs: NeedNextDay[]) => {
      if (!needs || needs.length === 0) {
        return null;
      }
      let newActivity: NeedNextDay[] = [];
      for (let i of needs) {
        if (i.id === need.id) {
          newActivity.push(need);
        } else {
          newActivity.push(i);
        }
      }
      return this.storage.set(NEED_KEYS, newActivity);
    });
  }

  deletNeed(need: NeedNextDay): Promise<any>{
    return this.storage.get(NEED_KEYS).then((needs: NeedNextDay[]) => {
      if (!needs || needs.length === 0) {
        return null;
      }
      let toKeep: NeedNextDay[] = [];
      for (let i of needs) {
        if (i.id !== need.id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(NEED_KEYS, toKeep);
    });
  }

  /// actividades a desarrollar

  addActivityToDevelop(activityToDev: Activities_to_develop): Promise<any>{
    return this.storage.get(ACT_TO_DEV_KEYS).then((activitiesToDev: Activities_to_develop[])=>{
        if(activitiesToDev){
          activitiesToDev.push(activityToDev);
          return this.storage.set(ACT_TO_DEV_KEYS,activitiesToDev);
        }else{
          return this.storage.set(ACT_TO_DEV_KEYS,[activityToDev]);
        }
    });
  }

  getActivitiesToDevelop():Promise<Activities_to_develop[]>{
    return this.storage.get(ACT_TO_DEV_KEYS);
  }


  updateActivityToDevelop(activity: Activities_to_develop): Promise<any>{
    return this.storage.get(ACT_TO_DEV_KEYS).then((activities: Activities_to_develop[]) => {
      if (!activities || activities.length === 0) {
        return null;
      }
      let newActivity: Activities_to_develop[] = [];
      for (let i of activities) {
        if (i.id === activity.id) {
          newActivity.push(activity);
        } else {
          newActivity.push(i);
        }
      }
      return this.storage.set(ACT_TO_DEV_KEYS, newActivity);
    });
  }

  
  deletActivityToDevelop(activity: Activities_to_develop): Promise<any>{
    return this.storage.get(ACT_TO_DEV_KEYS).then((activities: Activities_to_develop[]) => {
      if (!activities || activities.length === 0) {
        return null;
      }
      let toKeep: Activities_to_develop[] = [];
      for (let i of activities) {
        if (i.id !== activity.id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ACT_TO_DEV_KEYS, toKeep);
    });
  }


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
