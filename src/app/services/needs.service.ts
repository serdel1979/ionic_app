import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const NEED_KEYS = 'my-needs';

export interface NeedNextDay{
  id: number,
  description: string,
  reportid: number
}

@Injectable({
  providedIn: 'root'
})
export class NeedsService {

  constructor(private storage: Storage) { }


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




}
