import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {


  public page = 1;
  public resultsCount = 3;


  public data: any;

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.http.get(`https://randomuser.me/api?page=${this.page}&results=${this.resultsCount}`).subscribe(data=>{
        console.log(data);
        this.data = data;
    })
  }

}
