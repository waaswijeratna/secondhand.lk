import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Ad{
  ad_id:number;
  price:number;
  title:string;
  location: string;
  sub_location:string;
}

@Component({
  selector: 'app-alladview',
  templateUrl: './alladview.component.html',
  styleUrl: './alladview.component.css'
})
export class AlladviewComponent implements OnInit {
 
  ads: Ad[] = []
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/getadlist')
     .subscribe(
      (data)=>{

        this.ads = data.result;
      },
      (error)=>{
        console.log(error)
      }
     )
  }
}
