export interface Stuff {
  id: string,
  name: string,
  date_start: string,
  date_end: string
}

export interface NeedNextDay {
  id: string,
  description: string,
  reportid: number
}

export interface Developed_activity {
  id: string,
  description: string,
  reportid: number
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

export interface PhotoBase64 {
  id: string,
  description: string,
  photo?: string;
  render: boolean;
}