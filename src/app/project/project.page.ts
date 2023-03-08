import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Data {
  info: any,
  results: any[]
}

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {


  public page = 1;
  public resultsCount = 3;
  public totalPages = 1;

  public data: any[] = [
    {
      "Name":"Enzo",
      "ingreso" : "8:00",
      "salida" : "14:00"
    },
    {
      "Name":"Pablo",
      "ingreso" : "8:00",
      "salida" : "14:00"
    },
    {
      "Name":"Juancho",
      "ingreso" : "14:00",
      "salida" : "20:00"
    }
  ];
  public bulkEdit: boolean = false;

  public sortDirection: number = 0;

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    // this.http.get(`https://localhost:7071/users/getusers/${this.page}/${this.resultsCount}`).subscribe((data:any)=>{
    //     this.data = data.results;
    //     console.log(data);
    // })
  }

  sortBy(key: any){
    console.log(key);
  }

  toggleBulkEdit(){
    this.bulkEdit = !this.bulkEdit;
  }

  bulkDelete(){

  }

  removeRow(index: number){

  }


}
