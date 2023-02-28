import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { RegistroDTO, RegistroRespon } from '../interfaces/registro.interface';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {


  /*
  
CREATE TABLE IF NOT EXISTS "students" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `surname` TEXT, `email` TEXT NOT NULL, `phone` TEXT NOT NULL, `active` INTEGER DEFAULT 1 );
DELETE FROM students;

CREATE TABLE IF NOT EXISTS "class" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date_start` TEXT, `date_end` TEXT, `id_student` INTEGER NOT NULL, `price` REAL NOT NULL, FOREIGN KEY(`id_student`) REFERENCES `id_student`(`id`) );
DELETE FROM class;

CREATE TABLE IF NOT EXISTS "payment" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `id_class` INTEGER NOT NULL, `paid` REAL DEFAULT 0, FOREIGN KEY(`id_class`) REFERENCES `class`(`id`) )
DELETE FROM payment;
  
  
  */

  db!: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  public creaDataBase() {
    return this.sqlite.create({
      name: 'dbase.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      let tdatos = 'CREATE TABLE IF NOT EXISTS "registers" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `username` TEXT NOT NULL,`lat` REAL,`long` REAL, `imagen` BLOB );';
      return Promise.all(
        [this.db.executeSql(tdatos, [])]
      ).then(() => {
        return true;
      })
    }).catch(e => {
      return (e);
    })
  }


  guardaDb(registro: RegistroDTO) {
    const sql = 'INSERT INTO registers(username,lat,long,imagen) VALUES (?,?,?,?)';
    return this.db.executeSql(sql, [
      registro.UserName,
      registro.Latitud,
      registro.Longitude,
      registro.Imagen
    ]);
  }


  async deleteReg(id: number) {
    const sql = 'DELETE FROM registers WHERE id = ?';
    try {
      return this.db.executeSql(sql, [
        id
      ]);
    } catch (err) {
      return await Promise.reject(err);
    }
  }


  async getMyRegs(username: string) {
    console.log("haciendo consultas de usuario ", username);
    const sql = 'SELECT * FROM registers WHERE username = ?';
    try {
      const response = await this.db.executeSql(sql, [
        username
      ]);
      let registros = [];
      for (let index = 0; index < response.rows.length; index++) {
        const row = response.rows.item(index);
        let c: RegistroRespon = row as RegistroRespon;
        registros.push(c);
      }
      return await Promise.resolve(registros);
    } catch (err) {
      return await Promise.reject(err);
    }
  }


}
