export interface Stuff {
  id: string,
  name: string,
  surname: string,
  responsability: string,
  date_start: string,
  date_end: string,
  activities: Developed_activity[]
}

export interface NeedNextDay {
  id: string,
  description: string,
  reportid: number
}

export interface Developed_activity {
  id: string,
  description: string,
  reportid: number,
  stuffs: Stuff[]
}


export interface Activities_to_develop {
  id: string,
  description: string,
  reportid: number
}


export interface Observation{
  id: string,
  description: string,
  photos: TPhoto[]
}


export interface TPhoto {
  id: string,
  description: string,
  photo?: Blob | undefined ,
  urlPhoto: string
}

export interface Project {
  id: number,
  name: string,
  client: string,
  supervisor: string,
  reference: string,
  leaderId: string
}


export interface PhotoBase64 {
  id: string,
  description: string,
  photo?: string;
  render: boolean;
}