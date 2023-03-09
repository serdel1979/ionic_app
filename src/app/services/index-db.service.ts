import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Stuff {
  id: number,
  name: string,
  date_start: string,
  date_end: string
}

const STUFF_KEYS = 'my-stuffs';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService {

  constructor(private storage: Storage) { }


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
