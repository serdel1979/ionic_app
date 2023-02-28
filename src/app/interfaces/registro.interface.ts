export interface RegistroDTO{
    UserName: string,
    Latitud: number,
    Longitude: number,
    Imagen: Blob
}





export interface RegistroRespon extends RegistroDTO{
    id: number,
}

export interface File{
    Imagen: string;
}

//let tdatos = 'CREATE TABLE IF NOT EXISTS "registro" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `username` TEXT NOT NULL,`lat` REAL,`long` REAL, `imagen` BLOB );';
     