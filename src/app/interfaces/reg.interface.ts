export interface Stuff {
  id: string,
  name: string,
  surname: string,
  email : string,
  responsability: string,
  entry_time: string,
  departure_time: string,
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
  id:                   number;
  name:                 string;
  client:               string;
  job:                  Job;
  dateStart:            Date;
  dateEnd:              Date;
  construction_manager: string;
  supervisor:           string;
  reference:            string;
  leader:               Leader;
}

export interface Job {
  id:          number;
  description: string;
}

export interface Leader {
  name:                 string;
  surname:              string;
  dni:                  number;
  responsability:       null;
  responsabilityId:     number;
  isAdmin:              boolean;
  leader:               boolean;
  id:                   string;
  userName:             string;
  normalizedUserName:   string;
  email:                string;
  normalizedEmail:      string;
  emailConfirmed:       boolean;
  passwordHash:         null;
  securityStamp:        string;
  concurrencyStamp:     string;
  phoneNumber:          null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled:     boolean;
  lockoutEnd:           null;
  lockoutEnabled:       boolean;
  accessFailedCount:    number;
}


export interface PhotoBase64 {
  id: string,
  description: string,
  photo?: string;
  render: boolean;
}