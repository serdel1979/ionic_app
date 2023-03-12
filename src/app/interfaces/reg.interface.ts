export interface Stuff {
  id: number,
  name: string,
  date_start: string,
  date_end: string
}

export interface NeedNextDay {
  id: number,
  description: string,
  reportid: number
}

export interface Developed_activity {
  id: number,
  description: string,
  reportid: number
}


export interface Activities_to_develop {
  id: number,
  description: string,
  reportid: number
}


export interface Observation{
  id: number,
  description: string,
  photos: TPhoto[]
}


export interface TPhoto {
  id: number,
  description: string,
  photo: Blob
}